import { SET_MODAL_TYPE } from "./types";

export const setModalType = (modalType) => ({
  type: SET_MODAL_TYPE,
  payload: modalType,
});
