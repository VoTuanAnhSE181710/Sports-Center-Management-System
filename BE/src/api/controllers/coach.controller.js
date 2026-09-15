import { StatusCodes } from 'http-status-codes';
class CoachController {
  #coachService;
  constructor({ coachService }) { this.#coachService = coachService; }
  create = async (req, res) => {
    const result = await this.#coachService.createCoach({ ...req.body, createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  }
  getAll = async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const result = await this.#coachService.getAllCoaches({ page: +page, limit: +limit, search });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  getById = async (req, res) => {
    const result = await this.#coachService.getCoachById({ id: req.params.id });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  update = async (req, res) => {
    const result = await this.#coachService.updateCoach({ id: req.params.id, data: req.body });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
}
export default CoachController;
