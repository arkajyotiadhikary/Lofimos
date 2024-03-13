import { Router, type Request, type Response } from "express";
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
router.get("/upload", (req: Request, res: Response) => {
      res.render("SongUploadForm.view.ejs");
}).post("/upload", createSong);
router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);

export default router;
