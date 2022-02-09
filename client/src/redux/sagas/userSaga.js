import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { JWT_REISSUE_FAILURE, JWT_REISSUE_REQUEST, JWT_REISSUE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SET_ERROR_REQUEST, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS } from '../types'
import { push } from 'connected-react-router'

// SIGNUP
const signupUserAPI = (req) => {
    return axios.post('/api/user/signup', req)
}

function* signupUser(action) {
    try {
        const result = yield call(signupUserAPI, action.payload)

        yield put({
            type: SIGNUP_SUCCESS,
            payload: result.data,
        })

        yield put(push('/login'))
    } catch (e) {
        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchSignupUser() {
    yield takeEvery(SIGNUP_REQUEST, signupUser)
}

// LOGIN
const loginUserAPI = (req) => {
    return axios.post('/api/user/signin', req)
}

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload)

        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data.response,
        })

        yield put(push('/'))
    } catch(e) {
        yield put({
            type: SET_ERROR_REQUEST,
            payload: e.response,
        })
    }
}

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

// LOGOUT
function* logoutUser() {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        })

        yield put(push('/'))
    } catch(e) {
        console.error(e)
        yield put({
            type: LOGOUT_FAILURE,
            payload: e.response,
        })
    }
}

function* watchLogoutUser() {
    yield takeEvery(LOGOUT_REQUEST, logoutUser)
}

// USER LOADING
const userLoadingAPI = async (token) => {
    return await axios.get('/api/auth')
}

function* userLoading(action) {
    try {
        const result = yield call(userLoadingAPI, action.payload)

        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data.response,
        })
    } catch(e) {
        console.error(e)
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        })
    }
}

function* watchUserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading)
}

// JWT TOKEN REISSUE
const jwtTokenReissueAPI = () => {
    return axios.post('/api/auth/reissue')
}

function* jwtTokenReissue(action) {
    try {
        const result = yield call(jwtTokenReissueAPI, action.payload)

        yield put({
            type: JWT_REISSUE_SUCCESS,
            payload: result.data.resposne,
        })
    } catch(e) {
        yield put({
            type: JWT_REISSUE_FAILURE,
            payload: e.response,
        })
        localStorage.removeItem('token')
    }
}

function* watchJwtTokenReissue() {
    yield takeEvery(JWT_REISSUE_REQUEST, jwtTokenReissue)
}

export default function* userSaga() {
    yield all([
        fork(watchSignupUser),
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchUserLoading),
        fork(watchJwtTokenReissue),
    ])
}
