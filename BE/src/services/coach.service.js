import { BadRequestError, NotFoundError } from '../error/error.js';
import { ROLES } from '../constants/constants.js';
class CoachService {
  #coachRepository; #userRepository; #roleRepository; #hashService;
  constructor({ coachRepository, userRepository, roleRepository, hashService }) {
    this.#coachRepository = coachRepository; this.#userRepository = userRepository; this.#roleRepository = roleRepository; this.#hashService = hashService;
  }
  createCoach = async ({ email, password, fullName, phone, specialization, experience, bio, createdBy }) => {
    const existing = await this.#userRepository.findUserByEmail({ email: email.toLowerCase() });
    if (existing) throw new BadRequestError('Email already registered!');
    const role = await this.#roleRepository.findRoleByName({ roleName: ROLES.COACH });
    if (!role) throw new BadRequestError('Coach role not found. Please seed data first.');
    const hashed = await this.#hashService.hash({ string: password });
    const user = await this.#userRepository.createUser({ email: email.toLowerCase(), password: hashed, fullName, phone, roleId: role.id, createdBy });
    return this.#coachRepository.create({ userId: user.id, specialization, experience, bio });
  }
  getCoachById = async ({ id }) => {
    const coach = await this.#coachRepository.findById({ id });
    if (!coach) throw new NotFoundError('Coach not found');
    return coach;
  }
  getAllCoaches = async ({ page, limit, search }) => this.#coachRepository.getAll({ page, limit, search });
  updateCoach = async ({ id, data }) => {
    const coach = await this.#coachRepository.update({ id, data });
    if (!coach) throw new NotFoundError('Coach not found');
    return coach;
  }
}
export default CoachService;
