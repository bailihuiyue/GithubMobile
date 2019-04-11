import actionTypes from '../actionTypes'

const defaultState = {
    isLogout: false
}

export default (state = defaultState, action) => {
    // TODO:tip:reducer中的type不要重名,
    // 因为combineReducers会将所有的reducer都合并在一起,如果有重复的type,
    // 那么每个被匹配到的type都会触发当前reducer的state的改变,十分危险,
    // 会引起匪夷所思的bug
    switch (action.type) {
        case 'logout':
            return {
                ...state,
                ...action.payload
            };
        case 'CHANGE_LOGIN':
            return {
                ...state,
                ...{ hehe: "hehe" }
    };
        default:
    return state;
}
}
