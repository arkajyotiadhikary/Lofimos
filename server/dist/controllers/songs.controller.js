"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSong = exports.updateSong = exports.createSong = exports.getSongByID = exports.getAllSongs = void 0;
const Song_1 = require("../models/Song");
// get all songs
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  TODO return only first 10 songs
        const songs = yield Song_1.Song.findAll();
        res.json(songs);
    }
    catch (error) {
        console.error("Error fetching songs: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllSongs = getAllSongs;
// get songs by id
const getSongByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield Song_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found!" });
        }
        res.json(song);
    }
    catch (error) {
        console.error("Error fetching song by ID: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSongByID = getSongByID;
// create songs
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get song data from body
    const songData = req.body;
    try {
        const song = yield Song_1.Song.create(songData);
        res.status(201).json(song);
    }
    catch (error) {
        console.error("Error creating song: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createSong = createSong;
// update songs
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const songData = req.body;
    try {
        const song = Song_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }
        else {
            yield Song_1.Song.update(songData, { where: { SongID: id } });
            const updatedSong = Song_1.Song.findByPk(id);
            res.json(updatedSong);
        }
    }
    catch (error) {
        console.error("Error updating song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateSong = updateSong;
// delete songs
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield Song_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }
        yield Song_1.Song.destroy({ where: { SongID: id } });
        res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteSong = deleteSong;
