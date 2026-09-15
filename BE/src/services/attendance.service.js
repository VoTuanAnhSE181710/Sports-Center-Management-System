import { BadRequestError } from '../error/error.js';
class AttendanceService {
  #attendanceRepository; #enrollmentRepository;
  constructor({ attendanceRepository, enrollmentRepository }) { this.#attendanceRepository = attendanceRepository; this.#enrollmentRepository = enrollmentRepository; }
  checkIn = async ({ memberProfileId, classScheduleId, note }) => {
    const existing = await this.#attendanceRepository.findOne({ memberProfileId, classScheduleId });
    if (existing) throw new BadRequestError('Already checked in for this session');
    return this.#attendanceRepository.checkIn({ memberProfileId, classScheduleId, note });
  }
  getHistory = async ({ memberProfileId, page, limit }) => this.#attendanceRepository.getByMember({ memberProfileId, page, limit });
  getBySchedule = async ({ classScheduleId }) => this.#attendanceRepository.getBySchedule({ classScheduleId });
}
export default AttendanceService;
