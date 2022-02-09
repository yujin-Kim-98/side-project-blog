import { all, call, put, takeEvery, fork } from '@redux-saga/core/effects'
import axios from 'axios'
import postReducer from '../reducers/postReducer'
import { push } from 'connected-react-router'
import { POST_SAVE_FAILURE, POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_GET_ALL_REQUEST, POST_GET_ALL_SUCCESS, POST_GET_ALL_FAILURE, POST_GET_DETAIL_SUCCESS, POST_GET_DETAIL_FAILURE, POST_GET_DETAIL_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAILURE, POST_DELETE_REQUEST, S3_UPLOAD_SUCCESS, S3_UPLOAD_FAILURE, S3_UPLOAD_REQUEST, POST_EDIT_SUCCESS, POST_EDIT_FAILURE, POST_EDIT_REQUEST, SET_ERROR_REQUEST } from '../types'
import { getAPI, path } from '../../common/api'

// GET POST ALL
const postGetAllAPI = async (req) => {
    return await axios.get('/api/post', { params: req })
}

function* postGetAll(action) {
    try {
        const result = yield call(postGetAllAPI, action.payload)

        yield put({
            type: POST_GET_ALL_SUCCESS,
            payload: result.data.response,
        })
    } catch(e) {
        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchPostGetAll() {
    yield takeEvery(POST_GET_ALL_REQUEST, postGetAll)
}

// POST SAVE
const postSaveAPI = (req) => {
    return axios.post(`/api/post`, req)
}

function* postSave(action) {
    try {
        const result = yield call(postSaveAPI, action.payload)

        yield put({
            type: POST_SAVE_SUCCESS,
            payload: result.data.response,
        })

        yield put(push(`/post/${result.data.response}`))
    } catch(e) {
        console.error(e)
        
        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchPostSave() {
    yield takeEvery(POST_SAVE_REQUEST, postSave)
}

// POST GET DETAIL
const postGetAPI = (req) => {
    return axios.get(`/api/post/${req}`)
}

function* postGet(action) {
    try {
        const result = yield call(postGetAPI, action.payload)

        yield put({
            type: POST_GET_DETAIL_SUCCESS,
            payload: result.data.response,
        })
    } catch(e) {
        console.error(e)

        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchPostGet() {
    yield takeEvery(POST_GET_DETAIL_REQUEST, postGet)
}

// POST DELETE
const postDeleteAPI = (req) => {
    return axios.delete(`/api/post/${req}`)
}

function* postDelete(action) {
    try {
        yield call(postDeleteAPI, action.payload)

        yield put({
            type: POST_DELETE_SUCCESS,
        })

        yield put(push(`/`))
    } catch(e) {
        console.error(e)

        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchPostDelete() {
    yield takeEvery(POST_DELETE_REQUEST, postDelete)
}

// POST EDIT
const postEditAPI = (req) => {
    return axios.put(`/api/post/${req.id}`, req)
}

function* postEdit(action) {
    try {
        const result = yield call(postEditAPI, action.payload)

        yield put({
            type: POST_EDIT_SUCCESS,
            payload: result,
        })

        yield put(push(`/post/${result.data.response}`))
    } catch(e) {
        console.error(e)

        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchPostEdit() {
    yield takeEvery(POST_EDIT_REQUEST, postEdit)
}

export default function* postSaga() {
    yield all([
        fork(watchPostSave),
        fork(watchPostGetAll),
        fork(watchPostGet),
        fork(watchPostDelete),
        fork(watchPostEdit),
    ])
}