import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://10.0.2.2:2526";
import { type User } from "../../types";

// Handle Axios errors
const handleAxiosError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            console.error(
                "Server responded with an error:",
                axiosError.response.data
            );
        } else if (axiosError.request) {
            console.error(
                "No response received:",
                axiosError.request._response
            );
        } else {
            console.error("Request setup error:", axiosError.message);
        }
    } else {
        console.error("Unknown error:", error);
    }
    throw error;
};

export const signUp = async (
    username: string | undefined,
    email: string | undefined,
    password: string | undefined
): Promise<User | undefined> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/api/register`,
            { username, email, password }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Sign in method
export const signIn = async (
    email: string | undefined,
    password: string | undefined
): Promise<User | undefined> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/api/login`,
            { email, password }
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
