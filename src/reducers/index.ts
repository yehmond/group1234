import { combineReducers } from "redux";
import authReducer from "./authReducer";
import writeStoreReducer from "./writeStoreReducer";

const rootReducer = combineReducers({
    authState: authReducer,
    stores: writeStoreReducer,
});

export default rootReducer;
