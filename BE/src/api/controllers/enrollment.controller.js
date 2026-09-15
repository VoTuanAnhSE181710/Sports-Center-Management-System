import { StatusCodes } from 'http-status-codes';
class EnrollmentController {
  #enrollmentService; constructor({ enrollmentService }) { this.#enrollmentService = enrollmentService; }
  book = async (req, res) => { const r = await this.#enrollmentService.bookClass({ memberProfileId: req.body.memberProfileId, classId: req.body.classId, createdBy: req.user.userId }); res.status(StatusCodes.CREATED).json({ status: 'success', data: r }); }
  cancel = async (req, res) => { const r = await this.#enrollmentService.cancelBooking({ memberProfileId: req.body.memberProfileId, classId: req.body.classId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getMyClasses = async (req, res) => { const r = await this.#enrollmentService.getMyClasses({ memberProfileId: req.params.memberProfileId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
  getClassMembers = async (req, res) => { const r = await this.#enrollmentService.getClassMembers({ classId: req.params.classId }); res.status(StatusCodes.OK).json({ status: 'success', data: r }); }
}
export default EnrollmentController;
