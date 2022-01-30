import { POST_SAVE_FAILURE, POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_GET_ALL_REQUEST, POST_GET_ALL_SUCCESS, POST_GET_ALL_FAILURE, POST_GET_DETAIL_REQUEST, POST_GET_DETAIL_SUCCESS, POST_GET_DETAIL_FAILURE, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAILURE, S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS, S3_UPLOAD_FAILURE } from "../types";

const initialState = {
    id: "",
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
    files: null,


    // test
    addFile: [],
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
                page: action.payload.page,
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
                ...state,
                id: action.payload,
                isModal: false,
                errorMsg: "",
            };
        case POST_SAVE_FAILURE:
            return {
                ...state,
                isModal: true,
                errorMsg: "",
            };

        case POST_GET_DETAIL_REQUEST:
            return {
                ...state,
            };
        case POST_GET_DETAIL_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                creator: action.payload.creator,
                created: action.payload.created,
            };
        case POST_GET_DETAIL_FAILURE:
            return {
                ...state,
            };

        case POST_DELETE_REQUEST:
            return {
                ...state,
            };
        case POST_DELETE_SUCCESS:
            return {
                ...state,
            }
        case POST_DELETE_FAILURE:
            return {
                ...state,
            }

        // FILE UPLOAD
        case S3_UPLOAD_REQUEST:
            return {
                ...state,
            };
        case S3_UPLOAD_SUCCESS:
            return {
                ...state,
            };
        case S3_UPLOAD_FAILURE:
            return {
                ...state,
                isModal: true,
                errorMsg: '에러 처리 필요',
            };



        default:
            return state;
    }
};

export default postReducer;