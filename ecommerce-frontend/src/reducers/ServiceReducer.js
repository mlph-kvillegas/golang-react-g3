import ActionType from "constants/ActionType";

const initialState = {
    serviceList: [],
    bookedServiceList: []
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

        case ActionType.BOOKED_SERVICE_LIST_SUCCESS: {
            return {
                ...state,
                bookedServiceList: action.payload.bookedServiceList
            };
        }

        case ActionType.BOOKED_SERVICE_LIST_FAILURE: {
            return {
                ...state,
                bookedServiceList: initialState.bookedServiceList
            };
        }

        default: {
            return state;
        }
    }
};