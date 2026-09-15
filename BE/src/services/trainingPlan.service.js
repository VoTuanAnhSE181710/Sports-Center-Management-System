import { NotFoundError } from '../error/error.js';
class TrainingPlanService {
  #trainingPlanRepository;
  constructor({ trainingPlanRepository }) { this.#trainingPlanRepository = trainingPlanRepository; }
  create = async (data) => this.#trainingPlanRepository.create(data);
  getById = async ({ id }) => { const p = await this.#trainingPlanRepository.findById({ id }); if (!p) throw new NotFoundError('Training plan not found'); return p; }
  getByMember = async ({ memberProfileId }) => this.#trainingPlanRepository.getByMember({ memberProfileId });
  getByCoach = async ({ coachProfileId }) => this.#trainingPlanRepository.getByCoach({ coachProfileId });
  update = async ({ id, data }) => { await this.getById({ id }); return this.#trainingPlanRepository.update({ id, data }); }
  addExercise = async (data) => this.#trainingPlanRepository.addExercise(data);
  removeExercise = async ({ id }) => this.#trainingPlanRepository.removeExercise({ id });
  addResult = async (data) => this.#trainingPlanRepository.addResult(data);
}
export default TrainingPlanService;
