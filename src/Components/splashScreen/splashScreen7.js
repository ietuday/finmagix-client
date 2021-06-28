import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "../../css/splashScreen.css";
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
        <MDBContainer className="splash-container" > 
<MDBRow>
    <MDBCol>
      <div className="text-center margin10">
        <img
          src={require("../../assets/images/onboarding_6.png")}
          alt="finmagix"
          className="splash-img pointer"
          onClick={this.getStarted}
          
        />
      </div>
    </MDBCol>
  </MDBRow>

</MDBContainer>
      </Fragment>
    );
  }
}

export default SplashScreen7;


