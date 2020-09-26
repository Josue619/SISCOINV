import axios from 'axios';
import { Token } from '../helpers/token.helper';

const baseAuthUrl = 'http://localhost:3000/api/auth';

export function admin_auth(data) {
    return axios.post(`${baseAuthUrl}/admin_auth`, data);
}

export function signup(data) {
    return axios.post(`${baseAuthUrl}/signup`, data);
}

export function login(data) {
    return axios.post(`${baseAuthUrl}/signin`, data);
}

export function profile() {
    const token = new Token();
    const id = token.payload(token.get())._id;
    return axios.get(`${baseAuthUrl}/profile/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

export const getProfile = () => {
    return axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${localStorage.token}` }
    })
        .then(res => {
            console.log(res);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}