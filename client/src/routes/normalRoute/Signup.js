import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { SIGNUP_REQUEST } from "../../redux/types";
import { useForm } from "react-hook-form";
import ErrorModal from "../../components/ErrorModal";

const Signup = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isModal } = useSelector((state) => state.user);
    const { errorMsg } = useSelector((state) => state.user);

    const onSubmit = (data) => {
        const {email, name, password} = data;
        const member = {email, name, password};

        dispatch({
            type: SIGNUP_REQUEST,
            payload: member,
        });
    };

    return (
        <Fragment>
            <section className="about">
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormGroup>
                        <Label for="email">
                            email
                        </Label>
                        <input
                            className={errors.email ? "is-invalid form-control" : "form-control"}
                            placeholder="email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "이메일을 입력해주세요",
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "이메일을 형식에 맞추어 입력해주세요",
                                }
                            })}
                        />
                        {errors.email && (<span className="invalid-feedback">{errors.email.message}</span>)}
                    </FormGroup>

                    <FormGroup>
                        <Label for="name">
                            name
                        </Label>
                        <input
                            className={errors.name ? "is-invalid form-control" : "form-control"}
                            placeholder="name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "이름을 입력해주세요"
                                }
                            })}
                        />
                        {errors.name && (<span className="invalid-feedback">{errors.name.message}</span>)}
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">
                            password
                        </Label>
                        <input
                            className={errors.password ? "is-invalid form-control" : "form-control"}
                            placeholder="password"
                            type="password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "비밀번호를 입력해주세요"
                                }
                            })}
                        />
                        {errors.password && (<span className="invalid-feedback">{errors.password.message}</span>)}
                    </FormGroup>
                    <Button
                        outline
                        color="success"
                        className="btn-right"
                    >
                        회원가입
                    </Button>
                </Form>
                {isModal ? <ErrorModal isModal={isModal} errorMsg={errorMsg}></ErrorModal> : null}
            </section>
        </Fragment >
    )
};

export default Signup;
