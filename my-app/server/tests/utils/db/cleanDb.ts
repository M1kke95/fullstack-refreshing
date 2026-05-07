import {prisma} from "../../../src/db/prisma";

export async function cleanDb() {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
}