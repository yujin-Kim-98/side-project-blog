import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import errorReducer from "./ErrorReducer";

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        post: postReducer,
        error: errorReducer,
    });

export default createRootReducer;
