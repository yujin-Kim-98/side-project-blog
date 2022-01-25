import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { LOGOUT_REQUEST } from "../redux/types";

const Header = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, role } = useSelector((state) => state.user);

    const logout = () => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    };

    const guestBtn = (
        <Fragment>
            <li>
                <Link to="/login">
                    <Button 
                        outline
                    >
                        로그인
                    </Button>
                </Link>
            </li>
            <li>
                <Link to="/signup">
                    <Button 
                        outline
                    >
                        회원가입
                    </Button>
                </Link>
            </li>
        </Fragment>
    );

    const masterRoleBtn = (
        <Fragment>
            <li>
                <Link to="/newpost">
                    <Button
                        outline
                        color="success"
                    >
                        글쓰기
                    </Button>
                </Link>
            </li>
        </Fragment>
    );

    const authBtn = (
        <Fragment>
            {role === 'MASTER' ? masterRoleBtn : null}
            <li>
                <Button
                    outline
                    color="danger"
                    onClick={logout}
                >
                    로그아웃
                </Button>
            </li>
        </Fragment>
    );

    

    return (
        <Fragment>
            <header>
                <div className="innerHeader">
                    <nav className="gnb">
                        <Link to="/">
                            <h2 className="logo">YUJIN BLOG</h2>
                        </Link>
                    </nav>
                    <nav className="tnb">
                        <ul>
                            {!isAuthenticated ? guestBtn : authBtn}
                        </ul>
                    </nav>
                </div>
            </header>
        </Fragment>
    )
};

export default Header;
