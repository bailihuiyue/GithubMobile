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
    visiableCustomKey: [],
    visiableCustomLanguage: [],
    favoriteItem: [],
    favoritePopular: [],
    favoriteTrending: [],
    favPopularKeys: [],
    favTrendingKeys: []
}

export default (state = defaultState, { type, payload }) => {
    const { favoritePopular, favoriteTrending } = payload || {};
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
            const { customKey, customLanguage, visiableCustomKey, visiableCustomLanguage, favoriteItem } = payload;
            return {
                ...state,
                popularData: JSON.parse(customKey) || [],
                trendingData: JSON.parse(customLanguage) || [],
                visiableCustomKey: JSON.parse(visiableCustomKey) || [],
                visiableCustomLanguage: JSON.parse(visiableCustomLanguage) || [],
            };
        case actionTypes.SET_FAVORITE:
            // TODO:存储一个用来保存收藏key数组
            if (favoritePopular) {
                const favPopularKeys = favoritePopular.map(item => item.id);
                AsyncStorage.setItem("favoritePopular", JSON.stringify(favoritePopular));
                AsyncStorage.setItem("favPopularKeys", JSON.stringify(favPopularKeys));
                return {
                    ...state,
                    favoritePopular: favoritePopular,
                    favPopularKeys
                };
            }
            if (favoriteTrending) {
                const favTrendingKeys = favoriteTrending.map(item => item.fullName);
                AsyncStorage.setItem("favoriteTrending", JSON.stringify(favoriteTrending));
                AsyncStorage.setItem("favTrendingKeys", JSON.stringify(favTrendingKeys));
                return {
                    ...state,
                    favoriteTrending: favoriteTrending,
                    favTrendingKeys
                };
            }
        case actionTypes.GET_FAVORITE:
            const { favPopularKeys, favTrendingKeys } = payload;
            return {
                ...state,
                favoritePopular: JSON.parse(favoritePopular || "[]"),
                favoriteTrending: JSON.parse(favoriteTrending || "[]"),
                favPopularKeys: JSON.parse(favPopularKeys || "[]"),
                favTrendingKeys: JSON.parse(favTrendingKeys || "[]"),
            };
        default:
            return state;
    }
}
