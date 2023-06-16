import { all } from "redux-saga/effects";
import { AuthSaga } from "./Saga/Auth.saga";

export function* rootSaga() {
    yield all([AuthSaga()]);
}
