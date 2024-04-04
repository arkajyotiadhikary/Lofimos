"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSongPlaysModel = exports.userSongLikesModel = exports.userModel = exports.songModel = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// models
const Songs_Model_1 = require("./models/Songs.Model");
const Users_Model_1 = require("./models/Users.Model");
const UserSongLikes_Model_1 = require("./models/UserSongLikes.Model");
const UserSongPlays_Model_1 = require("./models/UserSongPlays.Model");
// Initialize Sequelize instance
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "postgres",
});
exports.songModel = (0, Songs_Model_1.initSongModel)(exports.sequelize);
exports.userModel = (0, Users_Model_1.initUserModel)(exports.sequelize);
exports.userSongLikesModel = (0, UserSongLikes_Model_1.initUserSongLikesModel)(exports.sequelize);
exports.userSongPlaysModel = (0, UserSongPlays_Model_1.initUserSongPlaysModel)(exports.sequelize);
