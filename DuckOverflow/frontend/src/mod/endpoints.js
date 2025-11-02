import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL : API_BASE_URL,
    withCredentials: true,
})

api.interceptors.response.use(
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
    const response = await api.get(`/user_data/${username}/`);
    return response.data;
}

export const refresh_token = async () => {
    const response = await api.post('/token/refresh/');
    return response.data;
}

export async function login_user(username, password) {
  const response = await api.post('/token/', {username, password});
  return response.data;
}

export const create_post = async (title, question, answer) => {
    const response = await api.post('/create_post/', {
        title,
        question,
        answer
    });
    return response.data;
};


export const get_posts = async (num) => {
    const response = await api.get(`/posts/?page=${num}`)
    return response.data
}

export const get_post = async (id) => {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
}


