import prisma from '../config/db.js';
class TrainingPlanRepository {
  create = async ({ memberProfileId, coachProfileId, title, description, startDate, endDate }) =>
    prisma.trainingPlan.create({ data: { memberProfileId, coachProfileId, title, description, startDate, endDate }, include: { exercises: true } });
  findById = async ({ id }) => prisma.trainingPlan.findUnique({ where: { id }, include: { exercises: true, trainingResults: true, coachProfile: { include: { user: true } }, memberProfile: { include: { user: true } } } });
  getByMember = async ({ memberProfileId }) => prisma.trainingPlan.findMany({ where: { memberProfileId }, include: { exercises: true, coachProfile: { include: { user: true } } }, orderBy: { createdAt: 'desc' } });
  getByCoach = async ({ coachProfileId }) => prisma.trainingPlan.findMany({ where: { coachProfileId }, include: { exercises: true, memberProfile: { include: { user: true } } }, orderBy: { createdAt: 'desc' } });
  update = async ({ id, data }) => prisma.trainingPlan.update({ where: { id }, data, include: { exercises: true } });
  addExercise = async ({ trainingPlanId, name, sets, reps, duration, note, orderIndex }) =>
    prisma.trainingExercise.create({ data: { trainingPlanId, name, sets, reps, duration, note, orderIndex } });
  removeExercise = async ({ id }) => prisma.trainingExercise.delete({ where: { id } });
  addResult = async ({ trainingPlanId, coachProfileId, sessionDate, performance, coachComment, rating }) =>
    prisma.trainingResult.create({ data: { trainingPlanId, coachProfileId, sessionDate, performance, coachComment, rating } });
}
export default TrainingPlanRepository;
