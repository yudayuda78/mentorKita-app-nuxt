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


