import { Router, Request, Response } from 'express';
import * as taskService from '../services/task.service.js'; 
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { validateId } from '../utils/validateId.js';
import { validateSchema } from '../utils/validateSchema.js';
import { CreateTaskSchema, UpdateTaskSchema } from '../types/task.types.js';

const router = Router();

router.get('/', asyncWrapper( async (req: Request, res: Response) => {

        const tasks = await taskService.getAllTasks();

        return res.json({ tasks, message: 'Get all tasks' });
}));



router.get('/:id', validateId, asyncWrapper( async (req: Request, res: Response) => {

    const id = (req as any).parsedId;

    const task = await taskService.getTaskById(id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ task, message: `Get task ${id}` });
}));



router.post('/', validateSchema(CreateTaskSchema), asyncWrapper( async (req: Request, res: Response) => {

    const { taskname, description, userId } = req.body;

    const task = await taskService.createTask(taskname, description, userId);

    return res.status(201).json({ message: 'Task created', task });

}));



router.put('/:id', validateId, validateSchema(UpdateTaskSchema), asyncWrapper( async (req: Request, res: Response) => {

    const id = (req as any).parsedId;

    const { taskname, description } = req.body;

    const updatedTask = await taskService.updateTask(id, taskname, description);

    return res.json({
        message: `Task ${id} updated`,
        task: updatedTask
    });

}));



router.delete('/:id', validateId, asyncWrapper( async (req: Request, res: Response) => {

    const id = (req as any).parsedId;

    await taskService.deleteTask(id);
    
    return res.json({
            message: `Task ${id} deleted`
        });
}));



export default router;