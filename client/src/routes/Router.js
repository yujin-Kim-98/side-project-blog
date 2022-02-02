import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "reactstrap";
import MainList from "./normalRoute/MainList";
import Login from "./normalRoute/Login";
import Signup from "./normalRoute/Signup";
import NewPost from "./normalRoute/NewPost";
import PostDetail from "./normalRoute/PostDetail";
import EditPost from "./normalRoute/EditPost";

const MyRouter = () => {
    return (
        <Fragment>
                <div id="wrap">
                    {/* 헤더 */}
                    <Header />
                    {/* 메인 */}
                    <Container id="main-body">
                        <Switch>
                            <Route exact path="/" component={MainList} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/newpost" component={NewPost} />
                            <Route exact path="/post/:id" component={PostDetail} />
                            <Route exact path="/editpost/:id" component={EditPost} />
                        </Switch>
                    </Container>
                    {/* 푸터 */}
                    <Footer />
                </div>
        </Fragment>
    )
};

export default MyRouter;
