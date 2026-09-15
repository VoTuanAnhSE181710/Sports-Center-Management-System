import prisma from '../config/db.js';
import { MAX_LOGIN_ATTEMPTS, LOCK_TIME } from '../constants/constants.js';

class UserRepository {
  findUserByEmail = async ({ email }) => {
    return prisma.user.findUnique({ where: { email }, include: { role: true } });
  }

  findUserByPhone = async ({ phone }) => {
    return prisma.user.findUnique({ where: { phone }, include: { role: true } });
  }

  findUserById = async ({ userId }) => {
    return prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
  }

  createUser = async ({ email, password, fullName, phone, roleId, createdBy, avatarUrl, avatarPublicId }) => {
    return prisma.user.create({
      data: { email, password, fullName, phone, roleId, createdBy, avatarUrl, avatarPublicId, status: 'ACTIVE' },
      include: { role: true },
    });
  }

  updateUserData = async ({ userId, userData }) => {
    return prisma.user.update({ where: { id: userId }, data: userData, include: { role: true } });
  }

  updateUserStatus = async ({ userId, status }) => {
    return prisma.user.update({ where: { id: userId }, data: { status }, include: { role: true } });
  }

  incrementLoginAttempts = async ({ userId }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const newAttempts = user.loginAttempts + 1;
    const data = newAttempts >= MAX_LOGIN_ATTEMPTS
      ? { loginAttempts: newAttempts, status: 'LOCKED', lockUntil: new Date(Date.now() + LOCK_TIME) }
      : { loginAttempts: newAttempts };
    return prisma.user.update({ where: { id: userId }, data, include: { role: true } });
  }

  resetLoginAttempts = async ({ userId }) => {
    return prisma.user.update({ where: { id: userId }, data: { loginAttempts: 0, lockUntil: null }, include: { role: true } });
  }

  checkAndUnlockAccount = async ({ userId }) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (user.status === 'LOCKED' && user.lockUntil && user.lockUntil < new Date()) {
      return prisma.user.update({ where: { id: userId }, data: { status: 'ACTIVE', loginAttempts: 0, lockUntil: null }, include: { role: true } });
    }
    return user;
  }

  changePassword = async ({ userId, password }) => {
    return prisma.user.update({ where: { id: userId }, data: { password, loginAttempts: 0, lockUntil: null }, include: { role: true } });
  }

  changeUserRole = async ({ userId, roleId }) => {
    return prisma.user.update({ where: { id: userId }, data: { roleId }, include: { role: true } });
  }

  softDeleteUser = async ({ userId, deletedBy }) => {
    return prisma.user.update({ where: { id: userId }, data: { status: 'INACTIVE', deletedAt: new Date(), deletedBy }, include: { role: true } });
  }

  getAllUsers = async ({ page = 1, limit = 10, roleId, status }) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (status) where.status = status;
    if (roleId) where.roleId = roleId;
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit, include: { role: true }, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where }),
    ]);
    return { users, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalItems: total, itemsPerPage: limit } };
  }

  getStatistics = async () => {
    const [total, active, inactive, locked] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count({ where: { status: 'INACTIVE' } }),
      prisma.user.count({ where: { status: 'LOCKED' } }),
    ]);
    return { totalUsers: total, activeUsers: active, inactiveUsers: inactive, lockedUsers: locked };
  }
}

export default UserRepository;
