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
    visiableCustomKey:[],
    visiableCustomLanguage:[]
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
            const tempKeys = payload.arr.filter(item => item.checked);
            if (payload.type === "CustomKey") {
                AsyncStorage.setItem("CustomKey", JSON.stringify(payload.arr));
                AsyncStorage.setItem("visiableCustomKey", JSON.stringify(tempKeys));
                return {
                    ...state,
                    popularData: payload.arr,
                    visiableCustomKey: tempKeys
                };
            }
            AsyncStorage.setItem("CustomLanguage", JSON.stringify(payload.arr));
            AsyncStorage.setItem("visiableCustomLanguage", JSON.stringify(tempKeys));
            return {
                ...state,
                trendingData: payload.arr,
                visiableCustomLanguage: tempKeys
            };
        case actionTypes.GET_CUSTOM_KEYS:
            //TODO:tip:reducers都是同步的,所以在这里写异步没有用,异步要在effects里面写
            const { customKey, customLanguage, visiableCustomKey, visiableCustomLanguage } = payload;
            return {
                ...state,
                popularData: JSON.parse(customKey) || [],
                trendingData: JSON.parse(customLanguage) || [],
                visiableCustomKey: JSON.parse(visiableCustomKey) || [],
                visiableCustomLanguage: JSON.parse(visiableCustomLanguage) || [],
            };
        default:
            return state;
    }
}
