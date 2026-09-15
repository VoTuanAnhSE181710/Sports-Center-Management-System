import prisma from '../config/db.js';

class MembershipPlanRepository {
  getAll = async ({ includeInactive = false } = {}) =>
    prisma.membershipPlan.findMany({ where: includeInactive ? {} : { isActive: true }, orderBy: { price: 'asc' } });

  findById = async ({ id }) => prisma.membershipPlan.findUnique({ where: { id } });

  create = async (data) => prisma.membershipPlan.create({ data });

  update = async ({ id, data }) => prisma.membershipPlan.update({ where: { id }, data });

  delete = async ({ id }) => prisma.membershipPlan.update({ where: { id }, data: { isActive: false } });
}
export default MembershipPlanRepository;
