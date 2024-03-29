import axios, { AxiosError } from "axios";

export const handleAxiosError = (error: unknown): unknown | never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            console.error(
                "Server responded with an error:",
                axiosError.response.data
            );
            return axiosError.response.data;
        } else if (axiosError.request) {
            console.error("No response recived:", axiosError.request._response);
        } else {
            console.error("Request setup error:", axiosError.message);
        }
    } else {
        console.log("Unknown error", error);
    }
    throw error;
};
