import React, { Component} from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";

import SHA256 from "crypto-js/sha256";
import "../css/signup-signin.css";
import { Input } from "antd";
import { NotificationManager } from "react-notifications";

// import CreatePasswordValidator from "../Components/validatorRules/CreatePasswordValidator";
// import { updateValidators } from "../common/ValidatorFunction";
// import {
//   resetValidators,
//   displayValidationErrors,
// } from "../common/ValidatorFunction";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

import padlock from "../assets/images/padlock.svg";

import Axios from "axios";
import { config } from './config/default';
const { baseURL } = config;




class createPassword extends Component {

  constructor(props){
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      valid: false,
      match: false
    };
    this.validators = CreatePasswordValidator;
    resetValidators(this.validators);
  }


  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    updateValidators(this.validators, e.target.name, e.target.value);
  }

  goToPreviousPage = () => {
    this.props.history.push('/signin');   
  };

  handleSubmit = () => {
    if(this.state.password !== this.state.confirmPassword){
      NotificationManager.warning('Warning', 'Password not match')
    }else{
      this.setState({
        valid: true,
      });
        const data = {
          password1: SHA256(JSON.stringify(this.state.password)).toString(),
          password2: SHA256(JSON.stringify(this.state.confirmPassword)).toString(),
        }
        Axios.post(`${baseURL}/users/reset_password_confirm/${this.props.match.params.token}`, data, {
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(resetData => {
            this.setState({
              valid: false,
            });
            if(resetData.data.success){
              NotificationManager.success('Email Sent', resetData.data.message);
              this.props.history.push('/signin');  
            }else{
              NotificationManager.error('Error', resetData.data.message);
            }
          })
          .catch(err => {
            NotificationManager.error('Error');
          });
    }
    }
  


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
            <img src={padlock} className="for-img" alt="" />
            <h4>Create New Password</h4>
            {/* <p>
            Lost your password? Please enter your email address. You will receive a link to create a new password via email.
            </p> */}
          </MDBCol>
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
              <span className="signup-signin-label">ConfirmPassword</span>
              <br />
              <Input
                type="password"
                className="input-class-mdb"
                placeholder="Enter confirm password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          {displayValidationErrors(this.validators, "confirmPassword")}

          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="button-inner-class"
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

export default createPassword;
