import {prisma} from "../../../src/db/prisma";

export async function seedDb() {
    console.log("Seeding database...");
  const users = [
    { name: "Alice", email: "alice@test.com" },
    { name: "Bob", email: "bob@test.com" },
  ];
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
