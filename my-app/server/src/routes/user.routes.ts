import { Router, Request, Response } from 'express';
import * as userService from '../services/user.service.js'; 
import { CreateUserSchema, UpdateUserSchema } from '../types/user.types.js';
import { parseId } from '../utils/parseId.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { validateSchema } from '../utils/validateSchema.js';

const router = Router();

//TODO: implement global error handling

router.get('/', asyncWrapper( async (req: Request, res: Response) => {

        const users = await userService.getAllUsers();
        return res.json({ users, message: 'Get all users' });
        //return res.status(500).json({ message: 'Error retrieving users' });

    
}));


router.get('/:id', asyncWrapper( async (req: Request, res: Response) => {

    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });

    }
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user, message: `Get user ${id}` });
  
    //console.error(error);
    //return res.status(500).json({ message: 'Error retrieving user' });
  

    
}));


router.post('/', validateSchema(CreateUserSchema), asyncWrapper( async (req: Request, res: Response) => {

    const { name, email } = req.body;

    await userService.createUser(name, email);

    return res.status(201).json({ message: 'User created', user: { name, email } });

    
        /*if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Email already exists' });
            }
        }
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    */
    
}));


router.put('/:id',validateSchema(UpdateUserSchema), asyncWrapper( async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }


    const { name, email } = req.body;
 
    await userService.updateUser(id, name, email);

    return res.json({
    message: `User ${id} updated`,
    updatedFields: { name, email }
    });

/*
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    */
}));


router.delete('/:id', asyncWrapper( async (req: Request, res: Response) => {
    const  id  = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

   
    await userService.deleteUser(id);
    
    return res.json({
            message: `User ${id} deleted`
        });
    
    /*
    console.error(error);
    return res.status(500).json({ message: 'Error deleting user' });   
   */
    
}));

export default router;