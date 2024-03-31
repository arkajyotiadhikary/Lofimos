import axios from "axios";
import { UserData, UserResponseData } from "../types";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:2526";

export const signIn = async (userData: UserData): Promise<UserResponseData | undefined> => {
      try {
            const response = await axios.post(`${serverUrl}/api/login`, userData);
            if (response) {
                  Cookies.set("token", response.data.token);
                  return response.data;
            }
      } catch (error) {
            console.log(error);
      }
};

export const validateToken = async (token: string): Promise<boolean> => {
      try {
            const response = await axios.post(`${serverUrl}/api/validate`, {
                  token: token,
            });
            if (!response.data.hasError) {
                  return true;
            }
            return false;
      } catch (error) {
            console.log(error);
            return false;
      }
};
