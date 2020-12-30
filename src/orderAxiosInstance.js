import axios from 'axios';

const orderAxiosInstance = axios.create({
    baseURL: 'https://react-burger-app-3b060.firebaseio.com/'
})

export default orderAxiosInstance;