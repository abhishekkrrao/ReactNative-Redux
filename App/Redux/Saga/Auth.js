import { takeEvery, put, call } from 'redux-saga/effects';
import * as ACTIONS from '../Action';
import { LocalStorage, NetworkManager } from '../../Util';
import { apis } from "../../Config";

function getApiCall(url, data) {
    return NetworkManager.networkManagerInstance.fetchRequest(url, "GET", data);
}

function* signIn() {
    // const data = { islogin: true };
    // yield put({ type: ACTIONS.AUTH_SIGN_IN, data });
}
function* getUserDetialsHandler() {
    try {
        const res = yield call(getApiCall, apis.getProfile, {});
        if (res.success === 200) {
            let data = res.output;
            yield put({ type: ACTIONS.GET_USER_DETAIL_SUCCESS, data });
        }
    } catch (error) {
        yield put({ type: ACTIONS.GET_USER_DETAIL_FAIL, error });
    }
}
function* getProfileDetialsHandler() {
    try {
        const res = yield call(getApiCall, apis.getProfile, {});
        if (res.success === 200) {
            let data = res.output;
            yield put({ type: ACTIONS.GET_USER_DETAIL_SUCCESS, data });
        }
    } catch (error) {
        yield put({ type: ACTIONS.GET_USER_DETAIL_FAIL, error });
    }
}

export function* authSaga() {
    yield takeEvery(ACTIONS.AUTH_SIGN_IN, signIn);
}
