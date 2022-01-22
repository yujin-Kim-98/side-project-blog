import React, { Fragment, useState } from "react";
import { FormGroup, Form, Label, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";
import { POST_SAVE_REQUEST } from "../../redux/types";
import Attachment from "../../components/post/Attachment";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import ProgressBar from "../../components/ProgressBar";

const NewPost = () => {
    const dispatch = useDispatch();

    const { addFile, isUploadLoading } = useSelector((state) => state.file);

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

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>New Post{isUploadLoading}</p>
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

                    <Attachment />

                    <Button
                        color="success"
                        outline
                        className="btn-right"
                    >
                        작성
                    </Button>
                </Form>
                {isUploadLoading ? <ProgressBar/> : null}
            </section>
        </Fragment>
    )
};

export default NewPost;
