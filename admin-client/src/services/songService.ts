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
            return response.data;
      } catch (error) {
            console.error("Error fetching songs:", error);
            return [];
      }
};

export const uploadSong = async (formData: Partial<Song>, token: string) => {
      try {
            const response = await axios.post("http://localhost:2526/api/upload", formData, {
                  headers: {
                        Authorization: token,
                  },
            });
            return response.data;
      } catch (error) {
            console.error("Error uploading song:", error);
      }
};

export const deleteSong = async (id: number, token: string) => {
      try {
            const response = await axios.delete(`http://localhost:2526/api/songs/${id}`, {
                  headers: {
                        Authorization: token,
                  },
            });
            return response;
      } catch (error) {
            console.error("Error deleting song:", error);
      }
};
