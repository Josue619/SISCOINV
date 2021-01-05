import axios from 'axios';
import { Token } from '../helpers/token.helper';

const token = new Token();
const baseAuthUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/auth`;
const baseUserUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/user`;
const baseUtilUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/utilitarios`;


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
    const id = token.payload(token.get())._id;
    return axios.get(`${baseAuthUrl}/profile/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

export function getUsers(data) {
    const id = token.payload(token.get())._id;
    return axios.post(`${baseUserUrl}/users/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

export function createUser(data) {
    return axios.post(`${baseUserUrl}/user`, data, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

export function updateUser(data) {
    return axios.put(`${baseUserUrl}/user`, data, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

export function deleteUser(data) {
    return axios.put(`${baseUserUrl}/userD`, data, {
        headers: {
            "Content-Type": "application/json",
            "auth_token": token.get(),
            Authorization: `Bearer ${(token.get())}`,
        }
    });
}

//Valida permiso a la pantalla
export function permisoEjecutable(data){
    //console.log(data);
    return axios.post(`${baseUtilUrl}/permisopantalla`,data);
}