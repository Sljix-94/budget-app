import React, { Component } from "react";
import classes from "./SignUp.module.css";
import Aux from "../../../hoc/Auxilary/Auxilary";
import logo from "../../../images/bank.jpg";
import Form from "./Form/Form";

class SignUp extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.Container}>
          <div className={classes.leftSide}>
            <div className={classes.imgContainer}>
              <img src={logo} alt="Bank" />
              <div className={classes.hover} />
            </div>
          </div>
          <div className={classes.rightSide}>
            <Form />
          </div>
        </div>
      </Aux>
    );
  }
}
export default SignUp;
