import { S3_UPLOAD_FAILURE, S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS } from "../types";

const initialState = {
    id: "",
    parentId: "",
    fileName: "",
    creator: "",
    created: null,
    sortNum: 0,
    fileType: "",
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
            console.log(...state.fileType, "fileType");
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