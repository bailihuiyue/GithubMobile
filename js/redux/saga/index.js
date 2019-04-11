import { put, call, takeEvery } from 'redux-saga/effects';

function* changeLogin_async1() {
    // const response = yield call('CHANGE_LOGIN');
    yield put({ type: 'CHANGE_LOGIN', payload: { isLogin: 'CHANGE_LOGIN_ASYNC1' } });
}

function* changeLogin_async2() {
    yield put({ type: 'CHANGE_LOGIN', payload: { isLogin: 'CHANGE_LOGIN_ASYNC2' } });
}

export default function* rootSaga() {
    // TODO:tip:这里可以给saga起名字,方便调用,saga最终调用的是action
    yield takeEvery("changeLogin_async1", changeLogin_async1);
    yield takeEvery("changeLogin_async2", changeLogin_async2)
}
