import chalk from "chalk";
import { Song } from "../models/Songs.Model";
import { Request, Response } from "express";
import { UserSongLikes } from "../models/UserSongLikes.Model";
import { UserSongPlays } from "../models/UserSongPlays.Model";

// get all songs
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
      try {
            const songs = await Song.findAll({ limit: 10 });
            if (!songs) {
                  console.error(chalk.red("Error fetching songs from database 😓"));
                  res.status(404).json({ message: "Songs not found!" });
            }
            res.json(songs);
      } catch (error) {
            console.error(chalk.red("Error fetching songs 😓: \n"), error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// get songs by id
export const getSongByID = async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      try {
            const song = await Song.findByPk(id);
            if (!song) {
                  res.status(404).json({ message: "Song not found!" });
            }
            res.json(song);
      } catch (error) {
            console.error(chalk.red("Error fetching song by ID 😓: \n"), error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// search songs
// TODO the search is working with full correct name . It should work with half and incorrect names
export const searchSongs = async (req: Request, res: Response): Promise<void> => {
      console.log("searchSongs");
      const { artist, songName, mood, timeOfTheDay, season, activity } = req.query;
      try {
            // where clause
            let WhereClause: Record<string, string> = {};

            // define where clause according to req query
            if (artist) WhereClause["Artist"] = artist as string;
            if (songName) WhereClause["Title"] = songName as string;
            if (mood) WhereClause["Mood"] = mood as string;
            if (timeOfTheDay) WhereClause["TimeOfTheDay"] = timeOfTheDay as string;
            if (season) WhereClause["Season"] = season as string;
            if (activity) WhereClause["Activity"] = activity as string;

            console.log("Where clause: ", WhereClause);
            // get the songs
            const songs = await Song.findAll({ where: WhereClause });
            res.json(songs);
      } catch (error) {
            console.error("Error searching songs: \n", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// search songs by popularity
export const searchSongsByPopularity = async (req: Request, res: Response): Promise<void> => {
      try {
            const songs = await Song.findAll({ order: [["PlayCount", "DESC"]] });
            res.json(songs);
      } catch (error) {
            console.log("Error searching songs by season: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// create songs
export const createSong = async (req: Request, res: Response): Promise<void> => {
      // get song data from body
      const songData: Partial<Song> = req.body;
      try {
            const song = await Song.create(songData);
            res.status(201).json(song);
      } catch (error) {
            console.error("Error creating song: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// update songs
export const updateSong = async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const songData = req.body;
      try {
            const song = await Song.findByPk(id);
            if (!song) {
                  res.status(404).json({ message: "Song not found" });
            } else {
                  console.log("Song data for updating the song in db", songData);
                  await song.update(songData);
                  res.json(song);
            }
      } catch (error) {
            console.error("Error updating song:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// delete songs
export const deleteSong = async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      try {
            const song = await Song.findByPk(id);
            if (!song) {
                  res.status(404).json({ message: "Song not found" });
            }
            await Song.destroy({ where: { SongID: id } });
            res.status(204).json({ message: "Song deleted successfully" }).end();
      } catch (error) {
            console.error("Error deleting song:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// TODO song likes
// TODO check if the song is liked or not when we load the song in music player. [Efficient way]
export const likeSong = async (req: Request, res: Response): Promise<void> => {
      // song id
      // user id
      const { songID, userID } = req.body;
      try {
            // check existing like
            const existingLike = await UserSongLikes.findOne({ where: { userID, SongID: songID } });
            // TODO return something boolean so that we can render btns properly
            if (existingLike) res.status(400).json({ message: "You have already liked this song" });
            await UserSongLikes.create({ userID, SongID: songID });
            res.status(201).json({ message: "Liked successfully" });
      } catch (error) {
            console.error("Error liking song: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

export const unlikeSong = async (req: Request, res: Response): Promise<void> => {
      // song id
      // user id
      const { songID, userID } = req.body;
      try {
            // check existing like
            const existingLike = await UserSongLikes.findOne({ where: { userID, SongID: songID } });
            if (!existingLike) res.status(400).json({ message: "You have not liked this song" });
            await UserSongLikes.destroy({ where: { userID, SongID: songID } });
            res.status(201).json({ message: "Unliked successfully" });
      } catch (error) {
            console.error("Error unliking song: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// total number of likes
export const getTotalLikes = async (req: Request, res: Response): Promise<void> => {
      const { songID } = req.params;
      try {
            const totalLikes = await UserSongLikes.count({ where: { SongID: songID } });
            res.json(totalLikes);
      } catch (error) {
            console.error("Error getting total likes: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// song plays
export const songPlays = async (req: Request, res: Response): Promise<void> => {
      const { userID, songID } = req.body;
      try {
            await UserSongPlays.create({ userID, songID });
            res.status(201).json({ message: "Song played successfully" });
      } catch (error) {
            console.error("Error playing song: ", error);
            res.status(500).json({ message: "Internal server error" });
      }
};

// get popular songs
// export const getPopularSong = async (req: Request, res: Response): Promise<void> => {
//       const { limit } = req.query;
//       try {

//       }
// };
