import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS } from "../types";

// CLEAR ERROR
function* clearError(action) {
    if(action.payload) {
        yield put(push(`${action.payload}`))
    }

    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        })
    }
}

function* watchClearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
}

export default function* errorSaga() {
    yield all([
        fork(watchClearError),
    ])
}