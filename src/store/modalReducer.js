// reducers.js
import { SET_MODAL_TYPE, SET_IS_MODAL_OPEN, SET_CATEGORIES } from "./types";

const initialState = {
  modalType: null,
  isModalOpen: false,
  categories:[]
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload,
      };
    case SET_IS_MODAL_OPEN:
      return {
       ...state,
        isModalOpen: action.payload,
      };
    case SET_CATEGORIES:
      return {
       ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
