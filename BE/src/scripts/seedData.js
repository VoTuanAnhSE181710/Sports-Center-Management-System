import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Roles
  const roles = ['Manager', 'Coach', 'Member', 'Receptionist'];
  const createdRoles = {};
  for (const roleName of roles) {
    const role = await prisma.role.upsert({ where: { roleName }, update: {}, create: { roleName, description: ${roleName} role } });
    createdRoles[roleName] = role;
    console.log(Role: );
  }

  // Admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sportscenter.com' },
    update: {},
    create: { email: 'admin@sportscenter.com', password: hashedPassword, fullName: 'System Admin', phone: '0000000000', roleId: createdRoles['Manager'].id, status: 'ACTIVE' },
  });
  console.log('Admin user created:', admin.email);

  // Sports
  const sports = [
    { name: 'Yoga', description: 'Mind and body wellness' },
    { name: 'Gym', description: 'Strength and fitness training' },
    { name: 'Swimming', description: 'Aquatic sports and fitness' },
    { name: 'Basketball', description: 'Team ball sport' },
    { name: 'Badminton', description: 'Racket sport' },
    { name: 'Zumba', description: 'Dance fitness program' },
  ];
  for (const sport of sports) {
    await prisma.sport.upsert({ where: { name: sport.name }, update: {}, create: sport });
    console.log('Sport:', sport.name);
  }

  // Rooms
  const rooms = [
    { name: 'Room A', capacity: 20, description: 'Yoga and Zumba room' },
    { name: 'Room B', capacity: 30, description: 'Gym training room' },
    { name: 'Pool', capacity: 15, description: 'Swimming pool' },
    { name: 'Court 1', capacity: 10, description: 'Basketball court' },
    { name: 'Court 2', capacity: 10, description: 'Badminton court' },
  ];
  for (const room of rooms) {
    await prisma.room.upsert({ where: { name: room.name }, update: {}, create: room });
    console.log('Room:', room.name);
  }

  // Membership Plans
  const plans = [
    { name: '1 Month Basic', description: '1 month membership - unlimited gym access', durationDays: 30, price: 300000 },
    { name: '3 Month Standard', description: '3 month membership with class bookings', durationDays: 90, price: 800000, maxClasses: 24 },
    { name: '6 Month Premium', description: '6 month premium membership', durationDays: 180, price: 1500000, maxClasses: 60 },
    { name: '1 Year VIP', description: 'Full year VIP membership - unlimited classes', durationDays: 365, price: 2500000 },
  ];
  for (const plan of plans) {
    await prisma.membershipPlan.upsert({ where: { name: plan.name }, update: {}, create: plan });
    console.log('Plan:', plan.name);
  }

  console.log('Seeding complete!');
  console.log('Admin login: admin@sportscenter.com / Admin@123');
}

main().catch(console.error).finally(() => prisma.\());
