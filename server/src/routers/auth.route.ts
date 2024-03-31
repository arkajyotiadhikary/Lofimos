import Router from "express";
import { registerUser, loginUser, validateToken } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validate", validateToken);

export default router;
