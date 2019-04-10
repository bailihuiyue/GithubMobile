import actionTypes from '../actionTypes'

const defaultState = {
    isLogin: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOGIN:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
