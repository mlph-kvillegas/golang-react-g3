import axios from 'axios';
import config from 'config';

const Constants = config[process.env.NODE_ENV];
const apiUrl = Constants.API_URL;

export default {
    getAll: async () => {
        const url = `${apiUrl}/service/getAllActive`;
        return await axios.get(url);
    },

    getOne: async (id) => {
        const url = `${apiUrl}/service/getOne/${id}`
        return await axios.get(url);
    },

    create: async (service) => {
        const url = `${apiUrl}/service/createService`;
        return await axios.post(url, service)
    },

    update: async (id, service) => {
        const url = `${apiUrl}/service/updateOne/${id}`;
        return await axios.put(url, service)
    },

    delete: async (id) => {
        const url = `${apiUrl}/service/deleteOne/${id}`;
        return await axios.delete(url)
    },

    bookService: async (bookedService) => {
        const url = `${apiUrl}/service/bookedService`;
        return await axios.post(url, bookedService)
    },

    getAllBookService: async () => {
        const url = `${apiUrl}/service/bookedService/getAll`;
        return await axios.get(url)
    }
};