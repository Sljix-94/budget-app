import * as actionTypes from "./actionTypes";

export const addMoneyToActionsArr = (obj) => {
  return {
    type: actionTypes.ADD_MONEY_TO_ACTIONS_ARR,
    objInfo: obj,
  };
};
export const takeOfMoney = (obj) => {
  return {
    type: actionTypes.TAKE_OF_MONEY,
    objInfo: obj,
  };
};
export const deleteItem = (index, type, amount) => {
  return {
    type: actionTypes.DELETE_ITEM,
    index: index,
    types: type,
    amount: amount,
  };
};
export const transferMoneyFun = (obj) => {
  return {
    type: actionTypes.TRANSFER_MONEY_FUN,
    objInfo: obj,
  };
};
export const logoutFun = () => {
  return {
    type: actionTypes.LOGOUT_FUN,
  };
};
