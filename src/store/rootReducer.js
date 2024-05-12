// rootReducer.js
import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  common:commonReducer
});

export default rootReducer;
