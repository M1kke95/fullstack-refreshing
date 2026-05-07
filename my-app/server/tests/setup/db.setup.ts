import { prisma } from "../../src/db/prisma.js";
import { beforeEach, afterAll} from "vitest";
import { seedDb } from "../utils/db/seedDb.js";
import { cleanDb } from "../utils/db/cleanDb.js";

console.log("🔥 SETUP RUNNING");

beforeEach(async () => {
  await cleanDb();
  await seedDb();
 
});

afterAll(async () => {
  await prisma.$disconnect();
  console.log("Database cleaned and seeded");
});

