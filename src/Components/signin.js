import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import SHA256 from "crypto-js/sha256";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "../css/signup-signin.css";
import { Input } from "antd";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { sign_in } from "../Components/redux/actions/signinSignup.js/index";
import SigninValidator from "../Components/validatorRules/SigninValidatorRules";
import { updateValidators } from "../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../common/ValidatorFunction";
import { login } from "../routes/utils";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

export class Signin extends Component {
  constructor() {
    super();
    this.state = {
      backButton: false,
      signin: false,
      email: "",
      password: "",
      goToNextPage: false,
    };
    this.validators = SigninValidator;
    resetValidators(this.validators);
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }; 
  }
  goToPreviousPage = () => {
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    updateValidators(this.validators, e.target.name, e.target.value);
  };
  isFormValid = () => {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      } else {
        status = true;
      }
    });
    return status;
  };
  handleSubmit = () => {
    const { SignIn } = this.props;
    this.setState({
      signin: !this.state.signin,
    });
    const signinDataObject = {
      email: SHA256(JSON.stringify(this.state.email)).toString(),
      password: SHA256(JSON.stringify(this.state.password)).toString(),
      
    };
    if (this.isFormValid()) {
      SignIn(signinDataObject, this.onSuccess, this.onFailure);
    } else {
      NotificationManager.error("some error", "Error", 3000);
    }
  };
  signUpGoogleFacebbok(res, type) {
    const { SignIn } = this.props;
    let response;
    if (type === "google") {
      response = {
        email: SHA256(JSON.stringify(res.profileObj.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    } else if (type === "facebook") {
      response = {
        // name: SHA256(JSON.stringify(res.name)).toString(),
        email: SHA256(JSON.stringify(res.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    }
    if (response) {
      SignIn(response, this.onSuccess, this.onFailure);
    }
  }
  onSuccess =  (data) => {
     login(data.token, data.data.id,data.data);
    
    if (data.data.last_login == null) {
      this.props.history.push("/select-modules");
    } else {
      this.props.history.push("/dashboard");
    }
    NotificationManager.success("Signed in Successfully ..!!", "Success", 3000);
  };
  onFailure = () => {
    NotificationManager.error("Invalid Credentials", "error", 3000);
  };
  render() {
    if (this.state.backButton) {
      return <Redirect to="/signup" />;
    }
    const responseFacebook = (response) => {
      this.signUpGoogleFacebbok(response, "facebook");
    };
    const responseGoogle = (response) => {
      this.signUpGoogleFacebbok(response, "google");
    };
    return (
      <Fragment>
        <MDBContainer className="signup-signin-container">
          <MDBRow>
            <MDBCol
              xl="12"
              lg="12"
              md="12"
              sm="12"
              xs="12"
              className="margin20"
            >
              <div className="text-center">
                <span
                  className="sign-up-back-arrow"
                  onClick={this.goToPreviousPage}
                >
                  <IconButton>
                    <ArrowBackIosIcon />
                  </IconButton>
                </span>
              </div>
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <h2 className="signup-signin-label">Sign In</h2>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <span className="signup-signin-label">Email</span>
              <br />
              <Input
                className="input-class-mdb"
                type="email"
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
            <MDBCol md="12" className="text-center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={this.handleSubmit}
                className="button-inner-class"
                fullWidth
              >
                Sign In
              </Button>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <span>
                <Link to="/forgotpassword">Forgot Password</Link>
              </span>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <span className="get-started-label">Or sign in with</span>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="6" size="6" className="text-center">
           
              <GoogleLogin
                clientId="1058447115595-ukhhmegumqrk5766437i00qolisqhgqv.apps.googleusercontent.com"
                buttonText="Google"
                className="google-button"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </MDBCol>
            <MDBCol md="6" size="6" className="text-center">
              <FacebookLogin
                appId="950719508668620"
                fields="name,email,picture"
                scope="public_profile,user_friends"
                textButton="         Facebook"
                cssClass="facebook-button"
                callback={responseFacebook}
                icon="fab fa-facebook-square"
              />

            {/* <FacebookLogin
                appId="950719508668620"
                autoLoad={false}
                fields="name,picture,email"
                // onClick={this.componentClicked}
                callback={responseFacebook} /> */}
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <span>
                Don't have an account? <Link to="/signup"> Sign up</Link>
              </span>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
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
    SignIn: (data, onSuccess, onFailure) =>
      dispatch(sign_in(data, onSuccess, onFailure)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
