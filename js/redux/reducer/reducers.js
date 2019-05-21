import actionTypes from '../actionTypes'
import { AsyncStorage } from 'react-native';
import themeColor from '../../utils/ThemeColor';

const defaultState = {
    theme: {
        color: themeColor.Default
    },
    useOnlineData: true
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
        case actionTypes.USE_ONLINE_DATA:
            return {
                ...state,
                useOnlineData: payload
            };
        default:
            return state;
    }
}
