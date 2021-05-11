import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen3 extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />

        <MDBContainer style={{bacground: '#ffffff', width: '78%'}}>
          <MDBRow className="margin10">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <h5 className="splash-text-inner">
                  Customized Mortgage Summary
                </h5>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center margin10">
                <img
                  src={require("../../assets/images/Cheat Sheet 1.png")}
                  alt="finmagix"
                  className="splash-img"
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default SplashScreen3;
