import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen5 extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />

        <MDBContainer className="splash-container">
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <h5 className="splash-text-inner">
                Equity Projections
                </h5>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center margin20">
                <img
                  src={require("../../assets/images/Equity Projections.png")}
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

export default SplashScreen5;
