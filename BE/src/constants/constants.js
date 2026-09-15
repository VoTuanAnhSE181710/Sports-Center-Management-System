export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

export const ROLES = {
  MANAGER: 'Manager',
  COACH: 'Coach',
  MEMBER: 'Member',
  RECEPTIONIST: 'Receptionist',
};

export const LOGIN_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  LOCKED: 'LOCKED',
};

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
  VIEW: 'VIEW',
};

export const TARGET_TYPES = {
  USER: 'USER',
  MEMBER: 'MEMBER',
  COACH: 'COACH',
  CLASS: 'CLASS',
  SCHEDULE: 'SCHEDULE',
  ENROLLMENT: 'ENROLLMENT',
  MEMBERSHIP: 'MEMBERSHIP',
  PAYMENT: 'PAYMENT',
};

export const OUTCOMES = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const constants = {
  MAX_LOGIN_ATTEMPTS,
  LOCK_TIME,
  ROLES,
  LOGIN_STATUS,
  ACTIONS,
  TARGET_TYPES,
  OUTCOMES,
};

export default constants;
