import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers() {

    return prisma.user.findMany({
        include: {
            tasks: true,
        },
    });
}

export async function getUserById(id: number) {
    return prisma.user.findUnique({
        where: { id },
        include: {
            tasks: true,
        },
    });
}

export async function createUser(name: string, email: string) {
    return prisma.user.create({
        data: { name, email },
    });
}

export async function updateUser(id: number, name: string | undefined, email: string | undefined) {
    return prisma.user.update({
        where: { id },
        data: { name, email },
    });
}

export async function deleteUser(id: number) {
    return prisma.user.delete({
        where: { id },
    });
}   