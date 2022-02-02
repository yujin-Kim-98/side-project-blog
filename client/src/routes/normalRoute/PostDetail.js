import { put } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import React, {Fragment, useEffect} from "react";
import {Card, CardBody, CardText, Button} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST_DELETE_REQUEST, POST_GET_DETAIL_REQUEST } from "../../redux/types";
import { Link } from "react-router-dom";

const PostDetail = (req) => {
    const { id, title, content, creator, created } = useSelector((state) => state.post);
    const { isAuthenticated, role } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POST_GET_DETAIL_REQUEST,
            payload: req.match.params.id,
        });
    }, [dispatch]);

    const postDelete = () => {
        if(window.confirm('선택한 글을 삭제하시겠습니까?')) {
            dispatch({
                type: POST_DELETE_REQUEST,
                payload: id,
            });
        }
    };

    const masterRoleBtn = (
        <Fragment>
            <div className="detail-btn-area">
                <Link
                    to={`/editpost/${id}`}
                >
                    <Button
                        outline
                    >
                        수정
                    </Button>
                </Link>

                <Button
                    outline
                    color="danger"
                    onClick={postDelete}
                >
                    삭제
                </Button>
                </div>
        </Fragment>
    );

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <h1>{title}</h1>
                </div>
                <div>
                    <Card>
                        <CardBody>
                            <CardText>
                                <div dangerouslySetInnerHTML={{__html: content}}></div>
                            </CardText>
                        </CardBody>
                    </Card>
                { role === 'MASTER' && masterRoleBtn }
                </div>
            </section>
        </Fragment>
    )
};

export default PostDetail;
