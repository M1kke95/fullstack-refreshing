import {prisma} from "../../../../server/src/db/prisma";

export async function seedDb() {
  const users = [
    { name: "Alice", email: "alice@test.com" },
    { name: "Bob", email: "bob@test.com" },
  ];
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
