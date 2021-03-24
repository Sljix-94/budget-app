import React, { Component } from "react";
import SignUp from "./Components/SignUp-page/SignUp/SignUp";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import UserInterface from "./Components1/UserInterface/UserInterface";
import * as action from "./Store/actions/index";

class App extends Component {
  componentDidMount() {
    const usersFromStorage = JSON.parse(localStorage.getItem("users"));

    if (usersFromStorage !== null) {
      this.props.putLocalStorageInUssers(usersFromStorage);
    }
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/user" component={UserInterface} />
          <Route path="/" exact component={SignUp} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activeUser: state.form.activeUser,
    allUsers: state.form.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putLocalStorageInUssers: (localStorageArr) =>
      dispatch(action.putLocalStorageInUssers(localStorageArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
