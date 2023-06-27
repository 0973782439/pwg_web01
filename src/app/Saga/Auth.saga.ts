import { put, call, fork, take, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthActions } from "../Redux/Auth.slice";
import { ILogIn } from "../../interfaces/index";
import { RESPONSE_STATUS_SUCCESS } from "../../utils/httpResponseCode";
import { message } from "antd";
import { Login } from "../../api/auth.api";
import { setInfoUserLocal } from "../../utils/token";
function* handleLogIn(value: ILogIn) {
    try {
        const { data, status } = yield call(Login, value);
        if (status === RESPONSE_STATUS_SUCCESS) {
            message.success("Login success")
            setInfoUserLocal(data?.user)
            yield delay(500);
            yield put(AuthActions.loginSucces());
        }
    } catch (error: any) {
        yield delay(500);
        message.error(error.response.data || error.message)
    }
}

function* watchLogin() {
    while (true) {
        const actions: PayloadAction<ILogIn> = yield take(AuthActions.login.type);
        yield fork(handleLogIn, actions.payload);
    }
}

export function* AuthSaga() {
    yield fork(watchLogin);
}
