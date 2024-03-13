import { Song } from "../models/songs.model";
import { Request, Response } from "express";

// get all songs
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
      try {
            //  TODO return only first 10 songs
            const songs = await Song.findAll();
            res.json(songs);
      } catch (error) {
            console.error("Error fetching songs: ", error);
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
            console.error("Error fetching song by ID: ", error);
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
            const song = Song.findByPk(id);
            if (!song) {
                  res.status(404).json({ message: "Song not found" });
            } else {
                  await Song.update(songData, { where: { SongID: id } });
                  const updatedSong = Song.findByPk(id);
                  res.json(updatedSong);
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
            res.status(204).end();
      } catch (error) {
            console.error("Error deleting song:", error);
            res.status(500).json({ message: "Internal server error" });
      }
};
