import { Sequelize } from "sequelize";
import { Song } from "./models/songs.model";
// models
import { initSongModel } from "./models/songs.model";
import { initUserModel } from "./models/users.model";

export const sequelize = new Sequelize({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test123",
      database: "harmonyxtrec",
});

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
