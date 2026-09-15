import { BadRequestError, NotFoundError } from '../error/error.js';
class EnrollmentService {
  #enrollmentRepository; #classRepository; #subscriptionRepository; #memberRepository;
  constructor({ enrollmentRepository, classRepository, subscriptionRepository, memberRepository }) {
    this.#enrollmentRepository = enrollmentRepository; this.#classRepository = classRepository;
    this.#subscriptionRepository = subscriptionRepository; this.#memberRepository = memberRepository;
  }
  bookClass = async ({ memberProfileId, classId, createdBy }) => {
    const cls = await this.#classRepository.findById({ id: classId });
    if (!cls || cls.status !== 'ACTIVE') throw new NotFoundError('Class not found or inactive');
    const existing = await this.#enrollmentRepository.findByMemberAndClass({ memberProfileId, classId });
    if (existing && existing.status === 'ENROLLED') throw new BadRequestError('Already enrolled in this class');
    const enrolled = await this.#classRepository.countEnrolled({ classId });
    if (enrolled >= cls.maxCapacity) throw new BadRequestError('Class is full');
    const sub = await this.#subscriptionRepository.findActiveByMember({ memberProfileId });
    if (!sub) throw new BadRequestError('Active membership required to book a class');
    if (sub.endDate < new Date()) throw new BadRequestError('Membership has expired');
    return this.#enrollmentRepository.create({ memberProfileId, classId, createdBy });
  }
  cancelBooking = async ({ memberProfileId, classId }) => {
    const existing = await this.#enrollmentRepository.findByMemberAndClass({ memberProfileId, classId });
    if (!existing || existing.status !== 'ENROLLED') throw new BadRequestError('Not enrolled in this class');
    return this.#enrollmentRepository.cancel({ memberProfileId, classId });
  }
  getMyClasses = async ({ memberProfileId }) => this.#enrollmentRepository.getByMember({ memberProfileId });
  getClassMembers = async ({ classId }) => this.#enrollmentRepository.getByClass({ classId });
}
export default EnrollmentService;
