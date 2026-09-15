import { BadRequestError, NotFoundError } from '../error/error.js';
class ClassService {
  #classRepository; #classScheduleRepository; #coachRepository;
  constructor({ classRepository, classScheduleRepository, coachRepository }) {
    this.#classRepository = classRepository; this.#classScheduleRepository = classScheduleRepository; this.#coachRepository = coachRepository;
  }
  getAll = async (params) => this.#classRepository.getAll(params);
  getById = async ({ id }) => { const c = await this.#classRepository.findById({ id }); if (!c) throw new NotFoundError('Class not found'); return c; }
  create = async (data) => this.#classRepository.create(data);
  update = async ({ id, data }) => { await this.getById({ id }); return this.#classRepository.update({ id, data }); }
  assignCoach = async ({ classId, coachProfileId }) => {
    const cls = await this.getById({ id: classId });
    const coach = await this.#coachRepository.findById({ id: coachProfileId });
    if (!coach) throw new NotFoundError('Coach not found');
    return this.#classRepository.assignCoach({ classId, coachProfileId });
  }
}
export default ClassService;
