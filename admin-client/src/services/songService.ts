import axios, { AxiosResponse } from "axios";
import { Song } from "../types";

export const getAllSongs = async (token: string): Promise<Song[]> => {
      try {
            const response = await axios.get<Song[]>("http://localhost:2526/api/songs", {
                  headers: {
                        Authorization: token,
                  },
            });

            if (response.status === 200) {
                  return response.data;
            } else {
                  throw new Error(`Request failed with status: ${response.status}`);
            }
      } catch (error: any) {
            console.error("Error fetching songs:", error.message);
            return [];
      }
};

export const uploadSong = async (formData: Partial<Song>, token: string): Promise<Song> => {
      try {
            const response = await axios.post<Song>("http://localhost:2526/api/upload", formData, {
                  headers: {
                        Authorization: token,
                  },
            });
            return response.data;
      } catch (error: any) {
            console.error("Error uploading song:", error.message);
            throw error;
      }
};

export const updateSong = async (id: number, song: Partial<Song>, token: string): Promise<Song> => {
      try {
            const response = await axios.put<Song>(`http://localhost:2526/api/songs/${id}`, song, {
                  headers: {
                        Authorization: token,
                  },
            });
            return response.data;
      } catch (error: any) {
            console.error("Error updating song:", error.message);
            throw error;
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
