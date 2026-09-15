import prisma from '../config/db.js';

class RefreshTokenRepository {
  save = async ({ userId, token, deviceId, deviceName, expiresAt }) =>
    prisma.refreshToken.create({ data: { userId, token, deviceId, deviceName, expiresAt } });

  findByToken = async ({ token }) => prisma.refreshToken.findUnique({ where: { token } });

  findByUserAndDevice = async ({ userId, deviceId }) =>
    prisma.refreshToken.findFirst({ where: { userId, deviceId } });

  revokeByDevice = async ({ userId, deviceId }) =>
    prisma.refreshToken.deleteMany({ where: { userId, deviceId } });

  revokeAll = async ({ userId }) => prisma.refreshToken.deleteMany({ where: { userId } });

  verifyOwner = async ({ userId, deviceId }) => {
    const token = await prisma.refreshToken.findFirst({ where: { userId, deviceId } });
    return token ? 1 : 0;
  }
}
export default RefreshTokenRepository;
