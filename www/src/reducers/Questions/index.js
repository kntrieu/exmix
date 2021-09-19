import { setQuestionData, getQuestionData } from '../../utils/localStorageUtils'; 

const initialState = !getQuestionData() ? [] : getQuestionData();

const QuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            const newQuestion = action.data;
            state.push(newQuestion);

            //set to local storage
            setQuestionData(state);
            return state;
        case 'DELETE_QUESTION':
            const index = state.findIndex(item => item.id === action.data);
            if(index > -1) state.splice(index, 1);
            //set to local storage
            setQuestionData(state);
            return state;
        case 'EDIT_QUESTION':
            const questionObj = action.data;
            state.map(question => {
                if(question.id === questionObj.id) {
                    question = questionObj
                };
                return question;
            });
            
            //set to local storage
            setQuestionData(state);
            return state;
        case 'ADD_QUESTIONS':
            const questions = action.data;
            setQuestionData([...state, ...questions]);
            return [...state, ...questions];
        default:
            //set to local storage
            setQuestionData(state);
            return  state;
    }
}

export default QuestionsReducer;