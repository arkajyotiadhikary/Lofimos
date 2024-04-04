import { Sequelize } from "sequelize";

// models
import { initSongModel } from "./models/Songs.Model";
import { initUserModel } from "./models/Users.Model";
import { initUserSongLikesModel } from "./models/UserSongLikes.Model";
import { initUserSongPlaysModel } from "./models/UserSongPlays.Model";

interface SequelizeOptions {
      dialect: "postgres";
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
}

// Initialize Sequelize instance
export const sequelize = new Sequelize({
      dialect: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_DATABASE || "postgres",
} as SequelizeOptions);

export const songModel = initSongModel(sequelize);
export const userModel = initUserModel(sequelize);
export const userSongLikesModel = initUserSongLikesModel(sequelize);
export const userSongPlaysModel = initUserSongPlaysModel(sequelize);
