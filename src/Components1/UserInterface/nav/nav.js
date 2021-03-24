import React from "react";
import classes from "./nav.module.css";
import Aux from "../../../hoc/Auxilary/Auxilary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPiggyBank,
  faInfo,
  faWindowClose,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function nav(props) {
  return (
    <Aux>
      <button onClick={props.homeBtn} className={classes.navBtn}>
        <span>Home</span>
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button onClick={props.walletBtn} className={classes.navBtn}>
        <span>Wallet</span>
        <FontAwesomeIcon icon={faPiggyBank} />
      </button>
      <button onClick={props.excangeBtn} className={classes.navBtn}>
        <span>Info</span>
        <FontAwesomeIcon icon={faInfo} />
      </button>
      <button onClick={props.logout} className={classes.navBtn}>
        <span>Logout</span>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
      <button className={classes.close} onClick={props.closeSideBar}>
        <FontAwesomeIcon icon={faWindowClose} className={classes.Icon} />
      </button>
    </Aux>
  );
}
