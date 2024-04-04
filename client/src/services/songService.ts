import axios, { AxiosResponse } from "axios";
import { Song } from "../../types";
import { handleAxiosError } from "./axiosErrorHandler";
import { type AddTrack } from "react-native-track-player";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:2526";

// Function to calculate duration from "HH:mm:ss" format to seconds
const calculateDurationInSeconds = (durationString: string | undefined) => {
    if (!durationString) return 0;

    const [hours, minutes, seconds] = durationString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

/*
 * Formate songs as AddTrack .
 * We can only add tracks of type AddTrack in TrackPlayer
 */

const formateSong = (data: Song[]): AddTrack[] => {
    return data.map((song) => ({
        songId: song.SongID,
        url: song.AudioFilePath,
        title: song.Title,
        artist: song.Artist,
        album: song.Album,
        genre: song.Genre,
        artwork: song.CoverArtPath,
        duration: calculateDurationInSeconds(song.Duration),
    }));
};

// Get all tracks
export const getAllSong = async (): Promise<AddTrack[] | undefined> => {
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);
    try {
        const response: AxiosResponse<Song[]> = await axios.get(
            `${BASE_URL}/api/songs`,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        const formatedSong = formateSong(response.data);
        return formatedSong;
    } catch (error) {
        handleAxiosError(error);
    }
};

// search songs by artist
// serach songs by names
export const getSongsByName = async (
    songName: string
): Promise<AddTrack[] | undefined> => {
    try {
        const response: AxiosResponse<Song[]> = await axios.get(
            `${BASE_URL}/api/songs/search`,
            {
                params: { songName: songName },
            }
        );
        const formatedSong = formateSong(response.data);
        return formatedSong;
    } catch (error) {
        // You may want to handle errors differently based on your requirements
        console.error("Error fetching songs by name:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
};

// TODO figure out what you will return from this function. You are getting axios response as response
export const registerSongPlay = async (userID: number, songID: number) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response: AxiosResponse<{ message: string }> = await axios.post(
            `${BASE_URL}/api/songs/play`,
            { userID, songID },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// TODO song like
export const songsLike = async () => {};
