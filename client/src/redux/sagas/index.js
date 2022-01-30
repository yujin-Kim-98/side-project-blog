import { all, fork } from '@redux-saga/core/effects';
import axios from 'axios';
import dotenv from 'dotenv';
import postSaga from './postSaga';
import userSaga from './userSaga';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
};
