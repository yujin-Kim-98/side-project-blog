import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS } from "../types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    email: "",
    name: "",
    role: "",
    errorMsg: "",
    successMsg: "",
    isModal: false,
    isLoading: false,
};

// ERROR CODE
const userErrorCode = [
    { code: "MEMBER-0001", message: "존재하지 않는 회원입니다" },
    { code: "MEMBER-0002", message: "이미 존재하는 이메일입니다" },
];

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.accessToken);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                email: action.payload.member.email,
                name: action.payload.member.name,
                role: action.payload.member.role,
                isModal: false,
                errorMsg: "",
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                ...action.payload,
                isModal: true,
                errorMsg: userErrorCode.find(error => error.code === action.payload.data.code).message,
            };


        case LOGOUT_REQUEST:
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                email: "",
                name: "",
                role: "",
                isModal: false,
                errorMsg: "",
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isModal: true,
                errorMsg: "로그아웃이 실패했습니다",
            };


        case SIGNUP_REQUEST:
            return {
                ...state,
            };
        // case SIGNUP_SUCCESS:
        //     return {

        //     };
        case SIGNUP_FAILURE:
            return {
                ...state,
                ...action.payload,
                isModal: true,
                errorMsg: userErrorCode.find(error => error.code === action.payload.data.code).message,
            };

        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.payload.response === null ? false : true,
                isLoading: false,
                email: action.payload.email,
                name: action.payload.name,
                role: action.payload.role,
                isModal: false,
                errorMsg: "",
            };
        case USER_LOADING_FAILURE:
            return {
                ...state,
                email: "",
                name: "",
                role: "",
                isAuthenticated: false,
                isLoading: false,
            };

        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
            };
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: "",
                isModal: false,
            };
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: "Clear Error",
                isModal: true,
            };
        default:
            return state;
    }
};

export default userReducer;
