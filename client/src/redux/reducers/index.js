import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        post: postReducer,
    });

export default createRootReducer;
