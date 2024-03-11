import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "http://10.0.2.2:2526";
import { type User } from "../../types";

type ValidateUserInput = {
    isValid: boolean;
    message: string;
};

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

// sign up methods
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

// input validate
export const validateUserInput = (
    formData: Partial<User>, // Change to Partial<User> to ensure properties are optional
    isLogIn: boolean
): ValidateUserInput => {
    // Validate if the username, email, and password are not empty
    if (!formData.username || !formData.email || !formData.password) {
        return {
            isValid: false,
            message: "Input fields cannot be empty.",
        };
    }

    // Validate the email if it's provided and it's not a login operation
    if (
        !isLogIn &&
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
        return {
            isValid: false,
            message: "Invalid email address.",
        };
    }

    // Validate the password if it's provided and it's not a login operation
    if (formData.password && formData.password.length < 8) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long.",
        };
    }

    return {
        isValid: true,
        message: "",
    };
};
