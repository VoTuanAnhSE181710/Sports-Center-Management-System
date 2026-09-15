import express from 'express';
import { scopePerRequest } from 'awilix-express';
import cors from 'cors';
import container from './container.js';
import { handleError } from './src/api/middlewares/middleware.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import rateLimit from 'express-rate-limit';
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();
app.set('trust proxy', 1);

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
    'http://localhost:8081',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many requests. Please try again after 15 minutes.' },
});
app.use('/api/', globalLimiter);
app.use(scopePerRequest(container));

// Routes
import authRouter from './src/api/routes/auth.router.js';
import userRouter from './src/api/routes/user.router.js';
import memberRouter from './src/api/routes/member.router.js';
import coachRouter from './src/api/routes/coach.router.js';
import membershipPlanRouter from './src/api/routes/membershipPlan.router.js';
import subscriptionRouter from './src/api/routes/subscription.router.js';
import sportRouter from './src/api/routes/sport.router.js';
import roomRouter from './src/api/routes/room.router.js';
import classRouter from './src/api/routes/class.router.js';
import enrollmentRouter from './src/api/routes/enrollment.router.js';
import attendanceRouter from './src/api/routes/attendance.router.js';
import paymentRouter from './src/api/routes/payment.router.js';
import invoiceRouter from './src/api/routes/invoice.router.js';
import trainingPlanRouter from './src/api/routes/trainingPlan.router.js';
import notificationRouter from './src/api/routes/notification.router.js';
import auditLogRouter from './src/api/routes/auditLog.router.js';
import supportRequestRouter from './src/api/routes/supportRequest.router.js';
import roleRouter from './src/api/routes/role.router.js';
import permissionRouter from './src/api/routes/permission.router.js';
import mailRouter from './src/api/routes/mail.router.js';

app.get('/', (req, res) => res.json({ message: 'Sports Center Management System API', version: '1.0.0' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Sports Center Management System API',
}));

const url = '/api/v1';
app.use(${url}/auth, authRouter);
app.use(${url}/users, userRouter);
app.use(${url}/members, memberRouter);
app.use(${url}/coaches, coachRouter);
app.use(${url}/membership-plans, membershipPlanRouter);
app.use(${url}/subscriptions, subscriptionRouter);
app.use(${url}/sports, sportRouter);
app.use(${url}/rooms, roomRouter);
app.use(${url}/classes, classRouter);
app.use(${url}/enrollments, enrollmentRouter);
app.use(${url}/attendance, attendanceRouter);
app.use(${url}/payments, paymentRouter);
app.use(${url}/invoices, invoiceRouter);
app.use(${url}/training-plans, trainingPlanRouter);
app.use(${url}/notifications, notificationRouter);
app.use(${url}/audit-logs, auditLogRouter);
app.use(${url}/support-requests, supportRequestRouter);
app.use(${url}/roles, roleRouter);
app.use(${url}/permissions, permissionRouter);
app.use(${url}/mail, mailRouter);

app.use(handleError);
export default app;
