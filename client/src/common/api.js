import axios from 'axios'
import { JWT_REISSUE_REQUEST, POST_GET_ALL_SUCCESS, USER_LOADING_REQUEST } from '../redux/types'
import store from '../store'
import { ErrorCode } from './ErrorCode'
import jwt from 'jwt-decode'
import moment from 'moment'

export const pathList = {
    getPostAll: { path: '/api/post', type: POST_GET_ALL_SUCCESS },
    userLoading: { path: '/api/auth', type: USER_LOADING_REQUEST }
}

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token')

    if(token) {
        config.headers.Authorization = process.env.REACT_APP_TOKEN_PREFIX + ' ' + token
    }

    return config;
})

axios.interceptors.response.use(
    success => success,
    async(error) => {
        const errorCode = error.response.data.code

        if(errorCode === 'TOKEN-0001') {
            const originRequest = error.config

            await axios.post('/api/auth/reissue')
            .then(result => {
                localStorage.setItem('token', result.data.response.accessToken)
                window.location.reload()
            })
            .catch(error => {
                localStorage.removeItem('token')
            })
            return Promise.reject(error)
        }
    }
)
