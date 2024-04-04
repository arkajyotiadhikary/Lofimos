import { authenticateUser } from "../controllers/auth.controller";
import { getLikedSongs } from "../controllers/users.controller";
import { Router } from "express";

const router = Router();

router.get("/liked/songs/:id", authenticateUser, getLikedSongs);

export default router;
