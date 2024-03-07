import { Router } from "express";
import {
      getAllSongs,
      getSongByID,
      createSong,
      updateSong,
      deleteSong,
} from "../controllers/songs.controller";
const router = Router();

router.get("/songs", getAllSongs);
router.get("/songs/:id", getSongByID);
router.post("/songs", createSong);
router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);

export default router;
