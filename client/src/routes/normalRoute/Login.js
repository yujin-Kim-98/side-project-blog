import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { LOGIN_REQUEST } from "../../redux/types";
import ErrorModal from "../../components/ErrorModal";

const Login = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isModal } = useSelector((state) => state.user);
    const { errorMsg } = useSelector((state) => state.user);

    const onSubmit = (data) => {
        const { email, password } = data;
        const member = {email, password};

        dispatch({
            type: LOGIN_REQUEST,
            payload: member,
        })
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
                                }
                            })}
                        />
                        {errors.email && (<span className="invalid-feedback">{errors.email.message}</span>)}
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">
                            password
                        </Label>
                        <input
                            type="password"
                            className={errors.password ? "is-invalid form-control" : "form-control"}
                            placeholder="password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "비밀번호를 입력해주세요",
                                }
                            })}
                        />
                        {errors.password && (<span className="invalid-feedback">{errors.password.message}</span>)}
                    </FormGroup>
                    <Button
                        color="success"
                        outline
                        className="btn-right"
                    >
                        로그인
                    </Button>
                </Form>
                {isModal ? <ErrorModal isModal={isModal} errorMsg={errorMsg}></ErrorModal> : null}
            </section>
        </Fragment>
    )
};

export default Login;
