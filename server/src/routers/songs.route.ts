import { Router } from "express";
import rateLimit from "express-rate-limit";
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

const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later",
});
router.use(limiter);

// ** FOR USERS **
// Route to get all songs
router.get("/songs", authenticateUser, getAllSongs);
// Route to search songs
router.get("/songs/search", authenticateUser, searchSongs);
// Route to get popular songs
router.get("/songs/popular", authenticateUser, searchSongsByPopularity);
// like a song
router.post("/songs/like", authenticateUser, likeSong);
// unlike a song
router.delete("/songs/unlike/:userID/:songID", authenticateUser, unlikeSong);
// store play song
router.post("/songs/play", authenticateUser, songPlays);

// ** FOR ADMINS **
// Route to handle song upload
router.post("/upload", authenticateAdmin, createSong);
// Route to update a song
router.put("/songs/:id", authenticateAdmin, updateSong);
// Route to delete a song
router.delete("/songs/:id", authenticateAdmin, deleteSong);

export default router;
