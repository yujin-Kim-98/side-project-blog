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
    isUploadLoading: false,
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case S3_UPLOAD_REQUEST:
            return {
                ...state,
                isUploadLoading: true,
            };
        case S3_UPLOAD_SUCCESS:
            return {
                ...state,
                addFile: [...state.addFile, action.payload],
                isUploadLoading: false,
                isModal: false,
                errorMsg: "",
            };
        case S3_UPLOAD_FAILURE:
            return {
                ...state,
                isUploadLoading: false,
            };

        default:
            return state;
    };
};

export default fileReducer;