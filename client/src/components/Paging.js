import React, { Fragment } from "react";
import Pagination from "rc-pagination";
import { Link } from "react-router-dom";
import { CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import  default_image  from "../assets/image/default_image.png";

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
                                <CardImg className="img-thumb" src={item.thumbnailUrl ? item.thumbnailUrl : default_image}/>
                                <CardBody className="wrap-content">
                                    <CardTitle 
                                        className="desc-title"
                                    >
                                        {item.title}
                                    </CardTitle>
                                    <CardText 
                                        className="desc-content"
                                    >
                                        {/* <div dangerouslySetInnerHTML={{__html: item.content}}></div> */}
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
