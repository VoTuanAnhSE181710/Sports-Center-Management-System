import { ACTIONS, LOGIN_STATUS, MAX_LOGIN_ATTEMPTS, OUTCOMES, TARGET_TYPES } from '../constants/constants.js';
import { AuthenticationError, AuthorizationError, BadRequestError } from '../error/error.js';

class AuthService {
  #userRepository; #hashService; #tokenService; #auditLogRepository; #roleRepository; #mailService;
  constructor({ userRepository, hashService, tokenService, auditLogRepository, roleRepository, mailService }) {
    this.#userRepository = userRepository;
    this.#hashService = hashService;
    this.#tokenService = tokenService;
    this.#auditLogRepository = auditLogRepository;
    this.#roleRepository = roleRepository;
    this.#mailService = mailService;
  }

  login = async ({ email, password, deviceName }) => {
    let existingUser = await this.#userRepository.findUserByEmail({ email });
    if (existingUser?.status === LOGIN_STATUS.LOCKED) {
      existingUser = await this.#userRepository.checkAndUnlockAccount({ userId: existingUser.id });
      if (existingUser.status === LOGIN_STATUS.LOCKED) {
        const minsLeft = Math.ceil((new Date(existingUser.lockUntil).getTime() - Date.now()) / 60000);
        throw new AuthenticationError(Account locked. Try again in  minutes!);
      }
    }
    if (!existingUser || existingUser.status !== LOGIN_STATUS.ACTIVE) {
      await this.#auditLogRepository.saveLog({ action: ACTIONS.LOGIN, targetType: TARGET_TYPES.USER, outcome: OUTCOMES.FAILED, details: { email, reason: !existingUser ? 'Account not found' : 'Account inactive' } });
      throw new AuthenticationError('Email or password is invalid!');
    }
    const isMatch = await this.#hashService.compare({ string: password, hashed: existingUser.password });
    if (!isMatch) {
      const updated = await this.#userRepository.incrementLoginAttempts({ userId: existingUser.id });
      const left = MAX_LOGIN_ATTEMPTS - updated.loginAttempts;
      await this.#auditLogRepository.saveLog({ action: ACTIONS.LOGIN, targetType: TARGET_TYPES.USER, outcome: OUTCOMES.FAILED, actorId: existingUser.id, details: { reason: 'Wrong password' } });
      if (updated.status === LOGIN_STATUS.LOCKED) throw new AuthenticationError('Account locked due to multiple failed attempts. Try again in 15 minutes.');
      throw new AuthenticationError(Invalid password.  attempt(s) remaining.);
    }
    await this.#userRepository.resetLoginAttempts({ userId: existingUser.id });
    const { accessToken, refreshToken, deviceId, jti } = this.#tokenService.generateToken({ userId: existingUser.id, fullName: existingUser.fullName, roleName: existingUser.role.roleName, roleId: existingUser.roleId });
    await this.#auditLogRepository.saveLog({ action: ACTIONS.LOGIN, targetType: TARGET_TYPES.USER, outcome: OUTCOMES.SUCCESS, actorId: existingUser.id, details: { email: existingUser.email, jti } });
    await this.#tokenService.saveRefreshToken({ userId: existingUser.id, refreshToken, deviceId, deviceName });
    return { accessToken, refreshToken, user: { userId: existingUser.id, fullName: existingUser.fullName, email: existingUser.email, role: existingUser.role.roleName } };
  }

  logout = async ({ userId, deviceId }) => {
    const isOwner = await this.#tokenService.verifyOwner({ userId, deviceId });
    if (isOwner !== 1) throw new BadRequestError('This is not your account!');
    const deleted = await this.#tokenService.revokeRefreshToken({ userId, deviceId });
    if (deleted === 0) throw new AuthorizationError('Token does not exist or already deleted!');
    return true;
  }

  register = async ({ email, password, fullName, phone, roleId, createdBy }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await this.#userRepository.findUserByEmail({ email: normalizedEmail });
    if (existing) throw new BadRequestError('Email already registered!');
    const role = await this.#roleRepository.findById(roleId);
    if (!role) throw new BadRequestError('Role not found!');
    const hashedPassword = await this.#hashService.hash({ string: password });
    const newUser = await this.#userRepository.createUser({ email: normalizedEmail, password: hashedPassword, fullName, phone, roleId, createdBy });
    await this.#auditLogRepository.saveLog({ action: ACTIONS.REGISTER, targetType: TARGET_TYPES.USER, outcome: OUTCOMES.SUCCESS, actorId: createdBy, details: { email: normalizedEmail, roleId } });
    return { ...newUser, password: undefined };
  }

  refreshToken = async ({ oldRefreshToken, deviceName }) => {
    const decoded = await this.#tokenService.verifyRefreshToken({ token: oldRefreshToken });
    const user = await this.#userRepository.findUserById({ userId: decoded.userId });
    if (!user) throw new BadRequestError("Token doesn't exist or expired!");
    const deleted = await this.#tokenService.revokeRefreshToken({ userId: user.id, deviceId: decoded.deviceId });
    if (deleted === 0) throw new AuthorizationError('Token does not exist or already deleted!');
    const { accessToken, refreshToken, deviceId } = this.#tokenService.generateToken({ userId: user.id, fullName: user.fullName, roleName: user.role.roleName, roleId: user.roleId, deviceId: decoded.deviceId });
    await this.#tokenService.saveRefreshToken({ userId: user.id, refreshToken, deviceId, deviceName });
    return { accessToken, refreshToken };
  }

  changePassword = async ({ oldPassword, newPassword, email, userId }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.#userRepository.findUserById({ userId });
    if (!user || normalizedEmail !== user.email) throw new BadRequestError('Please provide the correct email!');
    const isVerified = await this.#mailService.isOTPVerified({ email: normalizedEmail });
    if (!isVerified) throw new BadRequestError('OTP verification expired');
    const isMatch = await this.#hashService.compare({ string: oldPassword, hashed: user.password });
    if (!isMatch) throw new BadRequestError('Old password is incorrect');
    const hashed = await this.#hashService.hash({ string: newPassword });
    await this.#userRepository.changePassword({ userId, password: hashed });
    await Promise.all([this.#mailService.clearVerifiedOTP({ email: normalizedEmail }), this.#tokenService.removeAllRefreshToken({ userId })]);
    return { message: 'Password changed successfully' };
  }
}
export default AuthService;
