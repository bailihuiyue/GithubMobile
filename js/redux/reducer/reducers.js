import actionTypes from '../actionTypes'
import { AsyncStorage } from 'react-native';
import themeColor from '../../utils/ThemeColor';

const defaultState = {
    isLogin: false,
    theme: {
        color: themeColor.Default
    }
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case actionTypes.CHANGE_LOGIN:
            return {
                ...state,
                ...{ hehe: "hehe" }
            };
        case actionTypes.SET_THEME:
            AsyncStorage.setItem("themeColor", payload.theme);
            return {
                ...state,
                theme: { color: payload.theme }
            };
        default:
            return state;
    }
}
