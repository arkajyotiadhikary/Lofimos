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
import { authenticateAdmin, authenticateUser } from "../controllers/auth.controller";

const router = Router();

// Route to get all songs
router.get("/songs", authenticateUser, getAllSongs);

// Route to get a specific song by ID
// router.get("/songs/:id", getSongByID);

// Route to search songs
router.get("/songs/search", authenticateUser, searchSongs);

// Route to get popular songs
router.get("/songs/popular", authenticateUser, searchSongsByPopularity);

// Route to handle song upload
router.post("/upload", authenticateAdmin, createSong);

// Route to update a song
router.put("/songs/:id", authenticateAdmin, updateSong);

// Route to delete a song
router.delete("/songs/:id", authenticateAdmin, deleteSong);

// like a song
router.post("/songs/like", authenticateUser, likeSong);
// unlike a song
router.delete("/songs/unlike", authenticateUser, unlikeSong);
// store play song
router.post("/songs/play", authenticateUser, songPlays);

export default router;
