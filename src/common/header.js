import React, { Component } from "react";
import { connect } from "react-redux";
import { log_out } from "../Components/redux/actions/signinSignup.js/index";
import { logout } from "../routes/utils";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
} from "mdbreact";
import { Redirect } from "react-router-dom";
import fire from '..//fire'
import firebase from "firebase/app";
import "firebase/auth";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButton: false,
      nextButton: false,
      isOpen: false,
      modal: false,
      logout: false,
      goToSurvey : false
    };
  }
  goToPreviousPage = () => {
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  goToNextPage = () => {
    this.setState({
      nextButton: !this.state.nextButton,
    });
  };
  goToSurvey =()=>{
    this.setState({
      goToSurvey : !this.state.goToSurvey,
    });
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  goToLogOut = () => {
    const { LogOut } = this.props;
    localStorage.clear();
    LogOut();
    logout();
    fire.auth().signOut();
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  render() {
    if (this.state.goToSurvey) {
      return <Redirect to="/survey" />;
    }
    if (this.state.backButton) {
      return <Redirect to="/signin" />;
    }
    if (this.state.nextButton) {
      return <Redirect to="/property-form" />;
    }
    return (
      <MDBRow className="header-row">
        <MDBCol md="12" size="12">
          {this.props.type === "dashboard" ? (
            <div  className="text-center">
                <br />
                <img
                  src={require("../assets/logo/FinMagix-logo-white.png")}
                  alt="finmagix"
                />
            </div>
          ) : (
            <div className="text-center">
              <br />
              <br />
              <h2 className="header-label">{this.props.type}</h2>
            </div>
          )}

          <MDBIcon
            className="navbar-icon"
            icon="user"
            size="large"
            onClick={this.toggle}
          />
        </MDBCol>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          side
          position="top-right"
          backdrop={false}
          className="modal-side modal-top-right"
        >
          <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
          <MDBModalBody>
            <div className="row">
              <span className="modal-text">Help</span>
            </div>
            <hr />
            {Object.entries(JSON.parse(localStorage.getItem('personal_finance_array'))).length !== 0 ? 
            <div className="row">
              <span className="modal-text" onClick={this.goToSurvey}>Survey</span>
            </div>
            :
            null
            }
            <hr />
            <div className="row">
              <span className="modal-text" onClick={this.goToLogOut}>
                Logout
              </span>
            </div>
          </MDBModalBody>
        </MDBModal>
      </MDBRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SigninRequestData: state.signinData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: () => dispatch(log_out()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
