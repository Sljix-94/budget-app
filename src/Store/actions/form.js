import * as actionTypes from "./actionTypes";

export const pushUser = (formData) => {
  return {
    type: actionTypes.PUSH_USER,
    userData: formData,
  };
};
export const signInDisabled = (formIsValid) => {
  return {
    type: actionTypes.FORM_IS_VALID,
    signInValid: formIsValid,
  };
};

export const putUserNameandPassword = (userName, password) => {
  return {
    type: actionTypes.PUT_USERNAME_AND_PASSWORD,
    userName: userName,
    password: password,
  };
};
export const checkSignIn = (userName, password) => {
  return {
    type: actionTypes.CHECK_SIGN_IN,
    userName: userName,
    password: password,
  };
};

export const putLocalStorageInUssers = (arrFromLS) => {
  return {
    type: actionTypes.PUT_LOCALSTORAGE_IN_USSERS,
    arrLocalStorage: arrFromLS,
  };
};
