import actionTypes from '../actionTypes'
import { AsyncStorage } from 'react-native';
import themeColor from '../../utils/ThemeColor';

const defaultState = {
    theme: {
        color: themeColor.Default
    },
    useOnlineData: true,
    trendingData: [],
    popularData: [],
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
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
        case actionTypes.SET_CUSTOM_KEY:
            if (payload.type === "CustomKey") {
                AsyncStorage.setItem("CustomKey", JSON.stringify(payload.arr));
                return {
                    ...state,
                    popularData: payload.arr
                };
            }
            AsyncStorage.setItem("CustomLanguage", JSON.stringify(payload.arr));
            return {
                ...state,
                trendingData: payload.arr
            };
        case actionTypes.GET_CUSTOM_KEYS:
            //TODO:tip:reducers都是同步的,所以在这里写异步没有用,异步要在effects里面写
            const { customKey, customLanguage } = payload
            return {
                ...state,
                popularData: JSON.parse(customKey) || [],
                trendingData: JSON.parse(customLanguage) || [],
            };
        default:
            return state;
    }
}
