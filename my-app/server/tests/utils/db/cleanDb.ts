import {prisma} from "../../../../server/src/db/prisma";

export const cleanDb = async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
}