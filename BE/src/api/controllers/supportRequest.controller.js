import { StatusCodes } from 'http-status-codes';
class SupportRequestController {
  #supportRequestService; constructor({ supportRequestService }) { this.#supportRequestService = supportRequestService; }
  create = async (req, res) => { const r = await this.#supportRequestService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  getAll = async (req, res) => { const { page=1, limit=10, status } = req.query; const r = await this.#supportRequestService.getAll({ page:+page, limit:+limit, status }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#supportRequestService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  updateStatus = async (req, res) => { const r = await this.#supportRequestService.updateStatus({ id: req.params.id, ...req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default SupportRequestController;
