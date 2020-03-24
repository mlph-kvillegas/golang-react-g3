import ActionType from "constants/ActionType";

const initialState = {
    serviceList: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionType.SERVICE_LIST_SUCCESS: {
            return {
                ...state,
                serviceList: action.payload.serviceList
            };
        }

        case ActionType.SERVICE_LIST_FAILURE: {
            return {
                ...state,
                serviceList: initialState.serviceList
            };
        }

        default: {
            return state;
        }
    }
};