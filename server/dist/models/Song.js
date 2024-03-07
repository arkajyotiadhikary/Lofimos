"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSongModel = exports.Song = void 0;
const sequelize_1 = require("sequelize");
class Song extends sequelize_1.Model {
}
exports.Song = Song;
const initSongModel = (sequelize) => {
    Song.init({
        SongID: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Title: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        Artist: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        Album: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        ReleaseYear: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        Genre: {
            type: sequelize_1.DataTypes.STRING(100),
        },
        Duration: {
            type: sequelize_1.DataTypes.TIME,
        },
        TrackNumber: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        AudioFilePath: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        CoverArtPath: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        ThumbnailPath: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        Lyrics: {
            type: sequelize_1.DataTypes.TEXT,
        },
        Likes: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        Dislikes: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        PlayCount: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        IsFavorite: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        Comments: {
            type: sequelize_1.DataTypes.TEXT,
        },
        BPM: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        Key: {
            type: sequelize_1.DataTypes.STRING(10),
        },
        Mood: {
            type: sequelize_1.DataTypes.STRING(100),
        },
        SpotifyLink: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        AppleMusicLink: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        YouTubeLink: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        ArtistWebsite: {
            type: sequelize_1.DataTypes.STRING(255),
        },
        SampleInformation: {
            type: sequelize_1.DataTypes.TEXT,
        },
        Credits: {
            type: sequelize_1.DataTypes.TEXT,
        },
        CreatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    }, { sequelize, tableName: "Songs" });
    console.log("Song model has initiated!");
};
exports.initSongModel = initSongModel;
