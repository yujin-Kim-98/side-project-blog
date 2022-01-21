import { all, call, put, takeEvery, fork } from "@redux-saga/core/effects";
import axios from "axios";
import { S3_UPLOAD_FAILURE, S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS } from "../types";

const config = {
    headers: {
        // "Content-Type" : "application/json",
        "Content-Type" : "multipart/form-data",
    }
};

// S3 UPLOAD
const s3UploadAPI = (req) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers["X-AUTH-TOKEN"] = token;
    }

    return axios.post("/api/file/s3-upload", req, config);
};

function* s3Upload(action) {
    try {
        const formData = new FormData();
        formData.append('file', action.payload.data);
        formData.append('fileType', action.payload.fileType);

        console.log(action.payload.fileType);

        const result = yield call(s3UploadAPI, formData);

        yield put({
            type: S3_UPLOAD_SUCCESS,
            payload: result.data.response,
        });

        // const formData = new FormData();
        // formData.append("multipartFile", action.payload);

        // const result = yield call(s3UploadAPI, formData);

        // yield put({
        //     type: S3_UPLOAD_SUCCESS,
        //     payload: result.data.response,
        // });
    } catch(e) {
        console.error(e);

        yield put({
            type: S3_UPLOAD_FAILURE,
            payload: e.response,
        });
    }
};

function* watchS3Upload() {
    yield takeEvery(S3_UPLOAD_REQUEST, s3Upload);
};

// FILE SAVE
const fileSaveAPI = (req) => {
    return axios.post("/api/file", req, config);
};

function* fileSave(action) {
    try {
        const result = yield call(fileSaveAPI, action.payload);

        console.log(result, "file save success response");

        // yield put({
        //     type: FILE_SAVE_SUCCESS,
        //     payload: result.data.response,
        // });
    } catch(e) {
        console.error(e);

        // yield put({
        //     type: FILE_SAVE_FAILURE,
        //     payload: e.response,
        // });
    }
};

function* watchFileSave() {
    // yield takeEvery(FILE_SAVE_REQUEST, fileSave);
};

export default function* fileSaga() {
    yield all([
        fork(watchS3Upload),
    ]);
};