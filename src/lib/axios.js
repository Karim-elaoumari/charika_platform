// import axios from 'axios';

import Cookies from 'js-cookie';



// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:8000';

import Axios from 'axios'
const axios = Axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
})
export default axios
