import { put, call, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import actionTypes from '../actionTypes';

//TODO:tip:和调用reducer一样:setLoginTypeAsync1: (payload) => { dispatch({ type: 'changeLogin_async1', payload }) },
//因此,effects和reducer不能重名
function* getTheme() {
    // yield put({ type: actionTypes.SET_THEME, payload: { theme: "" } });
    yield AsyncStorage.getItem("themeColor", (error, result) => {
        put({ type: actionTypes.SET_THEME, payload: { theme: result } });
    })
}

// function* changeLogin_async2() {
//     yield put({ type: 'CHANGE_LOGIN', payload: { isLogin: 'CHANGE_LOGIN_ASYNC2' } });
// }

export default function* rootSaga() {
    yield takeEvery(actionTypes.GET_THEME, getTheme);
}
