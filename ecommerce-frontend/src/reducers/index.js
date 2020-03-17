import { combineReducers } from 'redux';
import ServiceTypeReducer from 'reducers/ServiceTypeReducer';
import ServiceReducer from 'reducers/ServiceReducer';
import UserReducer from 'reducers/UserReducer';

export default combineReducers({
    serviceType: ServiceTypeReducer,
    service: ServiceReducer,
    user: UserReducer
})