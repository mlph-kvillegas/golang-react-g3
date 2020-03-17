export default {
    success: (config) => {
        config.headers = {
            ...config.headers
        };
    
        return config;
    }, 
    
    fail: (error) => {
        return Promise.reject(error);
    },
};