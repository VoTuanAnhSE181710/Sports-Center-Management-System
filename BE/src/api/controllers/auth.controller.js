import { StatusCodes } from 'http-status-codes';
class AuthController {
  #authService;
  constructor({ authService }) { this.#authService = authService; }
  login = async (req, res) => {
    const { email, password, deviceName } = req.body;
    const result = await this.#authService.login({ email, password, deviceName });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  logout = async (req, res) => {
    await this.#authService.logout({ userId: req.user.userId, deviceId: req.user.deviceId });
    res.status(StatusCodes.OK).json({ status: 'success', message: 'Logged out successfully' });
  }
  register = async (req, res) => {
    const result = await this.#authService.register({ ...req.body, createdBy: req.user?.userId });
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  }
  refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const result = await this.#authService.refreshToken({ oldRefreshToken: refreshToken, deviceName: req.body.deviceName });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
  changePassword = async (req, res) => {
    const result = await this.#authService.changePassword({ ...req.body, userId: req.user.userId });
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  }
}
export default AuthController;
