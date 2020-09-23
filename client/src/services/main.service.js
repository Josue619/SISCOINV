import axios from 'axios';
import { Token } from '../helpers/token.helper';

const baseAuthUrl = 'http://localhost:3000/api/auth';

//export const signup = newUser => {
//    return axios.post(`${baseAuthUrl}/signup`, newUser, {
//        headers:
//            { 'Content-Type': 'application/json' }
//    })
//        .then(res => {
//            console.log(res);
//        })
//        .catch(err => {
//            console.log(err);
//        });
//}

export function signup(data) {
    return axios.post(`${baseAuthUrl}/signup` ,data);
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
            "auth_token" : token.get(),
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