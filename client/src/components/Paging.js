import React, { Fragment } from "react";
import Pagination from "rc-pagination";
import { Link } from "react-router-dom";
import { CardBody, CardImg, CardText, CardTitle } from "reactstrap";

const Paging = (props) => {
    const { items, total, current, size, nextPage } = props;

    return (
        <Fragment>
            <div className="section-list-type">
                <ul className="section-list">
                    { Array.isArray(items) ?
                    items.map((item) => 
                        <li className="section-item">
                            <Link to={`/post/${item.id}`}>
                                <CardImg className="img-thumb"/>
                                <CardBody className="wrap-content">
                                    <CardTitle 
                                        className="desc-title"
                                    >
                                        {item.title}
                                    </CardTitle>
                                    <CardText 
                                        className="desc-content"
                                    >
                                        {item.content}
                                    </CardText>
                                </CardBody>
                            </Link>
                        </li>
                    ) :
                    "" }
                </ul>
            </div>
            <Pagination 
                total={total} 
                current={current} 
                pageSize={size}
                onChange={nextPage}
            />
        </Fragment>
    );
};

export default Paging;
