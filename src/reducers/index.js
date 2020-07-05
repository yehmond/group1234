import { combineReducers } from "redux";
import authReducer from "./authReducer";
import filterReducer from "./filterReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    authState: authReducer,
    filterState: filterReducer,
    searchState: searchReducer,
});
