import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, JWT_REISSUE_REQUEST, JWT_REISSUE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS } from "../types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    email: "",
    name: "",
    role: "",
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
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                ...action.payload,
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
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
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

        case JWT_REISSUE_REQUEST:
            return {
                ...state,
            }
        case JWT_REISSUE_SUCCESS:
            localStorage.setItem('token', action.payload.accessToken)
            return {
                ...state,
            }

        default:
            return state;
    }
};

export default userReducer;
