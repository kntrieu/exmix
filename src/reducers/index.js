import { combineReducers } from 'redux';
import WizartReducer from './Wizart';

const rootReducer = combineReducers({
    WizartReducer: WizartReducer
});

export default rootReducer;