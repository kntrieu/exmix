import { setDataByName, getDataByName } from '../../utils/localStorageUtils'; 
import { DATA_NAME } from '../../utils/constants';

const initialState = !getDataByName(DATA_NAME.MIXING) ? [] : getDataByName(DATA_NAME.MIXING);

const MixingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MIXING':
            state = action.data;
            //set to local storage
            setDataByName(DATA_NAME.MIXING, state);
            return state;
            
        default:
            //set to local storage
            return  state;
    }
}

export default MixingReducer;