import axios from "axios";
import { Song } from "../types";
export const getAllSongs = async (): Promise<Song[]> => {
      try {
            const response = await axios.get<Song[]>("http://localhost:2526/api/songs");
            console.log("response", response.data);
            return response.data;
      } catch (error) {
            console.log(error);
            return [];
      }
};
