import actionTypes from '../actionTypes'

const defaultState = {
    isLogin: false
}

export default (state = defaultState, action) => {
    debugger
    switch (action.type) {
        case actionTypes.CHANGE_LOGIN:
            return {
                ...state,
                ...{ hehe: "hehe" }
            };
        default:
            return state;
    }
}
