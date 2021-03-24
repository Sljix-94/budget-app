import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  activeUser: null,
  errorLogMessage: null,
  errorLogInMessage: null,
  signInDisabled: true,
  signInUserName: null,
  signInPassword: null,
};
//Push user function
const pushUserFun = (state, action) => {
  let newUser;
  let users;
  let validation;
  let valid1 = true;
  if (state.users.length !== 0) {
    state.users.forEach((cur) => {
      if (
        cur.email !== action.userData.email &&
        cur.userName !== action.userData.userName
      ) {
        //newUser = action.userData;
        validation = true;
        valid1 = validation && valid1;
      } else {
        newUser = null;
        validation = false;
        valid1 = validation && valid1;
      }
    });
    users = state.users;
    if (valid1) {
      newUser = action.userData;
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  } else {
    newUser = action.userData;
    users = state.users;
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  return {
    ...state,
    users: newUser === null ? state.users : users,
    activeUser: newUser,
    errorLogMessage:
      newUser === null ? "This email or username alredy exist" : null,
  };
};

//Sign in Check
const signInCheck = (state, action) => {
  return {
    ...state,
    signInUserName: action.userName,
    signInPassword: action.password,
  };
};

//
const checkSignInFun = (state, action) => {
  let activeuser;
  let valid;
  let validationArr = [];

  if (state.users.length > 0) {
    state.users.forEach((cur, index) => {
      if (
        cur.userName === action.userName &&
        cur.password === action.password
      ) {
        //activeuser = cur;
        valid = true;
        validationArr.push(valid);
      } else {
        //activeuser = null;
        valid = false;
        validationArr.push(valid);
      }
    });
  } else {
    activeuser = null;
  }

  let index = validationArr.indexOf(true);
  activeuser = state.users[index];
  return {
    ...state,
    activeUser: activeuser,
    errorLogInMessage: activeuser ? null : "Invalid Username or password",
  };
};

/* USER INTERFACE */
//Add money
const addMoneyToActionsArrFun = (state, action) => {
  let index;
  for (let i = 0; i < state.users.length; i++) {
    if (state.users[i].userName !== state.activeUser.userName) continue;
    index = i;
  }

  const activeUser = {
    ...state.activeUser,
    budget: {
      ...state.activeUser.budget,
      budget:
        action.objInfo.type === "inc"
          ? state.activeUser.budget.budget + Number(action.objInfo.amount)
          : state.activeUser.budget.budget - Number(action.objInfo.amount),
      income:
        action.objInfo.type === "inc"
          ? state.activeUser.budget.income + Number(action.objInfo.amount)
          : state.activeUser.budget.income,
      expence:
        action.objInfo.type === "exp"
          ? state.activeUser.budget.expence + Number(action.objInfo.amount)
          : state.activeUser.budget.expence,
    },
    actions: state.activeUser.actions.concat(action.objInfo),
  };

  const newArr = state.users;
  newArr[index] = { ...activeUser };
  localStorage.setItem("users", JSON.stringify(newArr));
  return {
    ...state,
    users: newArr,
    activeUser: activeUser,
  };
};
//Take of money

const takeOfMoneyFun = (state, action) => {
  let index;
  for (let i = 0; i < state.users.length; i++) {
    if (state.users[i].userName !== state.activeUser.userName) continue;
    index = i;
  }

  const activeUser = {
    ...state.activeUser,
    budget: {
      ...state.activeUser.budget,
      budget:
        action.objInfo.type === "inc"
          ? state.activeUser.budget.budget + Number(action.objInfo.amount)
          : state.activeUser.budget.budget - Number(action.objInfo.amount),
      income:
        action.objInfo.type === "inc"
          ? state.activeUser.budget.income + Number(action.objInfo.amount)
          : state.activeUser.budget.income,
      expence:
        action.objInfo.type === "exp"
          ? state.activeUser.budget.expence + Number(action.objInfo.amount)
          : state.activeUser.budget.expence,
    },
    actions: state.activeUser.actions.concat(action.objInfo),
  };

  const newArr = state.users;
  newArr[index] = { ...activeUser };
  localStorage.setItem("users", JSON.stringify(newArr));
  return {
    ...state,
    users: newArr,
    activeUser: activeUser,
  };
};
//delete item
const deleteItemFun = (state, action) => {
  //update active user
  const filterArr = state.activeUser.actions.filter((cur, index) => {
    return index !== action.index;
  });

  const budgetNew = {
    ...state.activeUser.budget,
    budget:
      action.types === "inc"
        ? state.activeUser.budget.budget - action.amount
        : state.activeUser.budget.budget + action.amount,
    income:
      action.types === "inc"
        ? state.activeUser.budget.income - action.amount
        : state.activeUser.budget.income,
    expence:
      action.types === "exp"
        ? state.activeUser.budget.expence - action.amount
        : state.activeUser.budget.expence,
  };
  //update all users
  const usersCopy = state.users;

  let indexOfUpdatedEl;
  for (let i = 0; i < state.users.length; i++) {
    if (state.users[i].userName !== state.activeUser.userName) continue;
    indexOfUpdatedEl = i;
  }
  usersCopy[indexOfUpdatedEl] = {
    ...state.activeUser,
    budget: budgetNew,
    actions: filterArr,
  };
  localStorage.setItem("users", JSON.stringify(usersCopy));
  return {
    ...state,
    users: usersCopy,
    activeUser: {
      ...state.activeUser,
      budget: budgetNew,
      actions: filterArr,
    },
  };
};
//TRANSFER MONEY FUN

function transferMoneyFunc(state, action) {
  let index;
  let activeUserCopy;
  let usersCopy;
  let allUsersName;
  let indexUserReciver;
  let objForReciver;
  let objForSender;
  for (let i = 0; i < state.users.length; i++) {
    if (state.users[i].userName !== state.activeUser.userName) continue;
    index = i;
  }

  allUsersName = state.users.map((cur) => {
    return cur.userName;
  });
  if (
    allUsersName &&
    allUsersName.includes(action.objInfo.desc) &&
    state.users[index].userName !== action.objInfo.desc &&
    state.users[index].budget.budget >= action.objInfo.amount
  ) {
    indexUserReciver = allUsersName.indexOf(action.objInfo.desc);
    objForReciver = {
      from: state.users[index].fullName,
      type: "transfer",
      amount: action.objInfo.amount,
    };
    objForSender = {
      to: state.users[indexUserReciver].fullName,
      type: "transfer",
      amount: action.objInfo.amount,
    };
    usersCopy = state.users;
    usersCopy[indexUserReciver] = {
      ...state.users[indexUserReciver],
      budget: {
        ...state.users[indexUserReciver].budget,
        budget:
          state.users[indexUserReciver].budget.budget + action.objInfo.amount,
        income:
          state.users[indexUserReciver].budget.income + action.objInfo.amount,
      },
      transferRecive: state.users[indexUserReciver].transferRecive.concat(
        objForReciver
      ),
    };

    activeUserCopy = {
      ...state.activeUser,
      budget: {
        ...state.activeUser.budget,
        budget: state.activeUser.budget.budget - action.objInfo.amount,
        expence: state.activeUser.budget.expence + action.objInfo.amount,
      },
      transferSend: state.activeUser.transferSend.concat(objForSender),
    };

    usersCopy[index] = { ...activeUserCopy };
    localStorage.setItem("users", JSON.stringify(usersCopy));
  } else {
    activeUserCopy = {
      ...state.activeUser,
      budget: { ...state.activeUser.budget },
    };
    usersCopy = state.users;
  }

  return {
    ...state,
    users: usersCopy,
    activeUser: activeUserCopy,
  };
}

// -------- REDUCER ---------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PUSH_USER:
      return pushUserFun(state, action);
    case actionTypes.FORM_IS_VALID:
      return { ...state, signInDisabled: !action.signInValid };
    case actionTypes.PUT_USERNAME_AND_PASSWORD:
      return signInCheck(state, action);
    case actionTypes.CHECK_SIGN_IN:
      return checkSignInFun(state, action);
    case actionTypes.PUT_LOCALSTORAGE_IN_USSERS:
      return { ...state, users: state.users.concat(action.arrLocalStorage) };
    case actionTypes.ADD_MONEY_TO_ACTIONS_ARR:
      return addMoneyToActionsArrFun(state, action);
    case actionTypes.TAKE_OF_MONEY:
      return takeOfMoneyFun(state, action);
    case actionTypes.DELETE_ITEM:
      return deleteItemFun(state, action);
    case actionTypes.TRANSFER_MONEY_FUN:
      return transferMoneyFunc(state, action);
    case actionTypes.LOGOUT_FUN:
      return { ...state, activeUser: null };
    default:
      return state;
  }
};
export default reducer;
