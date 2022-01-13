import React, {Fragment, useEffect} from "react";
// import {Link} from "react-router-dom";
import {CardImg, Button} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { POST_GET_ALL_REQUEST } from "../../redux/types";

const MainList = () => {
    const { posts, count, hasPrevious } = useSelector((state) => state.post);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POST_GET_ALL_REQUEST,
        });
    }, [dispatch]);

    const postList = Array.isArray(posts);

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>게시글</p>
                    {/* <p>{posts}</p> */}
                </div>
                <ul>

                    {/* <li>
                        <Link to="/post-detail">
                            <p className="img">
                                <CardImg
                                    src="../../assets/image/header.jpg"
                                >
                                </CardImg>
                            </p>
                            <div className="text">
                                <h3>회사소개</h3>
                                <p>삶의 가치를 높이는 기술기업, 한화케미칼</p>
                            </div>
                        </Link>
                    </li> */}

                </ul>
                <Button
                    className="btn-center"
                    outline

                >
                    더보기
                </Button>
            </section>
        </Fragment>
    )
};

export default MainList;
