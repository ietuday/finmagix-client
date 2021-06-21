import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen4 extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <MDBContainer className="splash-container" fluid breakpoint='md' breakpoint='sm'> 
        <MDBRow>
            <MDBCol>
              <div className="text-center margin10">
                <img
                  src={require("../../assets/images/onboarding_4.png")}
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

export default SplashScreen4;
