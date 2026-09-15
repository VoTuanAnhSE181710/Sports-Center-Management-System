import { NotFoundError } from '../error/error.js';
class RoomService {
  #roomRepository;
  constructor({ roomRepository }) { this.#roomRepository = roomRepository; }
  getAll = async ({ includeInactive }) => this.#roomRepository.getAll({ includeInactive });
  getById = async ({ id }) => { const r = await this.#roomRepository.findById({ id }); if (!r) throw new NotFoundError('Room not found'); return r; }
  create = async (data) => this.#roomRepository.create(data);
  update = async ({ id, data }) => { await this.getById({ id }); return this.#roomRepository.update({ id, data }); }
  delete = async ({ id }) => { await this.getById({ id }); return this.#roomRepository.delete({ id }); }
}
export default RoomService;
