// rootReducer.js
import { combineReducers } from "redux";
import modalReducer from "./reducer";

const rootReducer = combineReducers({
  modal: modalReducer,
});

export default rootReducer;
