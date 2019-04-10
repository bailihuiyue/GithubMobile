import { put, call, all, fork } from 'redux-saga/effects';

function* changeLogin() {
    // const response = yield call('CHANGE_LOGIN');
    yield put({ type: 'change_login', payload: true });
}

export default function* rootSaga() {
    yield all([
        fork(changeLogin)
    ]);
}
