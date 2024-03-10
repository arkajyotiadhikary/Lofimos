import { type Request, type Response } from "express";
import { createUser } from "./users.controller";
import { User } from "../models/users.model";

// register user
export const registerUser = async (
      req: Request,
      res: Response<User | { message: string }>
): Promise<void> => {
      const userData: Partial<User> = req.body;
      try {
            const newUser = await createUser(userData);
            res.status(201).json(newUser);
      } catch (error) {
            console.error("Error creating user", error);
      }
};

// login user
export const loginUser = (req: Request, res: Response) => {};
// refreshToken

// password reset

// logout user

// authorize user
