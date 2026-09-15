import { createContainer, asClass, asValue, Lifetime } from 'awilix';
import prisma from './src/config/db.js';
import redisClient from './src/utils/redisClient.js';
import transporter from './src/utils/emailTransporter.js';
import cloudinary from './src/utils/cloudinary.js';
import constants from './src/constants/constants.js';

// Controllers
import AuthController from './src/api/controllers/auth.controller.js';
import UserController from './src/api/controllers/user.controller.js';
import MemberController from './src/api/controllers/member.controller.js';
import CoachController from './src/api/controllers/coach.controller.js';
import MembershipPlanController from './src/api/controllers/membershipPlan.controller.js';
import SubscriptionController from './src/api/controllers/subscription.controller.js';
import SportController from './src/api/controllers/sport.controller.js';
import RoomController from './src/api/controllers/room.controller.js';
import ClassController from './src/api/controllers/class.controller.js';
import EnrollmentController from './src/api/controllers/enrollment.controller.js';
import AttendanceController from './src/api/controllers/attendance.controller.js';
import PaymentController from './src/api/controllers/payment.controller.js';
import InvoiceController from './src/api/controllers/invoice.controller.js';
import TrainingPlanController from './src/api/controllers/trainingPlan.controller.js';
import NotificationController from './src/api/controllers/notification.controller.js';
import AuditLogController from './src/api/controllers/auditLog.controller.js';
import SupportRequestController from './src/api/controllers/supportRequest.controller.js';
import PermissionController from './src/api/controllers/permission.controller.js';
import RoleController from './src/api/controllers/role.controller.js';
import MailController from './src/api/controllers/mail.controller.js';

// Services
import AuthService from './src/services/auth.service.js';
import HashService from './src/services/hash.service.js';
import TokenService from './src/services/token.service.js';
import UserService from './src/services/user.service.js';
import MemberService from './src/services/member.service.js';
import CoachService from './src/services/coach.service.js';
import MembershipPlanService from './src/services/membershipPlan.service.js';
import SubscriptionService from './src/services/subscription.service.js';
import SportService from './src/services/sport.service.js';
import RoomService from './src/services/room.service.js';
import ClassService from './src/services/class.service.js';
import EnrollmentService from './src/services/enrollment.service.js';
import AttendanceService from './src/services/attendance.service.js';
import PaymentService from './src/services/payment.service.js';
import InvoiceService from './src/services/invoice.service.js';
import TrainingPlanService from './src/services/trainingPlan.service.js';
import NotificationService from './src/services/notification.service.js';
import AuditLogService from './src/services/auditLog.service.js';
import SupportRequestService from './src/services/supportRequest.service.js';
import PermissionService from './src/services/permission.service.js';
import RoleService from './src/services/role.service.js';
import MailService from './src/services/mail.service.js';

// Repositories
import UserRepository from './src/repositories/user.repository.js';
import RoleRepository from './src/repositories/role.repository.js';
import PermissionRepository from './src/repositories/permission.repository.js';
import RefreshTokenRepository from './src/repositories/refreshToken.repository.js';
import AuditLogRepository from './src/repositories/auditLog.repository.js';
import MemberRepository from './src/repositories/member.repository.js';
import CoachRepository from './src/repositories/coach.repository.js';
import MembershipPlanRepository from './src/repositories/membershipPlan.repository.js';
import SubscriptionRepository from './src/repositories/subscription.repository.js';
import SportRepository from './src/repositories/sport.repository.js';
import RoomRepository from './src/repositories/room.repository.js';
import ClassRepository from './src/repositories/class.repository.js';
import ClassScheduleRepository from './src/repositories/classSchedule.repository.js';
import EnrollmentRepository from './src/repositories/enrollment.repository.js';
import AttendanceRepository from './src/repositories/attendance.repository.js';
import PaymentRepository from './src/repositories/payment.repository.js';
import InvoiceRepository from './src/repositories/invoice.repository.js';
import TrainingPlanRepository from './src/repositories/trainingPlan.repository.js';
import NotificationRepository from './src/repositories/notification.repository.js';
import SupportRequestRepository from './src/repositories/supportRequest.repository.js';

const container = createContainer();

export function setupContainer({ io, notificationNamespace }) {
  container.register({
    // Values
    io: asValue(io),
    notifications: asValue(notificationNamespace, { lifetime: Lifetime.SINGLETON }),
    redis: asValue(redisClient, { lifetime: Lifetime.SINGLETON }),
    constants: asValue(constants, { lifetime: Lifetime.SINGLETON }),
    transporter: asValue(transporter, { lifetime: Lifetime.SINGLETON }),
    cloudinary: asValue(cloudinary, { lifetime: Lifetime.SINGLETON }),
    prisma: asValue(prisma, { lifetime: Lifetime.SINGLETON }),

    // Repositories
    userRepository: asClass(UserRepository, { lifetime: Lifetime.SCOPED }),
    roleRepository: asClass(RoleRepository, { lifetime: Lifetime.SCOPED }),
    permissionRepository: asClass(PermissionRepository, { lifetime: Lifetime.SCOPED }),
    refreshTokenRepository: asClass(RefreshTokenRepository, { lifetime: Lifetime.SCOPED }),
    auditLogRepository: asClass(AuditLogRepository, { lifetime: Lifetime.SCOPED }),
    memberRepository: asClass(MemberRepository, { lifetime: Lifetime.SCOPED }),
    coachRepository: asClass(CoachRepository, { lifetime: Lifetime.SCOPED }),
    membershipPlanRepository: asClass(MembershipPlanRepository, { lifetime: Lifetime.SCOPED }),
    subscriptionRepository: asClass(SubscriptionRepository, { lifetime: Lifetime.SCOPED }),
    sportRepository: asClass(SportRepository, { lifetime: Lifetime.SCOPED }),
    roomRepository: asClass(RoomRepository, { lifetime: Lifetime.SCOPED }),
    classRepository: asClass(ClassRepository, { lifetime: Lifetime.SCOPED }),
    classScheduleRepository: asClass(ClassScheduleRepository, { lifetime: Lifetime.SCOPED }),
    enrollmentRepository: asClass(EnrollmentRepository, { lifetime: Lifetime.SCOPED }),
    attendanceRepository: asClass(AttendanceRepository, { lifetime: Lifetime.SCOPED }),
    paymentRepository: asClass(PaymentRepository, { lifetime: Lifetime.SCOPED }),
    invoiceRepository: asClass(InvoiceRepository, { lifetime: Lifetime.SCOPED }),
    trainingPlanRepository: asClass(TrainingPlanRepository, { lifetime: Lifetime.SCOPED }),
    notificationRepository: asClass(NotificationRepository, { lifetime: Lifetime.SCOPED }),
    supportRequestRepository: asClass(SupportRequestRepository, { lifetime: Lifetime.SCOPED }),

    // Services
    hashService: asClass(HashService, { lifetime: Lifetime.SCOPED }),
    tokenService: asClass(TokenService, { lifetime: Lifetime.SCOPED }),
    mailService: asClass(MailService, { lifetime: Lifetime.SCOPED }),
    authService: asClass(AuthService, { lifetime: Lifetime.SCOPED }),
    userService: asClass(UserService, { lifetime: Lifetime.SCOPED }),
    memberService: asClass(MemberService, { lifetime: Lifetime.SCOPED }),
    coachService: asClass(CoachService, { lifetime: Lifetime.SCOPED }),
    membershipPlanService: asClass(MembershipPlanService, { lifetime: Lifetime.SCOPED }),
    subscriptionService: asClass(SubscriptionService, { lifetime: Lifetime.SCOPED }),
    sportService: asClass(SportService, { lifetime: Lifetime.SCOPED }),
    roomService: asClass(RoomService, { lifetime: Lifetime.SCOPED }),
    classService: asClass(ClassService, { lifetime: Lifetime.SCOPED }),
    enrollmentService: asClass(EnrollmentService, { lifetime: Lifetime.SCOPED }),
    attendanceService: asClass(AttendanceService, { lifetime: Lifetime.SCOPED }),
    paymentService: asClass(PaymentService, { lifetime: Lifetime.SCOPED }),
    invoiceService: asClass(InvoiceService, { lifetime: Lifetime.SCOPED }),
    trainingPlanService: asClass(TrainingPlanService, { lifetime: Lifetime.SCOPED }),
    notificationService: asClass(NotificationService, { lifetime: Lifetime.SCOPED }),
    auditLogService: asClass(AuditLogService, { lifetime: Lifetime.SCOPED }),
    supportRequestService: asClass(SupportRequestService, { lifetime: Lifetime.SCOPED }),
    permissionService: asClass(PermissionService, { lifetime: Lifetime.SCOPED }),
    roleService: asClass(RoleService, { lifetime: Lifetime.SCOPED }),

    // Controllers
    authController: asClass(AuthController, { lifetime: Lifetime.SCOPED }),
    userController: asClass(UserController, { lifetime: Lifetime.SCOPED }),
    memberController: asClass(MemberController, { lifetime: Lifetime.SCOPED }),
    coachController: asClass(CoachController, { lifetime: Lifetime.SCOPED }),
    membershipPlanController: asClass(MembershipPlanController, { lifetime: Lifetime.SCOPED }),
    subscriptionController: asClass(SubscriptionController, { lifetime: Lifetime.SCOPED }),
    sportController: asClass(SportController, { lifetime: Lifetime.SCOPED }),
    roomController: asClass(RoomController, { lifetime: Lifetime.SCOPED }),
    classController: asClass(ClassController, { lifetime: Lifetime.SCOPED }),
    enrollmentController: asClass(EnrollmentController, { lifetime: Lifetime.SCOPED }),
    attendanceController: asClass(AttendanceController, { lifetime: Lifetime.SCOPED }),
    paymentController: asClass(PaymentController, { lifetime: Lifetime.SCOPED }),
    invoiceController: asClass(InvoiceController, { lifetime: Lifetime.SCOPED }),
    trainingPlanController: asClass(TrainingPlanController, { lifetime: Lifetime.SCOPED }),
    notificationController: asClass(NotificationController, { lifetime: Lifetime.SCOPED }),
    auditLogController: asClass(AuditLogController, { lifetime: Lifetime.SCOPED }),
    supportRequestController: asClass(SupportRequestController, { lifetime: Lifetime.SCOPED }),
    permissionController: asClass(PermissionController, { lifetime: Lifetime.SCOPED }),
    roleController: asClass(RoleController, { lifetime: Lifetime.SCOPED }),
    mailController: asClass(MailController, { lifetime: Lifetime.SCOPED }),
  });
  return container;
}

export default container;
