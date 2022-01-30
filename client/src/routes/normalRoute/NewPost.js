import React, { Fragment, useState } from "react";
import { FormGroup, Form, Label, Col, Button } from "reactstrap";
import { put } from "@redux-saga/core/effects";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { POST_SAVE_REQUEST, S3_UPLOAD_FAILURE, S3_UPLOAD_REQUEST, S3_UPLOAD_SUCCESS } from "../../redux/types";
import ProgressBar from "../../components/ProgressBar";

import { Editor } from '@tinymce/tinymce-react';
import { createHashHistory } from "history";
import axios from "axios";



const NewPost = () => {
    const dispatch = useDispatch();

    const [ content, setContent ] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { title } = data;

        const post = { title, content };

        dispatch({
            type: POST_SAVE_REQUEST,
            payload: post,
        });
    };

    const images_upload_handler = (blob, success, fail) => {
        const file = {
            data: blob.blob(),
            fileType: 'EDITOR',
        };

        const formData = new FormData();
        formData.append('file', file.data);
        formData.append('fileType', file.fileType);

        axios.post('/api/file/s3-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-AUTH-TOKEN': localStorage.getItem('token'),
            }
        })
        .then(result => {
            success(result.data.response.fileUrl);

            dispatch({
                type: S3_UPLOAD_SUCCESS,
                payload: result.data.response,
            });
        })
        .catch(e => {
            console.error(e.response);

            dispatch({
                type: S3_UPLOAD_FAILURE,
                payload: e.response,
            });
        });
    };

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>New Post</p>
                </div>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormGroup row>
                        <Label
                            for="title"
                            sm={2}
                        >
                            TITLE
                        </Label>
                        <Col sm={10}>
                            <input
                                className="form-control"
                                {...register("title", {
                                    required: true,
                                    message: "제목을 입력해주세요",
                                })}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Editor
                            init={{
                                menubar: false,
                                height: 550,
                                language: 'ko_KR',
                                plugins: 'emoticons image',
                                toolbar: 'formatselect | fontselect | fontsizeselect | bold italic image emoticons backcolor | alignleft aligncenter alignright alignjustify',
                                image_caption: true,
                                images_upload_handler,
                                images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp,png',


                                // images_upload_handler: function (blobInfo, success, failure) {
                                //     var xhr, formData;
                                //     xhr = new XMLHttpRequest();
                                //     xhr.withCredentials = false;
                                //     xhr.open('POST', 'postAcceptor.php');
                                //     xhr.onload = function() {
                                //       var json;
                                
                                //       if (xhr.status != 200) {
                                //         failure('HTTP Error: ' + xhr.status);
                                //         return;
                                //       }
                                //       json = JSON.parse(xhr.responseText);
                                
                                //       if (!json || typeof json.location != 'string') {
                                //         failure('Invalid JSON: ' + xhr.responseText);
                                //         return;
                                //       }
                                //       success(json.location);
                                //     };
                                //     formData = new FormData();
                                //     formData.append('file', blobInfo.blob(), blobInfo.filename());
                                //     xhr.send(formData);
                                //   }
                            }}
                            onChange={(e) => {
                                setContent(e.target.getContent());
                            }}
                        />
                    </FormGroup>

                    <Button
                        color="success"
                        outline
                        className="btn-right"
                    >
                        작성
                    </Button>
                </Form>
                {/* {isUploadLoading ? <ProgressBar/> : null} */}
            </section>
        </Fragment>
    )
};

export default NewPost;
