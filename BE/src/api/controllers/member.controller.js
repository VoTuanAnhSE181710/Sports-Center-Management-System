import { StatusCodes } from 'http-status-codes';
class MemberController {
  #memberService;
  constructor({ memberService }) { this.#memberService = memberService; }
  create = async (req, res) => {
    const result = await this.#memberService.createMember({ ...req.body, createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  }
  getAll = async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const result = await this.#memberService.getAllMembers({ page: +page, limit: +limit, search });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  getById = async (req, res) => {
    const result = await this.#memberService.getMemberById({ id: req.params.id });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  getMyProfile = async (req, res) => {
    const result = await this.#memberService.getMemberByUserId({ userId: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  update = async (req, res) => {
    const result = await this.#memberService.updateMember({ id: req.params.id, data: req.body });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
}
export default MemberController;
