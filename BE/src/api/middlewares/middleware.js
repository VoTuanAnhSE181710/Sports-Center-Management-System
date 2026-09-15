import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { AuthenticationError, AuthorizationError } from '../../error/error.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Header is not containing information');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    throw new AuthenticationError('Token is invalid or expired');
  }
};

export const authorize = (roles = []) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.roleName)) {
    throw new AuthorizationError('You do not have permission to access this resource');
  }
  next();
};

export const handleError = (err, req, res, next) => {
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ status: 'error', message: err.message || 'Internal Server Error' });
};
