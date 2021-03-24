import React, { Component } from "react";
import classes from "./UserInterface.module.css";
import Nav from "./nav/nav";
import Home from "./home/home";
import Wallet from "./wallet/wallet";
import Excange from "./excange/Excange";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../Store/actions/index";

class UserInterface extends Component {
  state = {
    activeSection: 1,
    sideBar: false,
  };
  homeBtn = () => {
    this.setState({ activeSection: 1, sideBar: false });
  };
  walletBtn = () => {
    this.setState({ activeSection: 2, sideBar: false });
  };
  excangeBtn = () => {
    this.setState({ activeSection: 3, sideBar: false });
  };
  showSideBar = () => {
    this.setState({ sideBar: true });
  };
  closeSideBar = () => {
    this.setState({ sideBar: false });
  };
  logout = () => {
    this.props.logoutFun();
  };
  render() {
    let homeCss = [
      classes.home,
      this.state.activeSection === 1 ? classes.show : classes.remove,
    ];
    let walletCss = [
      classes.wallet,
      this.state.activeSection === 2 ? classes.show : classes.remove,
    ];
    let excangeCss = [
      classes.excange,
      this.state.activeSection === 3 ? classes.show : classes.remove,
    ];
    let navCss = [
      classes.navBar,
      this.state.sideBar ? classes.showSidebar : null,
    ];
    let allContent = <Redirect to="/" />;
    if (this.props.activeUser) {
      allContent = (
        <div className={classes.Container}>
          <div onClick={this.showSideBar} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <nav className={navCss.join(" ")}>
            <Nav
              homeBtn={this.homeBtn}
              walletBtn={this.walletBtn}
              excangeBtn={this.excangeBtn}
              closeSideBar={this.closeSideBar}
              logout={this.logout}
            />
          </nav>
          <div className={classes.Sections}>
            <div className={homeCss.join(" ")}>
              <Home />
            </div>
            <div className={walletCss.join(" ")}>
              <Wallet />
            </div>
            <div className={excangeCss.join(" ")}>
              <Excange />
            </div>
          </div>
        </div>
      );
    }
    return allContent;
  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.form.activeUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutFun: () => dispatch(action.logoutFun()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserInterface);
