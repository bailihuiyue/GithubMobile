import { put, call, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import actionTypes from '../actionTypes';
import themeColor from '../../utils/ThemeColor';

//TODO:tip:和调用reducer一样:setLoginTypeAsync1: (payload) => { dispatch({ type: 'changeLogin_async1', payload }) },
//因此,effects和reducer不能重名
function* getTheme() {
    const result = yield AsyncStorage.getItem("themeColor")
    yield put({ type: actionTypes.SET_THEME, payload: { theme: result || themeColor.Default } });
}
function* getCustomKey() {
    const customKey = yield AsyncStorage.getItem("CustomKey");
    const customLanguage = yield AsyncStorage.getItem("CustomLanguage");
    const visiableCustomKey = yield AsyncStorage.getItem("visiableCustomKey");
    const visiableCustomLanguage = yield AsyncStorage.getItem("visiableCustomLanguage");
    yield put({ type: actionTypes.GET_CUSTOM_KEYS, payload: { customKey, customLanguage, visiableCustomKey, visiableCustomLanguage } });
}
function* getFavorite() {
    const favoritePopular = yield AsyncStorage.getItem("favoritePopular");
    const favoriteTrending = yield AsyncStorage.getItem("favoriteTrending");
    const favPopularKeys = yield AsyncStorage.getItem("favPopularKeys");
    const favTrendingKeys = yield AsyncStorage.getItem("favTrendingKeys");
    yield put({ type: actionTypes.GET_FAVORITE, payload: { favoritePopular, favoriteTrending, favPopularKeys, favTrendingKeys } });
}

export default function* rootSaga() {
    yield takeEvery(actionTypes.GET_THEME, getTheme);
    yield takeEvery("getFavorite", getFavorite);
    yield takeEvery("getCustomKeysAndLang", getCustomKey);
}
