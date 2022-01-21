import React, { Fragment, useEffect, useState, useReducer } from "react";
import { FormGroup, Form, Label, Col, Input, FormText, Button } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";
import { POST_SAVE_REQUEST, S3_UPLOAD_REQUEST } from "../../redux/types";
import fileSaga from "../../redux/sagas/fileSaga";
import postReducer from "../../redux/reducers/postReducer";

const NewPost = () => {
    const dispatch = useDispatch();

    const { addFile } = useSelector((state) => state.file);

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const { title, file } = data;
        const content = editorToHtml;

        const post = {title, content, addFile};

        dispatch({
            type: POST_SAVE_REQUEST,
            payload: post,
        });
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const fileOnChange = (e) => {
        const file = {
            data: e.target.files[0], 
            fileType: "ATTACHMENT",
        };

        dispatch({
            type: S3_UPLOAD_REQUEST,
            payload: file,
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
                            wrapperClassName="editor-wrapper-class"
                            editorClassName="editor"
                            onEditorStateChange={onEditorStateChange}
                            editorState={editorState}
                            localization={{
                                locale: 'ko',
                            }}
                        >
                        </Editor>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="exampleFile"
                            sm={2}
                        >
                            File
                        </Label>
                        <Col sm={10}>
                            <input
                                className="form-control"
                                type="file"
                                onChange={fileOnChange}
                            />
                        </Col>
                    </FormGroup>

                    <Button
                        color="success"
                        outline
                        className="btn-right"
                    >
                        작성
                    </Button>
                </Form>
            </section>
        </Fragment>
    )
};

export default NewPost;
