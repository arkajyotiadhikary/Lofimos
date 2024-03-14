import { Router, Request, Response } from "express";
import {
      getAllSongs,
      getSongByID,
      createSong,
      updateSong,
      deleteSong,
      searchSongs,
      searchSongsByPopularity,
} from "../controllers/songs.controller";

const router = Router();

// Route to get all songs
router.get("/songs", getAllSongs);

// Route to get a specific song by ID
// router.get("/songs/:id", getSongByID);

// Route to search songs
router.get("/songs/search", searchSongs);

// Route to get popular songs
router.get("/songs/popular", searchSongsByPopularity);

// Route to render song upload form
router.get("/upload", (req: Request, res: Response) => {
      res.render("SongUploadForm.view.ejs");
});

// Route to handle song upload
router.post("/upload", createSong);

// Route to update a song
router.put("/songs/:id", updateSong);

// Route to delete a song
router.delete("/songs/:id", deleteSong);

export default router;
