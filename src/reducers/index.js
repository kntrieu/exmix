import { combineReducers } from 'redux';
import WizartReducer from './Wizart';
import QuestionsReducer from './Questions';
import isLoggedReducer from './User/isLogged';
import MixingReducer from './Mixing';

const rootReducer = combineReducers({
    WizartReducer: WizartReducer,
    QuestionsReducer: QuestionsReducer,
    isLoggedReducer: isLoggedReducer,
    MixingReducer: MixingReducer
});

export default rootReducer;