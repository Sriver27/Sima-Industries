// reducers.js
import { SET_MODAL_TYPE } from "./types";

const initialState = {
  modalType: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
