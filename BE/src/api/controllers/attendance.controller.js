import { StatusCodes } from 'http-status-codes';
class AttendanceController {
  #attendanceService; constructor({ attendanceService }) { this.#attendanceService = attendanceService; }
  checkIn = async (req, res) => { const r = await this.#attendanceService.checkIn(req.body); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  getHistory = async (req, res) => { const { page=1, limit=20 } = req.query; const r = await this.#attendanceService.getHistory({ memberProfileId: req.params.memberProfileId, page:+page, limit:+limit }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getBySchedule = async (req, res) => { const r = await this.#attendanceService.getBySchedule({ classScheduleId: req.params.classScheduleId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default AttendanceController;
