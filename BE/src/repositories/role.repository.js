import prisma from '../config/db.js';

class RoleRepository {
  findRoleByName = async ({ roleName }) => prisma.role.findUnique({ where: { roleName } });
  findById = async (id) => prisma.role.findUnique({ where: { id } });
  getAllRoles = async () => prisma.role.findMany({ include: { rolePermissions: { include: { permission: true } } } });
  createRole = async ({ roleName, description }) => prisma.role.create({ data: { roleName, description } });
  updateRole = async ({ id, data }) => prisma.role.update({ where: { id }, data });
  deleteRole = async ({ id }) => prisma.role.delete({ where: { id } });
}
export default RoleRepository;
