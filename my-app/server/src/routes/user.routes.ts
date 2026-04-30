import { Router, Request, Response } from 'express';
import * as userService from '../services/user.service.js'; 
import { CreateUserSchema, UpdateUserSchema } from '../types/user.types.js';
import { parseId } from '../utils/parseId.js';

const router = Router();

//TODO: Duplicate code in routes and services need to be refactored to avoid code duplication and improve maintainability.

router.get('/', async (req: Request, res: Response) => {

    try {
        const users = await userService.getAllUsers();
        res.json({ users, message: 'Get all users' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving users' });
    }
    
});


router.get('/:id', async (req: Request, res: Response) => {

    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });

    }

    try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user, message: `Get user ${id}` });
  } catch (error) {
    console.error(error);
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
    const { name, email } = result.data ;

    try {
        await userService.createUser(name, email);
        res.status(201).json({ message: 'User created', user: { name, email } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
    
});


router.put('/:id', async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const result = UpdateUserSchema.safeParse(req.body);

    if (!result.success) {  
        return res.status(400).json({
          message: "Invalid input",
          errors: result.error.issues
        });
      }

    const { name, email } = result.data;

    try {
        
        await userService.updateUser(id, name, email);

        res.json({
        message: `User ${id} updated`,
        updatedFields: { name, email }
    });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const  id  = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        await userService.deleteUser(id);
        res.json({
            message: `User ${id} deleted`
    });

    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });   
    }
    
});

export default router;