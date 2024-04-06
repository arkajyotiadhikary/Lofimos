import { authenticateUser } from "../controllers/auth.controller";
import rateLimit from "express-rate-limit";
import { getLikedSongs, updateUser } from "../controllers/users.controller";
import { Router, Request, Response } from "express";

const router = Router();
const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later",
});
router.use(limiter);

router.get("/liked/songs/:id", authenticateUser, getLikedSongs);

// ** FOR USERS **
router.put("/user/update/:id", authenticateUser, (req: Request, res: Response) => {
      const { id } = req.params;
      const { password, ...userData } = req.body;
      updateUser(parseInt(id), password, userData)
            .then((user) => {
                  if (user) {
                        res.status(200).json(user);
                  } else {
                        res.status(404).json({ message: `No user found with the id ${id}` });
                  }
            })
            .catch((error) => {
                  console.error("Error updating user", error);
                  res.status(500).json({ message: "Internal server error" });
            });
});

export default router;
