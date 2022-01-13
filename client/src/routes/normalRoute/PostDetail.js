import React, {Fragment} from "react";
import {Card, CardBody, CardTitle, CardText, Button} from "reactstrap";

const PostDetail = () => {
    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>spring boot + react side project</p>
                </div>
                <div>
                    <Card>
                        <img
                            alt="Card image cap"
                            src="https://picsum.photos/318/180"
                            width="100%"
                        />
                        <CardBody>
                            <CardText>
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content.
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
