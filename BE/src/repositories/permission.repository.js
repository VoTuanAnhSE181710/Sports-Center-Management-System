import prisma from '../config/db.js';

class PermissionRepository {
  getAll = async () => prisma.permission.findMany();
  findById = async (id) => prisma.permission.findUnique({ where: { id } });
  findByName = async ({ name }) => prisma.permission.findUnique({ where: { name } });
  create = async (data) => prisma.permission.create({ data });
  assignToRole = async ({ roleId, permissionId }) =>
    prisma.rolePermission.upsert({ where: { roleId_permissionId: { roleId, permissionId } }, update: {}, create: { roleId, permissionId } });
  removeFromRole = async ({ roleId, permissionId }) =>
    prisma.rolePermission.delete({ where: { roleId_permissionId: { roleId, permissionId } } });
}
export default PermissionRepository;
