import chalk from "chalk";
import { Song } from "../models/songs.model";
import { Request, Response } from "express";

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
