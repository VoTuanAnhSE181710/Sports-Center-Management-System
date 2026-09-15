import { StatusCodes } from 'http-status-codes';
class SportController {
  #sportService; constructor({ sportService }) { this.#sportService = sportService; }
  getAll = async (req, res) => { const r = await this.#sportService.getAll({ includeInactive: req.query.includeInactive === 'true' }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#sportService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  create = async (req, res) => { const r = await this.#sportService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  update = async (req, res) => { const r = await this.#sportService.update({ id: req.params.id, data: req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  delete = async (req, res) => { await this.#sportService.delete({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', message: 'Sport deactivated' }); }
}
export default SportController;
