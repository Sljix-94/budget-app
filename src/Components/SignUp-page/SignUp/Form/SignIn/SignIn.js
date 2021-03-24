import React, { Component } from "react";
import Input from "../Input/Input";
import classes from "./SignIn.module.css";
import Aux from "../../../../../hoc/Auxilary/Auxilary";
import { connect } from "react-redux";
import * as action from "../../../../../Store/actions/index";
import { checkValidity } from "../../../../../shared/utility";

class SignIn extends Component {
  state = {
    orderForm: {
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
    formIsValid2: false,
  };

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
    this.setState({ orderForm: updatedForm, formIsValid2: formElement });
    this.props.signInDisabled(formElement);
    this.props.putUserNameAndPassword(
      updatedForm.userName.value,
      updatedForm.password.value
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
      <Aux>
        {formElementsArray.map((cur) => {
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
        })}
      </Aux>
    );
    return (
      <div className={classes.SignIn}>
        {form}
        <p>{this.props.errorLogInMessage}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    errorLogInMessage: state.form.errorLogInMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInDisabled: (formValid2) => dispatch(action.signInDisabled(formValid2)),
    putUserNameAndPassword: (userName, password) =>
      dispatch(action.putUserNameandPassword(userName, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
