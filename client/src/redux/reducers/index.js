import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import fileReducer from "./fileReducer";

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        post: postReducer,
        file: fileReducer,
    });

export default createRootReducer;
