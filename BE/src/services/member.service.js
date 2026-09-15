import { BadRequestError, NotFoundError } from '../error/error.js';
import { ROLES } from '../constants/constants.js';
class MemberService {
  #memberRepository; #userRepository; #roleRepository; #hashService;
  constructor({ memberRepository, userRepository, roleRepository, hashService }) {
    this.#memberRepository = memberRepository; this.#userRepository = userRepository; this.#roleRepository = roleRepository; this.#hashService = hashService;
  }
  createMember = async ({ email, password, fullName, phone, dateOfBirth, gender, address, fitnessGoal, trainingLevel, healthNote, createdBy }) => {
    const existing = await this.#userRepository.findUserByEmail({ email: email.toLowerCase() });
    if (existing) throw new BadRequestError('Email already registered!');
    const role = await this.#roleRepository.findRoleByName({ roleName: ROLES.MEMBER });
    if (!role) throw new BadRequestError('Member role not found. Please seed data first.');
    const hashed = await this.#hashService.hash({ string: password });
    const user = await this.#userRepository.createUser({ email: email.toLowerCase(), password: hashed, fullName, phone, roleId: role.id, createdBy });
    const profile = await this.#memberRepository.create({ userId: user.id, dateOfBirth, gender, address, fitnessGoal, trainingLevel, healthNote });
    return profile;
  }
  getMemberById = async ({ id }) => {
    const member = await this.#memberRepository.findById({ id });
    if (!member) throw new NotFoundError('Member not found');
    return member;
  }
  getMemberByUserId = async ({ userId }) => {
    const member = await this.#memberRepository.findByUserId({ userId });
    if (!member) throw new NotFoundError('Member not found');
    return member;
  }
  getAllMembers = async ({ page, limit, search }) => this.#memberRepository.getAll({ page, limit, search });
  updateMember = async ({ id, data }) => {
    const member = await this.#memberRepository.update({ id, data });
    if (!member) throw new NotFoundError('Member not found');
    return member;
  }
}
export default MemberService;
