import { type Request, type Response } from "express";
import { User } from "../models/users.model";

type RequestBody<T extends {}> = {
      body: T;
};

// get users
// @admin
export const getUser = async (
      req: Request,
      res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
      try {
            const users = await User.findAll();
            return res.json(users);
      } catch (error) {
            console.error("Error fetching users.", error);
            return res.status(500).json({ message: "Internal server error." });
      }
};
// get user by id
export const getUserByID = async (
      req: Request,
      res: Response
): Promise<Response<any, Record<string, any>>> => {
      const { id } = req.params;
      try {
            const user = await User.findByPk(id);
            if (!user) {
                  return res.status(404).json({ message: `No user found with the id ${id}` });
            }
            return res.json(user);
      } catch (error) {
            console.error("Error fetching user data by ID.");
            return res.status(500).json({ message: "Internal server error." });
      }
};
// create users
export const createUser = async (userData: Partial<User>): Promise<User> => {
      try {
            const user = await User.create(userData);
            return user;
      } catch (error) {
            console.error("Error creating user.", error);
            throw { message: "Internal server error." };
      }
};

// update users
export const updateUser = async (
      req: Request,
      res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
      const { id } = req.params;
      const userData: RequestBody<User> = req.body;
      try {
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: `No user found with the id ${id}` });
            await User.update(userData, { where: { UserID: id } });
            const updatedUser = await User.findByPk(id);
            return res.json(updatedUser);
      } catch (error) {
            console.error("Error updating user", error);
            return res.status(500).json({ message: "Internal server error" });
      }
};
// delete users
export const deleteUser = async (
      req: Request,
      res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
      const { id } = req.params;
      try {
            const user = await User.findByPk(id);
            if (!user) {
                  return res.status(404).json({ message: `No user found with the id ${id}` });
            }
            await User.destroy({ where: { UserID: id } });
            return res.status(204).json({ message: `User has been successfully deleted.` });
      } catch (error) {
            console.error("Error deleting user", error);
            return res.status(500).json({ message: "Internal server error" });
      }
};
