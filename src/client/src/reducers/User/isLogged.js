let initialState = false;

const isLoggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_IS_LOGGED':
            return state;
        default:
            return state;
    }
}

export default isLoggedReducer;