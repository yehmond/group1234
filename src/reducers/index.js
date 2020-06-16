import { combineReducers } from "redux";
import authReducer from "./authReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
    authState: authReducer,
    filterState: filterReducer,
});
