import React from "react";
import classes from "./transferList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as action from "../../../../Store/actions/index";

const transferList = (props) => {
  const actionDiv = props.activeUser.actions.map((cur, index) => {
    return (
      <div
        className={
          cur.type === "inc"
            ? classes.Income
            : cur.type === "exp"
            ? classes.Expences
            : classes.Transfer
        }
        key={cur.desc + cur.amount + Math.random(100000)}
      >
        <p>
          {cur.type === "transfer" ? "Paid for acount: " : null}
          {cur.desc}
        </p>
        <p className={classes.Amount}>{cur.amount.toFixed(2)} $</p>
        {cur.type !== "transfer" ? (
          <button
            className={classes.TrashBtn}
            onClick={() => props.deleteItem(index, cur.type, cur.amount)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        ) : null}
      </div>
    );
  });
  const transferSendList = props.activeUser.transferSend.map((cur, index) => {
    return (
      <div
        className={classes.Transfer}
        key={cur.to + cur.amount + Math.random(100000)}
      >
        <p>Sent money to {cur.to}</p>
        <p className={classes.TransferSendAmount}>{cur.amount.toFixed(2)} $</p>
      </div>
    );
  });
  const transferReciveList = props.activeUser.transferRecive.map(
    (cur, index) => {
      return (
        <div
          className={classes.Transfer}
          key={cur.from + cur.amount + Math.random(100000)}
        >
          <p>Recive money from {cur.from}</p>
          <p className={classes.TransferReciveAmount}>
            {cur.amount.toFixed(2)} $
          </p>
        </div>
      );
    }
  );

  return (
    <div>
      {actionDiv}
      <p className={classes.Transfers}>
        {transferSendList.length !== 0 || transferReciveList.length !== 0
          ? "-Transaction list-"
          : null}
      </p>
      <p className={classes.Transfers}>
        {transferSendList.length !== 0 ? "Sent money" : null}
      </p>
      {transferSendList}
      <p className={classes.Transfers}>
        {transferReciveList.length !== 0 ? "Recived money" : null}
      </p>
      {transferReciveList}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    activeUser: state.form.activeUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (index, type, amount) =>
      dispatch(action.deleteItem(index, type, amount)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(transferList);
