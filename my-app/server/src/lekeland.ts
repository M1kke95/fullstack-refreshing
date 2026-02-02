import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Prisma models:", Object.keys(prisma));
console.log("lekeland.ts startet");

async function getLekeLandData() {
  const user = await prisma.user.create({
    data: {
      name: "LekeLand User",
      email: `lekeland-${Date.now()}@example.com`,
    },
  });

  const task = await prisma.task.create({
    data: {
      taskname: "Sample Task",
      description: "This is a sample task for LekeLand.",
      userId: user.id,
    },
  });

  console.log("Created user:", user);
  console.log("Created task:", task);
}

getLekeLandData()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
