import bcrypt from 'bcrypt'
import prisma from "../prisma/client.js"

async function main (){
const hashedPassword = await bcrypt.hash("superadmin122333", 10);


  await prisma.user.upsert({
    where: { email: "admin@mentorkita.com" },
    
    update: {},
    
    create: {
      username: "superadmin",
      email: "admin@mentorkita.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "admin123";
  const superAdminPassword = process.env.SUPERADMIN_SEED_PASSWORD || "superadmin122333";

  await prisma.admin.upsert({
    where: { username: "admin" },
    update: { password: await bcrypt.hash(adminPassword, 10), role: "admin" },
    create: { username: "admin", password: await bcrypt.hash(adminPassword, 10), role: "admin" },
  });

  await prisma.admin.upsert({
    where: { username: "superadmin" },
    update: { password: await bcrypt.hash(superAdminPassword, 10), role: "admin" },
    create: { username: "superadmin", password: await bcrypt.hash(superAdminPassword, 10), role: "admin" },
  });
}

async function runSeed() {
  try {
    await main();
    console.log("Seed successful!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runSeed();


