import { SET_GLOBAL_DISABLE, SET_IS_UPDATE } from "./types";

const initialState = {
    isGlobalDisable : false,
    isUpdate : false,
  };

  const commonReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_GLOBAL_DISABLE:
        return {
          ...state,
          isGlobalDisable: action.payload,
        };
        case SET_IS_UPDATE:
          return {
            ...state,
            isUpdate: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default commonReducer;