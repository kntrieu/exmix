import { setWizartData, getWizartData } from '../../utils/localStorageUtils'; 

let initialState = !getWizartData() ? [
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
        default:
            setWizartData(state);
            return state;

    }
}

export default WizartReducer;