import React, { Component } from "react";
import classes from "./Form.module.css";
import Input from "./Input/Input";
import UserInterface from "../../../../Components1/UserInterface/UserInterface";
import SignIn from "./SignIn/SignIn";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../../../shared/utility";

import { connect } from "react-redux";
import * as action from "../../../../Store/actions/index";

class Form extends Component {
  state = {
    orderForm: {
      fullName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 50,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          monkey: "@",
          com: ".com",
        },
        valid: false,
        touched: false,
      },
      userName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    signUp: true,
  };

  //Changed Handler
  changedHandler = (e, inputIdentifire) => {
    const updatedFormElement = {
      ...this.state.orderForm[inputIdentifire],
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        this.state.orderForm[inputIdentifire].validation
      ),
      touched: true,
    };

    const updatedForm = {
      ...this.state.orderForm,
      [inputIdentifire]: updatedFormElement,
    };

    let formElement = true;
    for (let key in updatedForm) {
      formElement = updatedForm[key].valid && formElement;
    }
    this.setState({ orderForm: updatedForm, formIsValid: formElement });
  };

  //Switch log
  switchLog = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  //Sign up function
  signUpFun = () => {
    //console.log("signup fun");
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    formData.budget = {
      budget: 0,
      income: 0,
      expence: 0,
    };
    formData.actions = [];
    formData.transferSend = [];
    formData.transferRecive = [];

    this.props.pushUser(formData);
  };
  //Sign In function
  signInFun = () => {
    //console.log("sign IN fun");
    this.props.checkSignIn(
      this.props.signInUserNameInput,
      this.props.signInPasswordInput
    );
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form className={classes.Form}>
        {this.state.signUp ? (
          formElementsArray.map((cur) => {
            return (
              <Input
                key={cur.id}
                label={
                  cur.config.elementConfig.placeholder.charAt(0).toUpperCase() +
                  cur.config.elementConfig.placeholder.slice(1)
                }
                elementType={cur.config.elementType}
                elementConfig={cur.config.elementConfig}
                value={cur.config.value}
                changed={(e) => this.changedHandler(e, cur.id)}
                invalid={!cur.config.valid}
                shouldValidate={cur.config.validation}
                touched={cur.config.touched}
              />
            );
          })
        ) : (
          <SignIn />
        )}
      </form>
    );
    return (
      <div className={classes.Container}>
        {this.props.activeUser ? (
          <Redirect to="/user" component={UserInterface} />
        ) : null}
        <h1>{this.state.signUp ? "Sign Up" : "Sign In"}</h1>
        <div className={classes.FormContainer}>{form}</div>
        <div className={classes.BtnContainer}>
          <button
            disabled={
              this.state.signUp
                ? !this.state.formIsValid
                : this.props.signInDisabled
            }
            className={classes.Log}
            onClick={this.state.signUp ? this.signUpFun : this.signInFun}
          >
            Log in
          </button>
          <button className={classes.switchLog} onClick={this.switchLog}>
            {this.state.signUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
        {this.state.signUp && this.props.errorMessage ? (
          <p className={classes.errorMessage}>{this.props.errorMessage}</p>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.form.errorLogMessage,
    activeUser: state.form.activeUser,
    signInDisabled: state.form.signInDisabled,
    signInUserNameInput: state.form.signInUserName,
    signInPasswordInput: state.form.signInPassword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pushUser: (formData) => dispatch(action.pushUser(formData)),
    checkSignIn: (userName, password) =>
      dispatch(action.checkSignIn(userName, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
