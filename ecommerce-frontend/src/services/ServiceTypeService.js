import axios from 'axios';
import config from 'config';

const Constants = config[process.env.NODE_ENV];
const apiUrl = Constants.API_URL;

export default {
    getAll: async () => {
        const url = `${apiUrl}/service_type/getAllActive`;
        return await axios.get(url);
    },

    getOne: async (id) => {
        const url = `${apiUrl}/service_type/getOne/${id}`
        return await axios.get(url);
    },

    create: async (serviceName, serviceKey) => {
        const url = `${apiUrl}/service_type/createServiceType`;

        const serviceType = {
            servicename: serviceName,
            servicekey: serviceKey
        }

        return await axios.post(url, serviceType)
    },

    update: async (id, serviceName, serviceKey) => {
        const url = `${apiUrl}/service_type/updateOne/${id}`;

        const serviceType = {
            servicename: serviceName,
            servicekey: serviceKey
        }

        return await axios.put(url, serviceType)
    },

    delete: async (id) => {
        const url = `${apiUrl}/service_type/deleteOne/${id}`;
        return await axios.delete(url)
    }
};