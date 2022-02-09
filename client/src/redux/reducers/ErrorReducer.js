import { ErrorCode } from "../../common/ErrorCode";
import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, SET_ERROR_REQUEST } from "../types";

const initialState = {
    isModal: false,
    errorMsg: '',
    directLink: '',
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
            }

        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                isModal: false,
                errorMsg: '',
            }

        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                isModal: true,
                errorMsg: '관리자에게 문의해주세요',
            }

        case SET_ERROR_REQUEST:
            return {
                ...state,
                isModal: true,
                errorMsg: ErrorCode.find(error => error.code === action.payload.data.code).message,
                directLink: ErrorCode.find(error => error.code === action.payload.data.code).directLink,
            }

        default:
            return state
    }
};

export default errorReducer