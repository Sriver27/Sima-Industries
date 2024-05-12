import { SET_IS_MODAL_OPEN, SET_MODAL_TYPE, SET_CATEGORIES, SET_GLOBAL_DISABLE, SET_IS_UPDATE } from "./types";

export const setModalType = (modalType) => ({
  type: SET_MODAL_TYPE,
  payload: modalType,
});

export const setModalOpen = (isOpen) => ({
  type: SET_IS_MODAL_OPEN,
  payload: isOpen,
});

export const setCategoriesList = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setIsGlobalDisabled = (isGlobalDisabled) => ({
  type: SET_GLOBAL_DISABLE,
  payload: isGlobalDisabled,
});

export const setIsUpdateProduct = (val) => ({
  type: SET_IS_UPDATE,
  payload: val,
});