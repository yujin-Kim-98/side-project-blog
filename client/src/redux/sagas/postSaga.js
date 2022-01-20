import { all, call, put, takeEvery, fork } from "@redux-saga/core/effects";
import axios from "axios";
import postReducer from "../reducers/postReducer";
import { push } from "connected-react-router";
import { POST_SAVE_FAILURE, POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_GET_ALL_REQUEST, POST_GET_ALL_SUCCESS, POST_GET_ALL_FAILURE, POST_GET_DETAIL_SUCCESS, POST_GET_DETAIL_FAILURE, POST_GET_DETAIL_REQUEST } from "../types";

const config = {
    headers: {
        "Content-Type" : "application/json",
    }
};

// GET POST ALL
const postGetAllAPI = (req) => {
    return axios.get("/api/post", { params: req }, config);
};

function* postGetAll(action) {
    try {
        const result = yield call(postGetAllAPI, action.payload);

        yield put({
            type: POST_GET_ALL_SUCCESS,
            payload: result.data.response,
        });
    } catch(e) {
        console.error(e);
        yield put({
            type: POST_GET_ALL_FAILURE,
            payload: e.response,
        });
    }
};

function* watchPostGetAll() {
    yield takeEvery(POST_GET_ALL_REQUEST, postGetAll);
};

// POST SAVE
const postSaveAPI = (req) => {
    const config = {
        headers: {
            "Content-Type" : "application/json",
        },
    };

    const token = localStorage.getItem("token");

    if(token) {
        config.headers["X-AUTH-TOKEN"] = token;
    };

    return axios.post("/api/post", req, config);
};

function* postSave(action) {
    try {
        const result = yield call(postSaveAPI, action.payload);

        yield put({
            type: POST_SAVE_SUCCESS,
            payload: result.data.response,
        });

        yield put(push(`/post/${result.data.response}`));
    } catch(e) {
        console.error(e);
        yield put({
            type: POST_SAVE_FAILURE,
            payload: e.response,
        });
    }
};

function* watchPostSave() {
    yield takeEvery(POST_SAVE_REQUEST, postSave);
};

// POST GET DETAIL
const postGetAPI = (req) => {
    return axios.get(`/api/post/${req}`, config);
};

function* postGet(action) {
    try {
        const result = yield call(postGetAPI, action.payload);

        yield put({
            type: POST_GET_DETAIL_SUCCESS,
            payload: result.data.response,
        });
    } catch(e) {
        console.error(e);

        yield put({
            type: POST_GET_DETAIL_FAILURE,
            payload: e.response,
        });
    }
};

function* watchPostGet() {
    yield takeEvery(POST_GET_DETAIL_REQUEST, postGet);
};

export default function* postSaga() {
    yield all([
        fork(watchPostSave),
        fork(watchPostGetAll),
        fork(watchPostGet),
    ]);
};