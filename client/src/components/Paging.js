import React, { Fragment } from "react";
import Pagination from "rc-pagination";

const Paging = (props) => {
    const { items, total, current, size, nextPage } = props;

    return (
        <Fragment>
            <div className="section-list-type">
                <ul className="section-list">
                    { Array.isArray(items) ?
                    items.map((item) => 
                        <li className="section-item">
                            <a className="img-thumb">
                                <img src="sdgs"/>
                            </a>
                            <div className="wrap-content">
                                <strong className="desc-title">{item.title}</strong>
                                <p className="desc-content">{item.content}</p>
                            </div>
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
