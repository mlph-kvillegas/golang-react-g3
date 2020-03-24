import ActionType from "constants/ActionType";

const initialState = {
    serviceTypeList: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionType.SERVICE_TYPE_LIST_SUCCESS: {
            return {
                ...state,
                serviceTypeList: action.payload.serviceTypeList
            };
        }

        case ActionType.SERVICE_TYPE_LIST_FAILURE: {
            return {
                ...state,
                serviceTypeList: initialState.serviceTypeList
            };
        }

        default: {
            return state;
        }
    }
};