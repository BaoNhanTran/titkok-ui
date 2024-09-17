import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

export default httpRequest;
