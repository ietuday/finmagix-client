import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen1 extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />

        <MDBContainer className="splash-container">
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center margin20">
                <img
                  src={require("../../assets/images/Group 529.svg")}
                  alt="finmagix"
                  className="splash-img"
                />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
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
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <h5 className="splash-text-inner">
                  In under a minute,we assist you in making one of the most<br></br>
                  important financial decisions of your life!
                </h5>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default SplashScreen1;
