import { NotFoundError } from '../error/error.js';
class SupportRequestService {
  #supportRequestRepository;
  constructor({ supportRequestRepository }) { this.#supportRequestRepository = supportRequestRepository; }
  create = async (data) => this.#supportRequestRepository.create(data);
  getAll = async (params) => this.#supportRequestRepository.getAll(params);
  getById = async ({ id }) => { const r = await this.#supportRequestRepository.findById({ id }); if (!r) throw new NotFoundError('Support request not found'); return r; }
  updateStatus = async ({ id, status, resolvedNote }) => this.#supportRequestRepository.updateStatus({ id, status, resolvedNote });
}
export default SupportRequestService;
