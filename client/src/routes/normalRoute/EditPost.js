import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import PostEditor from "../../components/post/PostEditor";
import { POST_EDIT_REQUEST, POST_GET_DETAIL_REQUEST } from "../../redux/types";

const EditPost = (req) => {
    const dispatch = useDispatch();

    const { id, title, content } = useSelector((state) => state.post);

    const [ editContent, setEditContent ] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch({
            type: POST_GET_DETAIL_REQUEST,
            payload: req.match.params.id,
        })
    }, [dispatch]);

    const onSubmit = (data) => {
        const { title } = data;

        const post = { id, title, 'content': editContent };

        dispatch({
            type: POST_EDIT_REQUEST,
            payload: post,
        });
    };

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>Edit Post</p>
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
                                defaultValue={title}
                                {...register("title", {
                                    required: true,
                                    message: "제목을 입력해주세요"
                                })}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <PostEditor
                            content={content}
                            setContent={setEditContent}
                        />
                    </FormGroup>

                    <Button
                        color="success"
                        outline
                        className="btn-right"
                    >
                        수정
                    </Button>
                </Form>
            </section>
        </Fragment>
    )
};

export default EditPost;