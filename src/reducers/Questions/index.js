const initialState = [
    {
        id: 0,
        content: 'Ai đã lãnh đạo của phong trào khởi nghĩa Lam Sơn?',
        answers: [
            {
                id: 'A',
                content: 'Nguyễn Huệ',
            },
            {
                id: 'B',
                content: 'Lê Lợi',
            },
            {
                id: 'C',
                content: 'Đinh Bộ Lĩnh',
            },
            {
                id: 'D',
                content: 'Trần Quốc Tuấn',
            }
        ],
        correctAnswer: 'B'
    },
    
];

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