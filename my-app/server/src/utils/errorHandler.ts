//TODO : Refactor to use custom error classes instead of checking error codes and names

import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

/*
export const errorHandler = (err: any, _req: any, res: any) => {

    console.error(err); 

    if(err.code === 'P2002') {
        return res.status(409).json({ message: 'Email already exists' });
    }

    if (err.code === 'P2025') {
        return res.status(404).json({ message: 'User not found' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if(err.name === "badRequestError") {
        return res.status(400).json({ message: err.message });
    }

    if(err.name === "notFoundError") {
        return res.status(404).json({ message: err.message });
    }

    if(err.name === "conflictError") {
        return res.status(409).json({ message: err.message });
    }
    
    return res.status(500).json({ message: 'Internal Server Error' });

}   */

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => { 
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {

    switch (err.code) {

      case "P2002":
        return res.status(409).json({
          message: "Email already exists",
        });

      case "P2025":
        return res.status(404).json({
          message: "User not found",
        });
    }
  }

 
  switch (err.name) {

    case "ValidationError":
      return res.status(400).json({
        message: err.message,
      });

    case "badRequestError":
      return res.status(400).json({
        message: err.message,
      });

    case "notFoundError":
      return res.status(404).json({
        message: err.message,
      });

    case "conflictError":
      return res.status(409).json({
        message: err.message,
      });
  }

 
  return res.status(500).json({
    message: "Internal Server Error",
  });
};