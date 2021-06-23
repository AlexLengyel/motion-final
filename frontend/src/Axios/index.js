import axios from 'axios'

const baseURL = 'https://krab-motion.propulsion-learn.ch/backend/api/'

const Axios = axios.create({
    baseURL: baseURL,
})

Axios.defaults.baseURL = baseURL;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.patch['Content-Type'] = 'application/json';

// pages will only render when the header is included inside the async function in the 'fetches' folder..will try to look this up later
// const token = localStorage.getItem('token')
// Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export default Axios