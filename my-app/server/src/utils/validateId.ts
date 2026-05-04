import { parseId } from "./parseId.js"
import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {

    const id = parseId(req.params.id);

    if (id === null) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    (req as any).parsedId = id;
    next();
}