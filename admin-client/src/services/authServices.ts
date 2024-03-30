import axios from "axios";
import { UserData, UserResponseData } from "../types";

const serverUrl = "http://localhost:2526";

export const signIn = async (userData: UserData): Promise<UserResponseData | undefined> => {
      try {
            console.log("request sent");
            const response = await axios.post(`${serverUrl}/api/login`, userData);
            const authToken = response.headers["authorization"];
            console.log("Auth Token ", authToken);
            if (response) return response.data;
      } catch (error) {
            console.log(error);
      }
};
