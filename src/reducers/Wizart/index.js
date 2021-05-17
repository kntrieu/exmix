let initialState = [
    {
        id: 0,
        title: 'Nhập Tên Kì Thi',
        value: '',
        completed: false,
        isCurrentStep: true
    },
    {
        id: 1,
        title: 'Nhập Tên Môn Học',
        value: '',
        completed: false,
        isCurrentStep: false
    },
    {
        id: 2,
        title: 'Nhập Năm Học',
        value: '',
        completed: false,
        isCurrentStep: false
    },
    {
        id: 3,
        title: 'Nhập Số Phút',
        value: 0,
        completed: false,
        isCurrentStep: false
    }
];

const WizartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_WIZART_STEP_VALUE':
            return state
        default:
            return state;

    }
}

export default WizartReducer;