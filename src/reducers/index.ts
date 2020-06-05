import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";

const rootReducer = combineReducers({
    authState: authReducer,
    stores: storeReducer
});

export default rootReducer;
