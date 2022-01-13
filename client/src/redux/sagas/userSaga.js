import axios from 'axios';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS } from '../types';
import { push } from "connected-react-router";

// CLEAR ERROR
function* clearError() {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        })
        console.error(e);
    }
}

function* watchClearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

// SIGNUP
const signupUserAPI = (req) => {
    return axios.post("/api/user/signup", req);
}

function* signupUser(action) {
    try {
        const result = yield call(signupUserAPI, action.payload);

        yield put({
            type: SIGNUP_SUCCESS,
            payload: result.data,
        });

        yield put(push("/login"));
    } catch (e) {
        yield put({
            type: SIGNUP_FAILURE,
            payload: e.response,
        });
    }
}

function* watchSignupUser() {
    yield takeEvery(SIGNUP_REQUEST, signupUser);
}

// LOGIN
const loginUserAPI = (req) => {
    return axios.post("/api/user/signin", req);
}

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload);

        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data.response,
        });

        yield put(push("/"));
    } catch(e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response,
        });
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT
function* logoutUser() {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        });

        yield put(push("/"));
    } catch(e) {
        console.error(e);
        yield put({
            type: LOGOUT_FAILURE,
            payload: e.response,
        });
    }
}

function* watchLogoutUser() {
    yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// USER LOADING
const userLoadingAPI = (token) => {
    const config = {
        headers: {
            "Content-Type" : "application/json",
        },
    };
    if(token) {
        config.headers["X-AUTH-TOKEN"] = token;
    };

    return axios.get("/api/auth/", config);
};

function* userLoading(action) {
    try {
        const result = yield call(userLoadingAPI, action.payload);

        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data.response,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        })
    }
};

function* watchUserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
};

export default function* userSaga() {
    yield all([
        fork(watchClearError),
        fork(watchSignupUser),
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchUserLoading),
    ]);
}
