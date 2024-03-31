import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createUser, getUserByEmail, updateUser } from "./users.controller";
import { User } from "../models/users.model";
import bcrypt from "bcrypt";

interface DecodedUser extends JwtPayload {
      role: string;
}

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

export const validateToken = (req: Request, res: Response) => {
      const { token } = req.body;
      try {
            jwt.verify(token, process.env.JWT_SECRETE!);
            res.status(200).json({ hasError: false, message: "Token is valid" });
      } catch (error) {
            res.status(401).json({ hasError: true, message: "Invalid token" });
      }
};

// Middleware to validate the auth header
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (token) {
            jwt.verify(token, process.env.JWT_SECRETE!, (err) => {
                  if (err) {
                        return res.sendStatus(403);
                  }
                  next();
            });
      } else {
            res.sendStatus(401);
      }
};
export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (token) {
            jwt.verify(token, process.env.JWT_SECRETE!, (err, decoded) => {
                  if (err) {
                        return res.sendStatus(403);
                  }
                  if (decoded) {
                        const user = decoded as DecodedUser;
                        if (user.role === "admin") {
                              next();
                        } else {
                              res.sendStatus(401);
                        }
                  } else {
                        res.sendStatus(401);
                  }
            });
      } else {
            res.sendStatus(401);
      }
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
            if (user && bcrypt.compareSync(password, user.password)) {
                  const accessToken = generateAccessToken(user);
                  try {
                        const updatedUser = await updateUser(user.userID, {
                              accessToken,
                        });
                        console.log("Updated user: ", updatedUser);
                  } catch (error) {
                        console.error(error);
                  }
                  res.status(200).json({
                        role: user.role,
                        userVerified: true,
                        token: accessToken,
                  });
            } else {
                  res.status(401).json({ message: "Invalid credentials" });
            }
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
      }
};
