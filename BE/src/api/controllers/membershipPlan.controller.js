import { StatusCodes } from 'http-status-codes';
class MembershipPlanController {
  #membershipPlanService;
  constructor({ membershipPlanService }) { this.#membershipPlanService = membershipPlanService; }
  getAll = async (req, res) => { const r = await this.#membershipPlanService.getAll({ includeInactive: req.query.includeInactive === 'true' }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#membershipPlanService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  create = async (req, res) => { const r = await this.#membershipPlanService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  update = async (req, res) => { const r = await this.#membershipPlanService.update({ id: req.params.id, data: req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  delete = async (req, res) => { await this.#membershipPlanService.delete({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', message: 'Plan deactivated' }); }
}
export default MembershipPlanController;
