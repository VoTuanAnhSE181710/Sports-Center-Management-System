import { StatusCodes } from 'http-status-codes';
class ClassController {
  #classService; constructor({ classService }) { this.#classService = classService; }
  getAll = async (req, res) => { const { page=1, limit=10, sportId, coachProfileId, status } = req.query; const r = await this.#classService.getAll({ page:+page, limit:+limit, sportId, coachProfileId, status }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#classService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  create = async (req, res) => { const r = await this.#classService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  update = async (req, res) => { const r = await this.#classService.update({ id: req.params.id, data: req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  assignCoach = async (req, res) => { const r = await this.#classService.assignCoach({ classId: req.params.id, coachProfileId: req.body.coachProfileId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default ClassController;
