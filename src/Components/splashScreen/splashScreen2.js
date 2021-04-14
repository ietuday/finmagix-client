import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import "../../css/splashScreen.css";
//import splash from '../../assets/images/splash_img.jpg';

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen2 extends Component {
  constructor() {
    super();
    this.state = {
      getStartedView: false,
      goToSignUp: false,
      goToSignIn: false
    };
  }
  getStarted = () => {
    this.setState({
      getStartedView: !this.state.getStartedView,
    });
  };
  goToSignUp = () => {
    this.setState({
      goToSignUp: !this.state.goToSignUp,
    });
  };
  goToSignIn = () => {
    this.setState({
        goToSignIn: !this.state.goToSignIn,
      });  
  }
  render() {
    if (this.state.getStartedView) {
      return <Redirect to="/get-started" />;
    }
    if (this.state.goToSignUp) {
      return <Redirect to="/signup" />;
    }
    if (this.state.goToSignIn) {
        return <Redirect to="/signin" />;
      }
    return (
      <Fragment>
        <CssBaseline />

        <MDBContainer className="splash-container-for-buttton">
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <Button
                  variant="contained"
                  size="large"
                  className="button-inner-class"
                  onClick={this.getStarted}
                >
                  Get Started
                </Button>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <Button
                  variant="outlined"
                  size="large"
                  className="button-inner-class"
                  onClick={this.goToSignIn}
                >
                  Sign in
                </Button>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <div className="followinglines">
         

<ul>
  <li>Select the best mortgage ! Model hundreds of combinations!</li>
  <li>Rent vs. Buy analysis</li>
  <li>Understand the tax impact of your home purchase</li>
  <li>Project your home equity</li>
  <li>Understand post purchase financial impact</li>
</ul>
</div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default SplashScreen2;
