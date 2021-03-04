import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { NotificationManager } from "react-notifications";
import { Button } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "../css/signup-signin.css";
import { Input } from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  sign_up,
  sign_up_google,
} from "../Components/redux/actions/signinSignup.js/index";
import SHA256 from "crypto-js/sha256";
import "react-notifications/lib/notifications.css";
import SignupValidator from "../Components/validatorRules/SignupValidatorRules";
import { updateValidators } from "../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../common/ValidatorFunction";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';



export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      namefield: "",
      email: "",
      password: "",
      backButton: false,
      goToNextPage: false,
    };
    this.validators = SignupValidator;
    resetValidators(this.validators);
    this.isFormValid = this.isFormValid.bind(this);
    this.signUpGoogleFacebbok = this.signUpGoogleFacebbok.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    updateValidators(this.validators, e.target.name, e.target.value);
  };
  isFormValid() {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }
  signUpGoogleFacebbok(res, type) {
    const { SignUp } = this.props;
    let response;
    if (type === "google") {
      response = {
        name: SHA256(JSON.stringify(res.profileObj.name)).toString(),
        email: SHA256(JSON.stringify(res.profileObj.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    } else if (type === "facebook") {
      response = {
        name: SHA256(JSON.stringify(res.name)).toString(),
        email: SHA256(JSON.stringify(res.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    }
    if (response) {
      SignUp(response, this.onSuccess, this.onFailure);
    }
  }

  handleSubmit = () => {
    const { SignUp } = this.props;
    const signupDataObject = {
          name: SHA256(JSON.stringify(this.state.name)).toString(),
          email: SHA256(JSON.stringify(this.state.email)).toString(),
          password: SHA256(JSON.stringify(this.state.password)).toString(),
    };
    if (this.isFormValid()) {
      SignUp(signupDataObject, this.onSuccess, this.onFailure);
    } else {
      NotificationManager.error("Please validate fields!", "Error");
    }
  };
  onSuccess = () => {
    this.props.history.push("/signin");
    NotificationManager.success(
      "User Created Successfully ..!!",
      "Success",
      2000
    );
  };
  onFailure = (message) => {
    NotificationManager.error("data already exists", "error");
  };
  goToPreviousPage = () => {
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  renderGetStarted =  () =>{
    return <Redirect to="/get-started" />
  }
  render() {
    if (this.state.backButton) {
      return <Redirect to="/" />;
    }
    if (this.state.goToNextPage) {
      return <Redirect to="/signin" />;
    }
    const responseFacebook = (response) => {
      this.signUpGoogleFacebbok(response, "facebook");
    };
    const responseGoogle = (response) => {
      this.signUpGoogleFacebbok(response, "google");
    };
    return (
      <Fragment>
        { localStorage.length <= 0 
        ?
        this.renderGetStarted()
        :
        <MDBContainer className="signup-signin-container">
        <MDBRow>
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12" className="margin20">
            <div className="text-center">
              <span
                className="sign-up-back-arrow"
                onClick={this.goToPreviousPage}
              >
                   <IconButton >
                        <ArrowBackIosIcon />
                     </IconButton>
              </span>
            </div>
          </MDBCol>
        </MDBRow>{" "}
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <h2 className="signup-signin-label">Sign Up</h2>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <span className="signup-signin-label">Name</span>
            <br />
            <Input
              className="input-class-mdb"
              name="namefield"
              value={this.state.namefield}
              onChange={this.handleChange}
              placeholder="John Doe"
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "namefield")}
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <span className="signup-signin-label">Email</span>
            <br />
            <Input
              type="email"
              className="input-class-mdb"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="name@xyz.com"
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "email")}
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <span className="signup-signin-label">Password</span>
            <br />
            <Input
              type="password"
              className="input-class-mdb"
              placeholder="Enter 8 digit strong password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "password")}
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="defaultUnchecked"
                required
              />
              <label
                className="custom-control-label"
                htmlFor="defaultUnchecked"
              >
                I have read and agree to the{" "}
                <Link to="#">Terms and Conditions</Link>
              </label>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12" className="text-center">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.handleSubmit}
              fullWidth
              className="button-inner-class"
            >
              Sign Up
            </Button>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12" className="text-center">
            <span className="get-started-label sign-up-small-label">Or sign up with</span>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="6" size="6" className="text-center">
            <GoogleLogin
              clientId="840928618180-lcnv7e1qlmt52af1eo73ir3pccarj3hg.apps.googleusercontent.com"
              buttonText="Google"
              className="google-button"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              
            />
          </MDBCol>
          <MDBCol md="6" size="6" className="text-center">
            {/* <FacebookLogin
              appId="969146693516388"
              fields="name,email,picture"
              scope="public_profile,user_friends"
              textButton="     Facebook"
              cssClass="facebook-button"
              callback={responseFacebook}
              icon="fab fa-facebook-square"
              
            /> */}

              <FacebookLogin
                appId="950719508668620"
                fields="name,email,picture"
                scope="public_profile,user_friends"
                textButton="     Facebook"
                cssClass="facebook-button"
                callback={responseFacebook}
                icon="fab fa-facebook-square"
              />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20 signuplastsentence">
          <MDBCol md="12" className="text-center">
            <span className="sign-up-small-label">
            Already have an account? <Link to="/signin">Sign In</Link>
            </span>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      }
        
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SignupRequestData: state.signupData,
    GoogleSignUpResponse: state.googlesignupdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SignUp: (data, onSuccess, onFailure) =>
      dispatch(sign_up(data, onSuccess, onFailure)),
    signUpGoogle: (token) => dispatch(sign_up_google(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
