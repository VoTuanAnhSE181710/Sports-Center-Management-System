import { NotFoundError } from '../error/error.js';
class SportService {
  #sportRepository;
  constructor({ sportRepository }) { this.#sportRepository = sportRepository; }
  getAll = async ({ includeInactive }) => this.#sportRepository.getAll({ includeInactive });
  getById = async ({ id }) => { const s = await this.#sportRepository.findById({ id }); if (!s) throw new NotFoundError('Sport not found'); return s; }
  create = async (data) => this.#sportRepository.create(data);
  update = async ({ id, data }) => { await this.getById({ id }); return this.#sportRepository.update({ id, data }); }
  delete = async ({ id }) => { await this.getById({ id }); return this.#sportRepository.delete({ id }); }
}
export default SportService;
