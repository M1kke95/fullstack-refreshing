import { prisma } from "../db/prisma.js";


export async function getAllTasks() {

    return prisma.task.findMany({
        include: {
            user: true,
        },
    });
}

export async function getTaskById(id: number) {
    return prisma.task.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });
}

export async function createTask(taskname: string, description: string, userId: number) {
    return prisma.task.create({
        data: { taskname, description, userId },
    });
}

export async function updateTask(id: number, taskname: string | undefined, description: string | undefined) {
    return prisma.task.update({
        where: { id },
        data: { taskname, description },
    });
}

export async function deleteTask(id: number) {
    return prisma.task.delete({
        where: { id },
    });
}