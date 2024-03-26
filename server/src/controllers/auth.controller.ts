import { type Request, type Response } from "express";
import { createUser, getUserByEmail, updateUser } from "./users.controller";
import { User } from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ResponseBody {
      hasError: boolean;
      message?: string;
      userData: User;
}

const generateAccessToken = (user: User): string => {
      return jwt.sign({ id: user.userID, role: user.role }, process.env.JWT_SECRETE!, {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      });
};

const generateRefreshToken = (user: User): string => {
      return jwt.sign({ id: user.userID }, process.env.JWT_SECRETE!, {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
      });
};

const generateSessionID = (user: User): string => {
      return Math.random().toString(36).slice(2);
};

// register user
export const registerUser = async (
      req: Request,
      res: Response<ResponseBody | { message: string }>
): Promise<void> => {
      const userData: Partial<User> = req.body;
      try {
            const newUser = await createUser(userData);
            if ("message" in newUser) {
                  res.status(409).json({ hasError: true, message: "User already exists" });
            } else {
                  res.status(201).json({ hasError: false, userData: newUser });
            }
      } catch (error) {
            console.error("Error creating user", error);
            res.status(500).json({ hasError: true, message: "Internal server error" });
      }
};

// login user
export const loginUser = async (req: Request, res: Response) => {
      const { email, password } = req.body;
      try {
            const user = await getUserByEmail(email);
            console.log("login user", user);
            if (user)
                  if (bcrypt.compareSync(password, user.password)) {
                        const accessToken = generateAccessToken(user);
                        const refreshToken = generateRefreshToken(user);
                        const sessionID = generateSessionID(user);
                        try {
                              const updatedUser = await updateUser(user.userID, {
                                    accessToken,
                                    refreshToken,
                                    sessionID,
                              });
                              console.log("Updated user: ", updatedUser);
                        } catch (error) {
                              console.error(error);
                        }
                        res.json({ accessToken, refreshToken, sessionID, role: user.role });
                  }
      } catch (error) {
            console.error(error);
      }
};
// refreshToken

// password reset

// logout user

// authorize user
