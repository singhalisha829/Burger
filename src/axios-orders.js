import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://my-burger-3b88c-default-rtdb.firebaseio.com/'
});

export default instance;