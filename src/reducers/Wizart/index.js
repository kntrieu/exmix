import { setWizartData, getWizartData } from '../../utils/localStorageUtils'; 

let initialState = !getWizartData() ? [
    {
        id: 0,
        title: 'Nhập Tên Trường',
        value: '',
        completed: false,
        isCurrentStep: true,
        type: 'text'
    },
    {
        id: 1,
        title: 'Nhập Tên Kì Thi',
        value: '',
        completed: false,
        isCurrentStep: true,
        type: 'text'
    },
    {
        id: 2,
        title: 'Nhập Tên Môn Học',
        value: '',
        completed: false,
        isCurrentStep: false,
        type: 'text'
    },
    {
        id: 3,
        title: 'Nhập Năm Học',
        value: '',
        completed: false,
        isCurrentStep: false,
        type: 'text'
    },
    {
        id: 4,
        title: 'Nhập Số Phút',
        value: 0,
        completed: false,
        isCurrentStep: false,
        type: 'number'
    }
] : getWizartData();


const WizartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_WIZART_STEP_VALUE':

            state.map(item => {
                if(item.id === action.data.stepId) {
                    item.value = action.data.value;
                }

                return item;
            });
            
            setWizartData(state);
            return state;
        case 'SET_WIZART_STEP_COMPLETED':
            state.map(item => {
                if(item.id === action.data.stepId) {
                    item.completed = true;
                }

                return item;
            });

            setWizartData(state);
            return state;
        case 'SET_WIZART_STEP_UN_COMPLETED':
            state.map(item => {
                if (item.id === action.data.stepId) {
                    item.completed = false;
                }

                return item;
            });

            setWizartData(state);
            return state;
        case 'SET_WIZART_STEP_CURRENT':
            state.map(item => {
                if (item.id === action.data.stepId) {
                    item.isCurrentStep = true;
                }

                return item;
            });

            setWizartData(state);
            return state;
        case 'SET_WIZART_STEP_NOT_CURRENT':
            state.map(item => {
                if (item.id === action.data.stepId) {
                    item.isCurrentStep = false;
                }

                return item;
            });

            setWizartData(state);
            return state;
        case 'UPDATE_WIZART_DATA':
            state = action.data;
            setWizartData(state);
            return state;
        default:
            setWizartData(state);
            return state;

    }
}

export default WizartReducer;