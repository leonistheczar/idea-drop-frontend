import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";
import { refreshAccessToken } from "@/api/auth";
const api = axios.create({
    baseURL: import.meta.env.VITE_DB_BASE_URL,
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
});
// Attach token to request
api.interceptors.request.use((config) => {
    const token = getStoredAccessToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
// Refresh token before it expires
api.interceptors.response.use((res) => res, async(error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
    ){
        originalRequest._retry = true;
        try {
            const {accessToken} = await refreshAccessToken();
            setStoredAccessToken(accessToken)
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (err) {
            console.error("Refresh token failed: ", err)
            
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})
export default api