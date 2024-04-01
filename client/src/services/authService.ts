import axios, { AxiosError, AxiosResponse } from "axios";
import { type User } from "../../types";
import { handleAxiosError } from "./axiosErrorHandler";

const BASE_URL = "http://10.0.2.2:2526";

type ValidateUserInput = {
    isValid: boolean;
    message: string;
};

// sign up methods
export const signUp = async (
    username: string | undefined,
    email: string | undefined,
    password: string | undefined
): Promise<
    | { hasError: boolean; User: User }
    | { hasError: boolean; message: string }
    | undefined
> => {
    try {
        const response: AxiosResponse<
            | { hasError: boolean; User: User }
            | { hasError: boolean; message: string }
            | undefined
        > = await axios.post(`${BASE_URL}/api/register`, {
            username,
            email,
            password,
        });
        return response.data || undefined;
    } catch (error) {
        return handleAxiosError(error) as undefined;
    }
};

// Sign in method
export const signIn = async (
    email: string | undefined,
    password: string | undefined
): Promise<
    | {
          hasError: boolean;
          data: {
              role: string;
              userVerified: boolean;
              token: string;
          };
      }
    | { hasError: boolean; message: string }
    | undefined
> => {
    try {
        const response: AxiosResponse<
            | {
                  hasError: boolean;
                  data: { role: string; userVerified: boolean; token: string };
              }
            | { hasError: boolean; message: string }
        > = await axios.post(`${BASE_URL}/api/login`, { email, password });
        return response.data || undefined;
    } catch (error) {
        return handleAxiosError(error) as undefined;
    }
};

// input validate
export const validateUserInput = (
    formData: Partial<User>,
    isLogIn: boolean
): ValidateUserInput => {
    // Validate if the username, email, and password are not empty
    if (
        (!formData.username && !isLogIn) ||
        !formData.email ||
        !formData.password
    ) {
        return {
            isValid: false,
            message: "Input fields cannot be empty.",
        };
    }

    // Validate the email if it's provided and it's not a login operation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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

export const validateToken = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/validate`, {
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
