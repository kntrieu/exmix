const initialState = [];

const QuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            const newQuestion = action.data;
            state.push(newQuestion);
            return state;
        default:
            return  state;
    }
}

export default QuestionsReducer;