export default {
    success: (response) => {
        return response;
    }, 
    
    fail: (error) => {
        return Promise.reject(error.response);
    },
};