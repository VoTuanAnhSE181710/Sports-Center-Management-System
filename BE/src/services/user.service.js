import { BadRequestError, NotFoundError } from '../error/error.js';
class UserService {
  #userRepository; #roleRepository; #auditLogRepository;
  constructor({ userRepository, roleRepository, auditLogRepository }) {
    this.#userRepository = userRepository; this.#roleRepository = roleRepository; this.#auditLogRepository = auditLogRepository;
  }
  getProfile = async ({ userId }) => {
    const user = await this.#userRepository.findUserById({ userId });
    if (!user) throw new NotFoundError('User not found');
    return { ...user, password: undefined };
  }
  updateProfile = async ({ userId, userData }) => {
    const user = await this.#userRepository.updateUserData({ userId, userData: { fullName: userData.fullName, phone: userData.phone, avatarUrl: userData.avatarUrl, avatarPublicId: userData.avatarPublicId } });
    return { ...user, password: undefined };
  }
  getAllUsers = async ({ page, limit, roleId, status }) => this.#userRepository.getAllUsers({ page, limit, roleId, status });
  updateUserStatus = async ({ userId, status, actorId }) => {
    const user = await this.#userRepository.updateUserStatus({ userId, status });
    await this.#auditLogRepository.saveLog({ action: 'UPDATE', targetType: 'USER', targetId: userId, outcome: 'SUCCESS', actorId, details: { status } });
    return { ...user, password: undefined };
  }
  changeUserRole = async ({ userId, roleId, actorId }) => {
    const role = await this.#roleRepository.findById(roleId);
    if (!role) throw new BadRequestError('Role not found');
    const user = await this.#userRepository.changeUserRole({ userId, roleId });
    await this.#auditLogRepository.saveLog({ action: 'UPDATE', targetType: 'USER', targetId: userId, outcome: 'SUCCESS', actorId, details: { newRole: role.roleName } });
    return { ...user, password: undefined };
  }
  softDeleteUser = async ({ userId, deletedBy }) => {
    const user = await this.#userRepository.softDeleteUser({ userId, deletedBy });
    if (!user) throw new NotFoundError('User not found');
    return { ...user, password: undefined };
  }
  getStatistics = async () => this.#userRepository.getStatistics();
}
export default UserService;
