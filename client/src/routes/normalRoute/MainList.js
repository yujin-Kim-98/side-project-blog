import React, {Fragment, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_GET_ALL_REQUEST } from "../../redux/types";
import Paging from "../../components/Paging";

const MainList = () => {
    const { items, count, page, size } = useSelector((state) => state.post);

    const dispatch = useDispatch();
    
    const param = {
        page: page,
    };

    const postGetAllAPICall = () => {
        dispatch({
            type: POST_GET_ALL_REQUEST,
            payload: param,
        });
    };

    useEffect(() => {
        postGetAllAPICall();
    }, [dispatch]);

    const nextPage = (current, pageSize) => {
        param.page = current - 1;
        postGetAllAPICall();
    };

    return (
        <Fragment>
            <section className="about">
                <div className="title en">
                    <p>게시글</p>
                </div>
                <div>
                    <Paging 
                        items={items}
                        total={count} 
                        size={size} 
                        current={page} 
                        nextPage={nextPage}
                    />
                </div>
            </section>
        </Fragment>
    )
};

export default MainList;
