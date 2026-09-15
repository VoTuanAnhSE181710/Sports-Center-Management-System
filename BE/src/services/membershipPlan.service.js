import { BadRequestError, NotFoundError } from '../error/error.js';
class MembershipPlanService {
  #membershipPlanRepository;
  constructor({ membershipPlanRepository }) { this.#membershipPlanRepository = membershipPlanRepository; }
  getAll = async ({ includeInactive }) => this.#membershipPlanRepository.getAll({ includeInactive });
  getById = async ({ id }) => {
    const plan = await this.#membershipPlanRepository.findById({ id });
    if (!plan) throw new NotFoundError('Membership plan not found');
    return plan;
  }
  create = async (data) => this.#membershipPlanRepository.create(data);
  update = async ({ id, data }) => {
    const plan = await this.#membershipPlanRepository.findById({ id });
    if (!plan) throw new NotFoundError('Membership plan not found');
    return this.#membershipPlanRepository.update({ id, data });
  }
  delete = async ({ id }) => {
    const plan = await this.#membershipPlanRepository.findById({ id });
    if (!plan) throw new NotFoundError('Membership plan not found');
    return this.#membershipPlanRepository.delete({ id });
  }
}
export default MembershipPlanService;
