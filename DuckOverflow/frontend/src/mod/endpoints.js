import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    BaseURL : API_BASE_URL,
    withCredentials: true,
})

api.incerceptors.response.use(
    (response) => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refresh_token();
                return api(originalRequest);
            } catch (refreshError) {
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
    }
)

export const get_user_data = async (username) => {
    const response = await api.get(`/user_data${username}/`);
    return response.data;
}

export const refresh_token = async () => {
    const response = await api.post('/login/refresh/');
    return response.data;
}

export const login = async (username, password) => {
    const response = await api.post('/token/');
    return response.data;
}