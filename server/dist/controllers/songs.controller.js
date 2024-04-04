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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songPlays = exports.getTotalLikes = exports.unlikeSong = exports.likeSong = exports.deleteSong = exports.updateSong = exports.createSong = exports.searchSongsByPopularity = exports.searchSongs = exports.getSongByID = exports.getAllSongs = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Songs_Model_1 = require("../models/Songs.Model");
const UserSongLikes_Model_1 = require("../models/UserSongLikes.Model");
const UserSongPlays_Model_1 = require("../models/UserSongPlays.Model");
// get all songs
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Songs_Model_1.Song.findAll({ limit: 10 });
        if (!songs) {
            console.error(chalk_1.default.red("Error fetching songs from database 😓"));
            res.status(404).json({ message: "Songs not found!" });
        }
        res.json(songs);
    }
    catch (error) {
        console.error(chalk_1.default.red("Error fetching songs 😓: \n"), error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllSongs = getAllSongs;
// get songs by id
const getSongByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const song = yield Songs_Model_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found!" });
        }
        res.json(song);
    }
    catch (error) {
        console.error(chalk_1.default.red("Error fetching song by ID 😓: \n"), error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSongByID = getSongByID;
// search songs
// TODO the search is working with full correct name . It should work with half and incorrect names
const searchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("searchSongs");
    const { artist, songName, mood, timeOfTheDay, season, activity } = req.query;
    try {
        // where clause
        let WhereClause = {};
        // define where clause according to req query
        if (artist)
            WhereClause["Artist"] = artist;
        if (songName)
            WhereClause["Title"] = songName;
        if (mood)
            WhereClause["Mood"] = mood;
        if (timeOfTheDay)
            WhereClause["TimeOfTheDay"] = timeOfTheDay;
        if (season)
            WhereClause["Season"] = season;
        if (activity)
            WhereClause["Activity"] = activity;
        console.log("Where clause: ", WhereClause);
        // get the songs
        const songs = yield Songs_Model_1.Song.findAll({ where: WhereClause });
        res.json(songs);
    }
    catch (error) {
        console.error("Error searching songs: \n", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.searchSongs = searchSongs;
// search songs by popularity
const searchSongsByPopularity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Songs_Model_1.Song.findAll({ order: [["PlayCount", "DESC"]] });
        res.json(songs);
    }
    catch (error) {
        console.log("Error searching songs by season: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.searchSongsByPopularity = searchSongsByPopularity;
// create songs
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get song data from body
    const songData = req.body;
    try {
        const song = yield Songs_Model_1.Song.create(songData);
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
        const song = yield Songs_Model_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }
        else {
            console.log("Song data for updating the song in db", songData);
            yield song.update(songData);
            res.json(song);
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
        const song = yield Songs_Model_1.Song.findByPk(id);
        if (!song) {
            res.status(404).json({ message: "Song not found" });
        }
        yield Songs_Model_1.Song.destroy({ where: { SongID: id } });
        res.status(204).json({ message: "Song deleted successfully" }).end();
    }
    catch (error) {
        console.error("Error deleting song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteSong = deleteSong;
// TODO song likes
// TODO check if the song is liked or not when we load the song in music player. [Efficient way]
const likeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // song id
    // user id
    const { songID, userID } = req.body;
    try {
        // check existing like
        const existingLike = yield UserSongLikes_Model_1.UserSongLikes.findOne({ where: { userID, SongID: songID } });
        // TODO return something boolean so that we can render btns properly
        if (existingLike)
            res.status(400).json({ message: "You have already liked this song" });
        yield UserSongLikes_Model_1.UserSongLikes.create({ userID, SongID: songID });
        res.status(201).json({ message: "Liked successfully" });
    }
    catch (error) {
        console.error("Error liking song: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.likeSong = likeSong;
const unlikeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // song id
    // user id
    const { userID, songID } = req.params;
    console.log(chalk_1.default.redBright("Unliking song: ", userID, songID));
    try {
        // check existing like
        const existingLike = yield UserSongLikes_Model_1.UserSongLikes.findOne({ where: { userID, SongID: songID } });
        if (!existingLike)
            res.status(400).json({ message: "You have not liked this song" });
        yield UserSongLikes_Model_1.UserSongLikes.destroy({ where: { userID, SongID: songID } });
        res.status(201).json({ message: "Unliked successfully" });
    }
    catch (error) {
        console.error("Error unliking song: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.unlikeSong = unlikeSong;
// total number of likes
const getTotalLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songID } = req.params;
    try {
        const totalLikes = yield UserSongLikes_Model_1.UserSongLikes.count({ where: { SongID: songID } });
        res.json(totalLikes);
    }
    catch (error) {
        console.error("Error getting total likes: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTotalLikes = getTotalLikes;
// song plays
const songPlays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, songID } = req.body;
    try {
        yield UserSongPlays_Model_1.UserSongPlays.create({ userID, songID });
        res.status(201).json({ message: "Song played successfully" });
    }
    catch (error) {
        console.error("Error playing song: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.songPlays = songPlays;
// get popular songs
// export const getPopularSong = async (req: Request, res: Response): Promise<void> => {
//       const { limit } = req.query;
//       try {
//       }
// };
