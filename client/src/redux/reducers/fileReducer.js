import { S3_UPLOAD_FAILURE, S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS } from "../types";

const initialState = {
    id: "",
    parentId: "",
    originFileName: "",
    creator: "",
    created: null,
    addFile: [],
    isModal: false,
    errorMsg: "",
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case S3_UPLOAD_REQUEST:
            return {
                ...state,
            };
        case S3_UPLOAD_SUCCESS:
            return {
                ...state,
                addFile: [...state.addFile, action.payload],
                isModal: false,
                errorMsg: "",
            };
        case S3_UPLOAD_FAILURE:
            return {
                ...state,
            };

        default:
            return state;
    };
};

export default fileReducer;