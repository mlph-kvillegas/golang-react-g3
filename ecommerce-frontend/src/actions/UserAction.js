import ActionType from "constants/ActionType";

export default {
    successUserList: (userList) => {
        return {
            type : ActionType.USER_LIST_SUCCESS,
            payload: {userList}
        }
    },

    failureUserList: (error) => {
        return {
            type: ActionType.USER_LIST_FAILURE,
            payload: {error}
        }
    },

    successServiceProviderList: (serviceProviderList) => {
        return {
            type : ActionType.SERVICE_PROVIDER_LIST_SUCCESS,
            payload: {serviceProviderList}
        }
    },

    failureServiceProviderList: (error) => {
        return {
            type: ActionType.SERVICE_PROVIDER_LIST_FAILURE,
            payload: {error}
        }
    }
};