import React from "react";
import classes from "./Excange.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const excange = (props) => {
  const users = props.users.map((cur, index) => {
    return (
      <div className={classes.BorderBottomUsser} key={Math.random(100000)}>
        <p className={classes.userName}>
          {index + 1}.UserName:{" "}
          <span className={classes.Name}>{cur.userName}</span>
        </p>
        <p className={classes.userName}>
          Full Name: <span className={classes.Name}>{cur.fullName}</span>
        </p>
      </div>
    );
  });
  return (
    <div className={classes.mainContainer}>
      <FontAwesomeIcon icon={faMoneyBillAlt} className={classes.moneyImg} />
      <h1>How to use Banking App?</h1>
      <div className={classes.container}>
        <div className={classes.Steps}>
          <span>1.</span>
          <h3>Add money to your account and a description in the green box</h3>
        </div>
        <div className={classes.Steps}>
          <span>2.</span>
          <h3>
            Take the money from your account and add a description in the red
            box
          </h3>
        </div>
        <div className={classes.Steps}>
          <span>3.</span>
          <h3>
            In the purple field, enter the username of the user to whom you want
            to send money.
          </h3>
        </div>
        <div className={classes.Steps}>
          <p>
            {props.users.length === 1
              ? "You are the only user for now,add more users so you can forward and receive money"
              : null}
          </p>
        </div>
        <div className={classes.StepsTree}>
          <p>LIST OF USERS:</p>
          <div>{users}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.form.users,
  };
};

export default connect(mapStateToProps)(excange);
