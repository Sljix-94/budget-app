import React, { Component } from "react";
import classes from "./wallet.module.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransferList from "./transferList/transferList";
import {
  faLongArrowAltUp,
  faLongArrowAltDown,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "../../../Store/actions/index";

class Wallet extends Component {
  state = {
    incomeDesc: "",
    incomeAmount: 0,
    expenceDesc: "",
    expenceAmount: 0,
    transferDesc: "",
    transferAmount: 0,
  };

  pushIncDesc = (e) => {
    this.setState({ incomeDesc: e.target.value });
  };
  pushIncAmount = (e) => {
    this.setState({ incomeAmount: e.target.value });
  };
  pushExpDesc = (e) => {
    this.setState({ expenceDesc: e.target.value });
  };
  pushExpAmount = (e) => {
    this.setState({ expenceAmount: e.target.value });
  };
  pushTransferDesc = (e) => {
    this.setState({ transferDesc: e.target.value });
  };
  pushTransferAmount = (e) => {
    this.setState({ transferAmount: e.target.value });
  };
  addMoney = () => {
    if (
      this.state.incomeDesc !== "" &&
      this.state.incomeAmount &&
      Number(this.state.incomeAmount) > 0
    ) {
      const obj = {
        type: "inc",
        desc: this.state.incomeDesc,
        amount: Number(this.state.incomeAmount),
      };
      this.props.addMoneyToActionsArr(obj);
      this.setState({ incomeDesc: "", incomeAmount: 0 });
    }
  };
  takeOfMoney = () => {
    let obj;
    if (
      this.state.expenceDesc !== "" &&
      this.state.expenceAmount &&
      Number(this.state.expenceAmount) > 0
    ) {
      obj = {
        type: "exp",
        desc: this.state.expenceDesc,
        amount: Number(this.state.expenceAmount),
      };
      this.props.takeOfMoney(obj);
      this.setState({ expenceDesc: "", expenceAmount: 0 });
    }
  };
  transferMoney = () => {
    let obj;
    if (
      this.state.transferDesc !== "" &&
      this.state.transferAmount &&
      Number(this.state.transferAmount) > 0
    ) {
      obj = {
        type: "transfer",
        desc: this.state.transferDesc,
        amount: Number(this.state.transferAmount),
      };
      //console.log(obj);
      this.props.transferMoneyFun(obj);
      this.setState({ transferDesc: "", transferAmount: 0 });
    }
  };

  render() {
    return (
      <div className={classes.Container}>
        {/*HEADER SECTION */}
        <header className={classes.header}>
          <div className={classes.budget}>
            <h2>Balance</h2>
            <p>$ {this.props.activeUser.budget.budget.toFixed(2)}</p>
          </div>
          <div className={classes.IncExpeContainer}>
            <div>
              <p>
                Income{" "}
                <FontAwesomeIcon
                  icon={faLongArrowAltUp}
                  className={classes.arrowUp}
                />
              </p>
              <p>$ {this.props.activeUser.budget.income.toFixed(2)}</p>
            </div>
            <div>
              <p>
                Expence{" "}
                <FontAwesomeIcon
                  icon={faLongArrowAltDown}
                  className={classes.arrowDown}
                />
              </p>
              <p>$ {this.props.activeUser.budget.expence.toFixed(2)}</p>
            </div>
          </div>
        </header>
        {/*MIDDLE AREA */}
        <div className={classes.Transaction}>
          <div className={classes.actions}>
            <div className={classes.TransferMoney}>
              <h3>Transfer money</h3>
              <div className={classes.Inputs}>
                <input
                  type="text"
                  placeholder="Transfer to (input username)"
                  onChange={(e) => this.pushTransferDesc(e)}
                  value={this.state.transferDesc}
                />
                <input
                  type="number"
                  placeholder="amount"
                  onChange={(e) => this.pushTransferAmount(e)}
                  value={this.state.transferAmount}
                />
                <button onClick={this.transferMoney}>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className={classes.arrowBtn}
                  />
                </button>
              </div>
            </div>
            <div className={classes.AddMoney}>
              <h3>Add money to the account</h3>
              <div className={classes.Inputs}>
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e) => this.pushIncDesc(e)}
                  value={this.state.incomeDesc}
                />
                <input
                  type="number"
                  placeholder="amount"
                  onChange={(e) => this.pushIncAmount(e)}
                  value={this.state.incomeAmount}
                />
                <button onClick={this.addMoney}>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className={classes.arrowBtn}
                  />
                </button>
              </div>
            </div>
            <div className={classes.IncomeMoney}>
              <h3>Take the money off the account</h3>
              <div className={classes.Inputs}>
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e) => this.pushExpDesc(e)}
                  value={this.state.expenceDesc}
                />
                <input
                  type="number"
                  placeholder="amount"
                  onChange={(e) => this.pushExpAmount(e)}
                  value={this.state.expenceAmount}
                />
                <button onClick={this.takeOfMoney}>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className={classes.arrowBtn}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={classes.transferList}>
            <TransferList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeUser: state.form.activeUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addMoneyToActionsArr: (obj) => dispatch(action.addMoneyToActionsArr(obj)),
    takeOfMoney: (obj) => dispatch(action.takeOfMoney(obj)),
    transferMoneyFun: (obj) => dispatch(action.transferMoneyFun(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
