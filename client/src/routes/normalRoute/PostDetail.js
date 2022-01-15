import React, {Fragment, useEffect} from "react";
import {Card, CardBody, CardTitle, CardText, Button} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST_GET_DETAIL_REQUEST } from "../../redux/types";

const PostDetail = (req) => {
    const { id, title, content, creator, created } = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POST_GET_DETAIL_REQUEST,
            payload: req.match.params.id,
        });
    }, [dispatch]);

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <h1>{title}</h1>
                </div>
                <div>
                    <Card>
                        {/* <img
                            alt="Card image cap"
                            src="https://picsum.photos/318/180"
                            width="100%"
                        /> */}
                        <CardBody>
                            <CardText>
                                {content}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="detail-btn-area">
                    <Button
                        outline
                    >
                        수정
                    </Button>

                    <Button
                        outline
                        color="danger"
                    >
                        삭제
                    </Button>
                </div>
            </section>
        </Fragment>
    )
};

export default PostDetail;
