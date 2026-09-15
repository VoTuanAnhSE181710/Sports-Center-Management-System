import { StatusCodes } from 'http-status-codes';
class AuditLogController {
  #auditLogService; constructor({ auditLogService }) { this.#auditLogService = auditLogService; }
  getLogs = async (req, res) => { const { page=1, limit=20, actorId, action, targetType, outcome } = req.query; const r = await this.#auditLogService.getLogs({ page:+page, limit:+limit, actorId, action, targetType, outcome }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default AuditLogController;
