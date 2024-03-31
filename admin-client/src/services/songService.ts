import axios from "axios";
import { Song } from "../types";

export const getAllSongs = async (token: string): Promise<Song[]> => {
      try {
            const response = await axios.get<Song[]>("http://localhost:2526/api/songs", {
                  headers: {
                        Authorization: token,
                  },
            });

            // Ensure successful response status
            if (response.status !== 200) {
                  console.error("Request failed with status:", response.status);
                  return [];
            }

            console.log("response", response.data);
            return response.data;
      } catch (error) {
            console.error("Error fetching songs:", error);
            return [];
      }
};
