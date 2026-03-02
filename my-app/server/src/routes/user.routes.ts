import { Router, Request, Response } from 'express';
import * as userService from '../services/user.service.js'; 

const router = Router();

//need to add try catch blocks, need to add validation, error handling with status codes

router.get('/', async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json({ users, message: 'Get all users' });
});


router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await userService.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user, message: `Get user ${id}` });
});


router.post('/', async (req: Request, res: Response) => {
    await userService.createUser(req.body.name, req.body.email);
    res.status(201).json({ message: 'Create user' });
});


router.put('/:id', async (req: Request, res: Response) => {
    const  id  = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    await userService.updateUser(id, req.body.name, req.body.email);
    res.json({ message: `Update user ${id}` });
});


router.delete('/:id', async (req: Request, res: Response) => {
    const  id  = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    await userService.deleteUser(Number(id));
    res.json({ message: `Delete user ${id}` });
});

export default router;