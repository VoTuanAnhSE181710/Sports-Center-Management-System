import prisma from '../config/db.js';

class SubscriptionRepository {
  create = async ({ memberProfileId, membershipPlanId, startDate, endDate, classesRemaining, createdBy }) =>
    prisma.membershipSubscription.create({
      data: { memberProfileId, membershipPlanId, startDate, endDate, classesRemaining, createdBy, status: 'ACTIVE' },
      include: { membershipPlan: true },
    });

  findActiveByMember = async ({ memberProfileId }) =>
    prisma.membershipSubscription.findFirst({ where: { memberProfileId, status: 'ACTIVE' }, include: { membershipPlan: true }, orderBy: { endDate: 'desc' } });

  findById = async ({ id }) =>
    prisma.membershipSubscription.findUnique({ where: { id }, include: { membershipPlan: true } });

  getByMember = async ({ memberProfileId }) =>
    prisma.membershipSubscription.findMany({ where: { memberProfileId }, include: { membershipPlan: true }, orderBy: { createdAt: 'desc' } });

  renew = async ({ id, newEndDate, renewedFrom }) =>
    prisma.membershipSubscription.update({ where: { id }, data: { endDate: newEndDate, status: 'ACTIVE', renewedFrom }, include: { membershipPlan: true } });

  updateStatus = async ({ id, status }) =>
    prisma.membershipSubscription.update({ where: { id }, data: { status } });

  checkExpiredSubscriptions = async () => {
    return prisma.membershipSubscription.updateMany({
      where: { status: 'ACTIVE', endDate: { lt: new Date() } },
      data: { status: 'EXPIRED' },
    });
  }
}
export default SubscriptionRepository;
