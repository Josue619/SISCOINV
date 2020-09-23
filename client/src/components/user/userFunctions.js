import axios from 'axios';

const baseAuthUrl = 'http://localhost:3000/api/auth';

export const signup = newUser => {
    return axios.post('/api/signup', newUser, { headers: 
        { 'Content-Type' : 'application/json' } 
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

export const login = user => {
    return axios.post(`${baseAuthUrl}/signin`, user, { headers: 
        { 'Content-Type' : 'application/json' } 
    })
    .then(res => {
        localStorage.setItem('token', res.data.token)
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

export const getProfile = () => {
    return axios.get('/api/profile', { 
        headers: { Authorization : `Bearer ${localStorage.token}` } 
    })
    .then(res => {
        console.log(res);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    });
}

