import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../css/splashScreen.css";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen7 extends Component {
  constructor() {
    super();
    this.state = {
        getStartedView: false,
    };
  }
  getStarted = () => {
    this.setState({
      getStartedView: !this.state.getStartedView,
    });
  };
  render() {
    if (this.state.getStartedView) {
        return <Redirect to="/signup" />;
      }
    return (
      <Fragment>
        <CssBaseline />

        <MDBContainer style={{bacground: '#ffffff', width: '78%'}}>
        <MDBRow >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <img
                  src={require("../../assets/logo/finmagix-text.png")}
                  alt="finmagix"
                  className="splash-img"
                />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center margin10">
                <img
                  src={require("../../assets/images/Group 68.png")}
                  alt="finmagix"
                  className="splash-img"
                />
              </div>
            </MDBCol>
          </MDBRow>
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
        </MDBContainer>
      </Fragment>
    );
  }
}

export default SplashScreen7;
