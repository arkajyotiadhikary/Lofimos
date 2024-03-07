"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songs_controller_1 = require("../controllers/songs.controller");
const router = (0, express_1.Router)();
router.get("/songs", songs_controller_1.getAllSongs);
router.get("/songs/:id", songs_controller_1.getSongByID);
router.get("/upload", (req, res) => {
    res.render("songs.view.ejs");
}).post("/upload", songs_controller_1.createSong);
router.put("/songs/:id", songs_controller_1.updateSong);
router.delete("/songs/:id", songs_controller_1.deleteSong);
exports.default = router;
