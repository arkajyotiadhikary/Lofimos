import { type Request, type Response } from "express";
import { User } from "../models/Users.Model";
import { UserSongLikes } from "../models/UserSongLikes.Model";

import bcrypt from "bcrypt";
import chalk from "chalk";

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

// get user by email
export const getUserByEmail = async (userEmail: string): Promise<User | null> => {
      try {
            console.log("User email for login", userEmail);
            const user = await User.findOne({ where: { email: userEmail } });
            return user;
      } catch (error) {
            console.error("Error fetching user data by email.", error);
            throw { message: "Internal server error." };
      }
};

// create users
export const createUser = async (userData: Partial<User>): Promise<User | { message: string }> => {
      const { email, password } = userData;

      try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                  return { message: "User already exists." };
            }
            const saltPassword = password ? await bcrypt.hash(password, 10) : "";
            userData.password = saltPassword;
            const user = await User.create(userData);
            return user;
      } catch (error) {
            console.error("Error creating user.", error);
            throw { message: "Internal server error." };
      }
};

// update users
export const updateUser = async (
      userID: number,
      password: string,
      userData: {
            data: Partial<User>;
      }
): Promise<User | { message: string }> => {
      try {
            const user = await User.findByPk(userID);
            if (!user) {
                  return { message: `No user found with the id ${userID}` };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                  return { message: "Invalid password" };
            }

            // Update user data
            console.log("Data to be updated", userData);
            await user.update(userData.data);
            return user;
      } catch (error) {
            console.error("Error updating user", error);
            return { message: "Internal server error" };
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

// get user's liked songs list
export const getLikedSongs = async (req: Request, res: Response): Promise<void> => {
      try {
            const { id } = req.params;
            const likedSongs = await UserSongLikes.findAll({ where: { userID: id } });
            if (likedSongs.length === 0) {
                  res.status(404).json({ message: "User has no liked songs" });
            } else {
                  console.log(
                        chalk.bgBlue(`liked songs by user ${id}`, JSON.stringify(likedSongs))
                  );
                  res.json(likedSongs);
            }
      } catch (error) {
            console.error("Error getting liked songs:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};
