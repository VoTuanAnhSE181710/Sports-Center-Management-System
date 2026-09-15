import { Router } from 'express';
import { makeInvoker } from 'awilix-express';
import AuditLogController from '../controllers/auditLog.controller.js';
import { authenticate, authorize } from '../middlewares/middleware.js';
const api = makeInvoker(AuditLogController);
const router = Router();
router.get('/', authenticate, authorize(['Manager']), api('getLogs'));
export default router;
