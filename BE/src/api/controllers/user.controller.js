import { StatusCodes } from 'http-status-codes';
class UserController {
  #userService;
  constructor({ userService }) { this.#userService = userService; }
  getProfile = async (req, res) => {
    const user = await this.#userService.getProfile({ userId: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: user });
  }
  updateProfile = async (req, res) => {
    const user = await this.#userService.updateProfile({ userId: req.user.userId, userData: req.body });
    res.status(StatusCodes.OK).json({ status: 'success', data: user });
  }
  getAllUsers = async (req, res) => {
    const { page = 1, limit = 10, roleId, status } = req.query;
    const result = await this.#userService.getAllUsers({ page: +page, limit: +limit, roleId, status });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  updateUserStatus = async (req, res) => {
    const user = await this.#userService.updateUserStatus({ userId: req.params.id, status: req.body.status, actorId: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: user });
  }
  changeUserRole = async (req, res) => {
    const user = await this.#userService.changeUserRole({ userId: req.params.id, roleId: req.body.roleId, actorId: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: user });
  }
  softDeleteUser = async (req, res) => {
    await this.#userService.softDeleteUser({ userId: req.params.id, deletedBy: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', message: 'User deleted successfully' });
  }
  getStatistics = async (req, res) => {
    const stats = await this.#userService.getStatistics();
    res.status(StatusCodes.OK).json({ status: 'success', data: stats });
  }
}
export default UserController;
