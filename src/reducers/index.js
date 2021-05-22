import { combineReducers } from 'redux';
import WizartReducer from './Wizart';
import QuestionsReducer from './Questions';

const rootReducer = combineReducers({
    WizartReducer: WizartReducer,
    QuestionsReducer: QuestionsReducer
});

export default rootReducer;