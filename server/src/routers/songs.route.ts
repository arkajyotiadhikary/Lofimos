import { Router } from "express";
import {
      getAllSongs,
      createSong,
      updateSong,
      deleteSong,
      searchSongs,
      searchSongsByPopularity,
      likeSong,
      unlikeSong,
      songPlays,
} from "../controllers/songs.controller";
import { authenticateAdmin } from "../controllers/auth.controller";

const router = Router();

// Route to get all songs
router.get("/songs/:limit", getAllSongs);

// Route to get a specific song by ID
// router.get("/songs/:id", getSongByID);

// Route to search songs
router.get("/songs/search", searchSongs);

// Route to get popular songs
router.get("/songs/popular", searchSongsByPopularity);

// Route to handle song upload
router.post("/upload", createSong);

// Route to update a song
router.put("/songs/:id", updateSong);

// Route to delete a song
router.delete("/songs/:id", deleteSong);

// like a song
router.post("/songs/like", likeSong);
// unlike a song
router.delete("/songs/unlike/:userID/:songID", unlikeSong);
// store play song
router.post("/songs/play", songPlays);

export default router;
