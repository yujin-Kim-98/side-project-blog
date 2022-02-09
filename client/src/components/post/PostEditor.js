import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { S3_UPLOAD_FAILURE, S3_UPLOAD_SUCCESS } from "../../redux/types";
import { ErrorCode } from "../../common/ErrorCode";

const PostEditor = (props) => {
    const dispatch = useDispatch();

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    const images_upload_handler = (blob, success, fail) => {
        const file = {
            data: blob.blob(),
        };

        const formData = new FormData();
        formData.append('file', file.data);

        const token = localStorage.getItem("token");

        if(token) {
            config.headers['X-AUTH-TOKEN'] = token;
        }

        axios.post('/api/file/s3-upload', formData, config)
        .then(result => {
            success(result.data.response.fileUrl);

            dispatch({
                type: S3_UPLOAD_SUCCESS,
                payload: result.data.response,
            });
        })
        .catch(e => {
            fail(ErrorCode.find(error => error.code === e.response.data.code).message);
        });
    };

    return (
        <Fragment>
            <Editor
                init={{
                    menubar: false,
                    height: 550,
                    language: 'ko_KR',
                    plugins: 'emoticons image imagetools',
                    toolbar: 'formatselect | fontselect | fontsizeselect | bold italic image emoticons backcolor | alignleft aligncenter alignright alignjustify',
                    image_caption: true,
                    images_upload_handler,
                    images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp,png',
                    imagetools_toolbar: 'editimage',
                    init_instance_callback: function(editor) {
                        editor.setContent(props.content);
                    },
                }}
                onChange={(e) => {
                    props.setContent(e.target.getContent());
                }}
            />
        </Fragment>
    );
};

export default PostEditor;