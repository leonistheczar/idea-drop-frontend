import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_DB_BASE_URL,
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true,
});
export default api