import React from "react";
import classes from "./home.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingUsd,
  faPiggyBank,
  faEuroSign,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

export const home = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.infoHeader}>
        <div className={classes.Cover}></div>
        <div className={classes.Info}>
          <h2>Acount</h2>
          <div className={classes.InfoBody}>
            <div className={classes.InfoBodyItem}>
              <p className={classes.Name}>Name:</p>
              <p className={classes.PropsName}>{props.activeUser.fullName}</p>
            </div>
            <div className={classes.InfoBodyItem}>
              <p className={classes.Name}>User Name:</p>
              <p className={classes.PropsName}>{props.activeUser.userName}</p>
            </div>
            <div className={classes.InfoBodyItem}>
              <p className={classes.Name}>E-mail:</p>
              <p className={classes.PropsName}>{props.activeUser.email}</p>
            </div>
            <div className={classes.InfoBodyItem}>
              <p className={classes.Name}>Password:</p>
              <p className={classes.PropsName}>{props.activeUser.password}</p>
            </div>
            <div className={classes.InfoBodyItem}>
              <p className={classes.Name}>Budget:</p>
              <p className={classes.PropsName} style={{ fontSize: "32px" }}>
                {props.activeUser.budget.budget}
                <span style={{ fontSize: "26px" }}>$</span>
              </p>
            </div>
            <FontAwesomeIcon
              icon={faHandHoldingUsd}
              className={classes.IconHolding}
            />
            <FontAwesomeIcon icon={faPiggyBank} className={classes.Piggy} />
            <FontAwesomeIcon icon={faEuroSign} className={classes.Euro} />
            <FontAwesomeIcon icon={faCoins} className={classes.Coins} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeUser: state.form.activeUser,
});

export default connect(mapStateToProps)(home);
