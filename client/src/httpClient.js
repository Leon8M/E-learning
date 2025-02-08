import axios from "axios";

const httpClient = axios.create({
    baseURL: "https://e-learning-nvak.onrender.com",  // Ensure this is correct
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor (Attach token automatically)
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Ensure token is stored
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default httpClient;
