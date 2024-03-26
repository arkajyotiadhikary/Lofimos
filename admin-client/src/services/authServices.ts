import axios from "axios";
import { UserData } from "../types";

const serverUrl = "http://localhost:2526";

export const signIn = async (userData: UserData): Promise<void> => {
      try {
            console.log("request sent");
            const response = await axios.post(`${serverUrl}/api/login`, userData);
            console.log(response.data);
            return response.data;
      } catch (error) {
            console.log(error);
      }
};
