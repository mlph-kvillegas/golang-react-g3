import ActionType from "constants/ActionType";

export default {
    successServiceTypeList: (serviceTypeList) => {
        return {
            type : ActionType.SERVICE_TYPE_LIST_SUCCESS,
            payload: {serviceTypeList}
        }
    },

    failureServiceTypeList: (error) => {
        return {
            type: ActionType.SERVICE_TYPE_LIST_FAILURE,
            payload: {error}
        }
    }
};