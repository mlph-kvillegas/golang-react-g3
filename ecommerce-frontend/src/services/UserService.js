import axios from 'axios';
import config from 'config';

const Constants = config[process.env.NODE_ENV];
const apiUrl = Constants.API_URL;

export default {
    register: async (data) => {
        const url = `${apiUrl}/register`;
        console.log(data)
        return await axios.post(url, data);
    },

    login: async (data) => {
        const url = `${apiUrl}/login`;
        return await axios.post(url, data);
    },

    getAll: async () => {
        const url = `${apiUrl}/user/getAllActive`;
        return await axios.get(url);
    },

    getOne: async (id) => {
        const url = `${apiUrl}/user/getOne/${id}`
        return await axios.get(url);
    },

    create: async (user) => {
        const url = `${apiUrl}/user/createUser`;

        return await axios.post(url, user)
    },

    update: async (id, user) => {
        const url = `${apiUrl}/user/updateOne/${id}`;

        return await axios.put(url, user)
    },

    delete: async (id) => {
        const url = `${apiUrl}/user/deleteOne/${id}`;
        return await axios.delete(url)
    },

    getAllServiceProviders: async () => {
        const url = `${apiUrl}/user/serviceProviders`;
        return await axios.get(url);
    }
};