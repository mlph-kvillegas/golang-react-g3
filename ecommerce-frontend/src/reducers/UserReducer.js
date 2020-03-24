import ActionType from "constants/ActionType";

const initialState = {
    userList: [],
    serviceProviderList: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionType.USER_LIST_SUCCESS: {
            return {
                ...state,
                userList: action.payload.userList
            };
        }

        case ActionType.USER_LIST_FAILURE: {
            return {
                ...state,
                userList: initialState.userList
            };
        }

        case ActionType.SERVICE_PROVIDER_LIST_SUCCESS: {
            return {
                ...state,
                serviceProviderList: action.payload.serviceProviderList
            };
        }

        case ActionType.SERVICE_PROVIDER_LIST_FAILURE: {
            return {
                ...state,
                serviceProviderList: initialState.serviceProviderList
            };
        }

        default: {
            return state;
        }
    }
};