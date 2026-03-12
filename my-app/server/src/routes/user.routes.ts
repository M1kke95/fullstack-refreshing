import { Router, Request, Response } from 'express';
import * as userService from '../services/user.service.js'; 
import { CreateUserSchema, UpdateUserBody, UpdateUserSchema } from '../types/user.types.js';

const router = Router();

// need to add validation,

router.get('/', async (req: Request, res: Response) => {

    try {
        const users = await userService.getAllUsers();
        res.json({ users, message: 'Get all users' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
    
});


router.get('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);
    

    try {
        if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await userService.getUserById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user, message: `Get user ${id}` });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
    
});


router.post('/', async (req: Request, res: Response) => {

    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {  
    return res.status(400).json({
      message: "Invalid input",
      errors: result.error.issues
    });
  }
    try {
        await userService.createUser(req.body.name, req.body.email);
        res.status(201).json({ message: 'Create user' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
    
});


router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const result = UpdateUserSchema.safeParse(req.body);

    if (!result.success) {  
        return res.status(400).json({
          message: "Invalid input",
          errors: result.error.issues
        });
      }

    const {name,email} = req.body as UpdateUserBody;

    try {
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        await userService.updateUser(id, req.body.name, req.body.email);

        res.json({ message: `Update user ${id}` });

    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const  id  = Number(req.params.id);

    try {
        if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    await userService.deleteUser(Number(id));
    res.json({ message: `Delete user ${id}` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });   
    }
    
});

export default router;