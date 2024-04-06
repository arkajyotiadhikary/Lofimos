import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "http://10.0.2.2:2526";

interface LikedSongs {
    SongID: number;
}

export const getLikedSongs = async (
    userID: number
): Promise<LikedSongs[] | undefined> => {
    const token = await AsyncStorage.getItem("token");
    try {
        const likedSongs = await axios.get(
            `${BASE_URL}/api/liked/songs/${userID}`,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        console.log("Liked song by the user", likedSongs.data);
        return likedSongs.data;
    } catch (error) {
        console.log("Error getting liked songs", error);
    }
};
