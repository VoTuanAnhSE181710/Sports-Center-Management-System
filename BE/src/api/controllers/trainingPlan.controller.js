import { StatusCodes } from 'http-status-codes';
class TrainingPlanController {
  #trainingPlanService; constructor({ trainingPlanService }) { this.#trainingPlanService = trainingPlanService; }
  create = async (req, res) => { const r = await this.#trainingPlanService.create(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  getById = async (req, res) => { const r = await this.#trainingPlanService.getById({ id: req.params.id }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getByMember = async (req, res) => { const r = await this.#trainingPlanService.getByMember({ memberProfileId: req.params.memberProfileId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getByCoach = async (req, res) => { const r = await this.#trainingPlanService.getByCoach({ coachProfileId: req.params.coachProfileId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  update = async (req, res) => { const r = await this.#trainingPlanService.update({ id: req.params.id, data: req.body }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  addExercise = async (req, res) => { const r = await this.#trainingPlanService.addExercise({ trainingPlanId: req.params.id, ...req.body }); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  removeExercise = async (req, res) => { await this.#trainingPlanService.removeExercise({ id: req.params.exerciseId }); res.status(StatusCodes.OK).json({ status: 'success', message: 'Exercise removed' }); }
  addResult = async (req, res) => { const r = await this.#trainingPlanService.addResult({ trainingPlanId: req.params.id, ...req.body }); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
}
export default TrainingPlanController;
