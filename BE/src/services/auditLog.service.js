class AuditLogService {
  #auditLogRepository;
  constructor({ auditLogRepository }) { this.#auditLogRepository = auditLogRepository; }
  getLogs = async (params) => this.#auditLogRepository.getLogs(params);
}
export default AuditLogService;
