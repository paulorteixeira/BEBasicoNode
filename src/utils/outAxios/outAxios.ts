import axios from 'axios';

export const outAxios = axios.create({
    baseURL: String(process.env.URL_PYTHON_BACKEND),
    headers: {
        'Accept-Encoding': '*',
    },
});