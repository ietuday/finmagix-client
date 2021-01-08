import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import SHA256 from "crypto-js/sha256";
import "../css/signup-signin.css";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Input } from "antd";
import { NotificationManager } from "react-notifications";
import ForgotPasswordValidator from "../Components/validatorRules/ForgotPasswordValidator";
import Loader from "../Components/reports/loader";
import { updateValidators } from "../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../common/ValidatorFunction";
import forgot from "../assets/images/forgot.svg";
import Axios from "axios";
import { config } from "./config/default";
const { baseURL } = config;

class ForgotPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      backButton: false,
      send: false,
      valid: false,
      email: "",
      goToNextPage: false,
    };
    this.validators = ForgotPasswordValidator;
    resetValidators(this.validators);
  }

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

  goToPreviousPage = () => {
    this.props.history.push('/signin');   
  };

  handleSubmit = () => {
    if (this.isFormValid()) {
      this.setState({
        valid: true,
      });
      const data = {
        key: SHA256(JSON.stringify(this.state.email)).toString(),
        email: this.state.email,
      };

      Axios.post(`${baseURL}/users/password_reset`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resetData) => {
          if (resetData.data.success) {
            this.setState({
              valid: false,
            });
            NotificationManager.success("Email Sent", resetData.data.message);
            this.props.history.push('/signin');        
          } else {
            NotificationManager.error("Error", resetData.data.message);
          }
        })
        .catch((err) => {
          NotificationManager.error("Error");
        });
    }
  };
  render() {
    return (
      <div>
        <MDBContainer className="forgot-container">
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
          <MDBCol
            xl="12"
            lg="12"
            md="12"
            sm="12"
            xs="12"
            className="text-center"
          >
            <img src={forgot} className="for-img"></img>
            <h4>You Forgot Your Password</h4>
            <p>
              Forgot your password? No problem! Please enter your email below,
              and press <b>SEND</b>
            </p>
          </MDBCol>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <span className="signup-signin-label">Email</span>
              <br />
              <Input
                className="input-class-mdb"
                type="email"
                name="email"
                value={this.state.email}
                placeholder="name@xyz.com"
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          {displayValidationErrors(this.validators, "email")}

          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="button-inner-class"
                disabled={this.state.valid}
                fullWidth
                onClick={this.handleSubmit}
              >
                Send
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

// withRouter
export default withRouter(ForgotPassword);
