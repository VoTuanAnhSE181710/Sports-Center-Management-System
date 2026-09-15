import { StatusCodes } from 'http-status-codes';
class RoomController {
  #roomService; constructor({ roomService }) { this.#roomService = roomService; }
  getAll = async (req, res) => { const r = await this.#roomService.getAll({ includeInactive: req.query.includeInactive === 'true' }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#roomService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  create = async (req, res) => { const r = await this.#roomService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  update = async (req, res) => { const r = await this.#roomService.update({ id: req.params.id, data: req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  delete = async (req, res) => { await this.#roomService.delete({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', message: 'Room deactivated' }); }
}
export default RoomController;
