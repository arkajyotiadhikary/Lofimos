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
exports.testSongModel = exports.userModel = exports.songModel = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const songs_model_1 = require("./models/songs.model");
// models
const songs_model_2 = require("./models/songs.model");
const users_model_1 = require("./models/users.model");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "test123",
    database: "harmonyxtrec",
});
exports.songModel = (0, songs_model_2.initSongModel)(exports.sequelize);
exports.userModel = (0, users_model_1.initUserModel)(exports.sequelize);
// some funcitons for testing
const testSongModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   sync the model with db . If table is not available it will create one
        yield exports.sequelize.sync();
        //   create a song record
        const newSong = yield songs_model_1.Song.create({
            Title: "Test Song",
            Artist: "Test Artist",
            AudioFilePath: "/path/to/audio.mp3",
        });
        //   retrive a song by id
        const retrivedSong = yield songs_model_1.Song.findByPk(newSong.SongID);
        console.log(retrivedSong);
    }
    catch (error) {
        console.error("Error:", error);
    }
});
exports.testSongModel = testSongModel;
