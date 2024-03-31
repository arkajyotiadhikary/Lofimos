import { Sequelize } from "sequelize";
import { Song } from "./models/songs.model";
// models
import { initSongModel } from "./models/songs.model";
import { initUserModel } from "./models/users.model";

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

// some funcitons for testing
export const testSongModel = async () => {
      try {
            //   sync the model with db . If table is not available it will create one
            await sequelize.sync();
            //   create a song record
            const newSong = await Song.create({
                  Title: "Test Song",
                  Artist: "Test Artist",
                  AudioFilePath: "/path/to/audio.mp3",
            });

            //   retrive a song by id
            const retrivedSong = await Song.findByPk(newSong.SongID);

            console.log(retrivedSong);
      } catch (error) {
            console.error("Error:", error);
      }
};
