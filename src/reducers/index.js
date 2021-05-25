import { combineReducers } from 'redux';
import WizartReducer from './Wizart';
import QuestionsReducer from './Questions';
import isLoggedReducer from './User/isLogged';

const rootReducer = combineReducers({
    WizartReducer: WizartReducer,
    QuestionsReducer: QuestionsReducer,
    isLoggedReducer: isLoggedReducer
});

export default rootReducer;