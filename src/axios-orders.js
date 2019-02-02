import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-react-burger-d2699.firebaseio.com/'
});

export default instance;