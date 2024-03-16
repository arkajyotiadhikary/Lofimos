import axios, { AxiosResponse } from "axios";
import { Song } from "../../types";
import { handleAxiosError } from "./axiosErrorHandler";
import { type AddTrack } from "react-native-track-player";

const BASE_URL = "http://10.0.2.2:2526";

// Function to calculate duration from "HH:mm:ss" format to seconds
const calculateDurationInSeconds = (durationString: string | undefined) => {
    if (!durationString) return 0; // If durationString is undefined or null, return 0

    const [hours, minutes, seconds] = durationString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

/*
 * Formate songs as AddTrack .
 * We can only add tracks of type AddTrack in TrackPlayer
 */
const formateSong = (data: Song[]): AddTrack[] => {
    return data.map((song, index) => ({
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
    try {
        const response: AxiosResponse<Song[]> = await axios.get(
            `${BASE_URL}/api/songs`
        );
        const formatedSong = formateSong(response.data);
        return formatedSong;
    } catch (error) {
        handleAxiosError(error);
    }
};

// search songs by artist
// serach songs by names
// search songs by mood
// search songs by time of the day
// search songs by season.
// search songs by study, work or chillout.
// search by popularity.
