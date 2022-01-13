import { POST_SAVE_FAILURE, POST_SAVE_REQUEST, POST_SAVE_SUCCESS, POST_GET_ALL_REQUEST, POST_GET_ALL_SUCCESS, POST_GET_ALL_FAILURE } from "../types";

const initialState = {
    id: null,
    title: "",
    content: "",
    creator: "",
    created: null,
    isModal: false,
    errorMsg: "",
    posts: [],
    hasPrevious: false,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_GET_ALL_REQUEST:
            return {
                ...state,
            };
        case POST_GET_ALL_SUCCESS:
            console.log(action.payload, "post get action payload");
            return {
                ...state,
                posts: action.payload.posts,
                hasPrevious: action.payload.hasPrevious,
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