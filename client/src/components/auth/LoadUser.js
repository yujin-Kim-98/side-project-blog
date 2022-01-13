import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOADING_REQUEST } from "../../redux/types";
import store from "../../store";

const LoadUser = () => {
    // const dispatch = useDispatch();

    // const { email, name, role } = useSelector((state) => state.user);

    try {

        store.dispatch({
            type: USER_LOADING_REQUEST,
            payload: localStorage.getItem("token"),
        });
    } catch(e) {
        console.error(e);
    }
};

export default LoadUser;