import axios from "axios";
const isServer = typeof window === "undefined";

// Dynamically determine the base URL
const baseURL = isServer
    ? process.env.API_BASE_URL // Server-side base URL
    : "/"; // Client-side base URL
axios.defaults.baseURL = baseURL;
// Add token to each request
axios.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Please log in again.");
            // Optional: Notify the app about 401 errors (via a callback or state)
        }
        return Promise.reject(error);
    }
);
