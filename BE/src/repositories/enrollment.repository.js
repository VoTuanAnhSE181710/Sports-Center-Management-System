import prisma from '../config/db.js';
class EnrollmentRepository {
  findByMemberAndClass = async ({ memberProfileId, classId }) =>
    prisma.enrollment.findUnique({ where: { memberProfileId_classId: { memberProfileId, classId } } });
  create = async ({ memberProfileId, classId, createdBy }) =>
    prisma.enrollment.create({ data: { memberProfileId, classId, createdBy }, include: { class: true } });
  cancel = async ({ memberProfileId, classId }) =>
    prisma.enrollment.update({ where: { memberProfileId_classId: { memberProfileId, classId } }, data: { status: 'CANCELLED', cancelledAt: new Date() } });
  getByMember = async ({ memberProfileId }) =>
    prisma.enrollment.findMany({ where: { memberProfileId }, include: { class: { include: { sport: true, coachProfile: { include: { user: true } }, classSchedules: { include: { room: true } } } } }, orderBy: { enrolledAt: 'desc' } });
  getByClass = async ({ classId }) =>
    prisma.enrollment.findMany({ where: { classId, status: 'ENROLLED' }, include: { memberProfile: { include: { user: true } } } });
}
export default EnrollmentRepository;
