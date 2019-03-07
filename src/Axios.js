import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://magic-burger-838b0.firebaseio.com/'
})

export default instance;