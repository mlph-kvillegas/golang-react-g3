import ActionType from "constants/ActionType";

const initialState = {
    userList: []
}

export default (state, action) => {
    state = initialState
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

        default: {
            return state;
        }
    }
};