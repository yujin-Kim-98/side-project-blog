import React, { Fragment, useState } from "react";
import { FormGroup, Form, Label, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { POST_SAVE_REQUEST } from "../../redux/types";
import PostEditor from "../../components/post/PostEditor";
import ErrorModal from "../../components/ErrorModal";

const NewPost = () => {
    const dispatch = useDispatch();

    // const { isModal, errorMsg } = useSelector((state) => state.error)

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
                        <PostEditor 
                            setContent={setContent}
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
                <ErrorModal/>
            </section>
        </Fragment>
    )
};

export default NewPost;
