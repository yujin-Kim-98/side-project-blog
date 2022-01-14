import { POST_SAVE_FAILURE, POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_GET_ALL_REQUEST, POST_GET_ALL_SUCCESS, POST_GET_ALL_FAILURE } from "../types";

const initialState = {
    id: null,
    title: "",
    content: "",
    creator: "",
    created: null,
    isModal: false,
    errorMsg: "",
    items: [],
    page: 0,
    count: 0,
    size: 0,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_GET_ALL_REQUEST:
            return {
                ...state,
                page: action.payload.page,
            };
        case POST_GET_ALL_SUCCESS:
            return {
                ...state,
                items: action.payload.posts,
                hasNext: action.payload.hasNext,
                page: action.payload.page + 1,
                count: action.payload.count,
                size: action.payload.size,
            }
        case POST_GET_ALL_FAILURE:
            return {
                ...state,
            }

        case POST_SAVE_REQUEST:
            return {
                ...state,
            };
        case POST_SAVE_SUCCESS:
            return {
                isModal: false,
                errorMsg: "",
            };
        case POST_SAVE_FAILURE:
            return {
                isModal: true,
                errorMsg: "",
            };
        default:
            return state;
    }
};

export default postReducer;