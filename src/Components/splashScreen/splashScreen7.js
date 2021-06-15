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

        <MDBContainer className="splash-container">
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
          <MDBRow className="margin10">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <h5 className="splash-text-inner">
               Leave the home purchase
               number<br/> crunching to Finmagix!

                </h5>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center ">
                <img
                  src={require("../../assets/images/home-p.png")}
                  alt="finmagix"
                  className="splash-img"
                />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
          <MDBCol xl="3" lg="3" md="3" sm="3" xs="3"></MDBCol>
            <MDBCol xl="6" lg="6" md="6" sm="6" xs="6">
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
