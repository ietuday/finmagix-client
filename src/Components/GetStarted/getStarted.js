import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Button } from "@material-ui/core";
// import GetStartedBasicInfo from "../../Components/GetStarted/basicInfo";
import PropertyPaymentInfo1 from "../GetStarted/PropertyPayment/propertyPayment1";
import PrelimReport from "../GetStarted/PropertyPayment/PrelimReport";
import { Redirect } from "react-router-dom";
import "../../css/getStarted.css";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

export class GetStarted extends Component {
  constructor() {
    super();
    this.state = {
      getStartedView: 1,
    };
    this.goToNextPage = this.goToNextPage.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
  }
  goToNextPage() {
    this.setState({
      getStartedView: this.state.getStartedView + 1,
    });
  }
  goToPreviousPage() {
    this.setState({
      getStartedView: this.state.getStartedView - 1,
    });
  }
  // renderSwitch(param) {
  //   switch (param) {
  //     case 1:
  //       return <GetStartedBasicInfo />;
  //     case 2:
  //       return <PropertyPaymentInfo1 />;
  //     case 3:
  //       return <PrelimReport />;

  //     default:
  //       return <Redirect to="/" />;
  //   }
  // }
  renderSwitch(param) {
    switch (param) {
      case 1:
        return <PropertyPaymentInfo1 />;
      case 2:
        return <PrelimReport />;
      default:
        return <Redirect to="/" />;
    }
  }
  render() {
    return (
      <Fragment>
        <MDBContainer fluid className="header-row-get-started"> 
          <MDBRow >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <MDBRow className="margin20">
                <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
                  <div className="text-center">
                    <span
                      className="back-button-class"
                      onClick={this.goToPreviousPage}
                    >
                      <IconButton>
                        <ArrowBackIosIcon style={{ fill: "#fff" }} />
                      </IconButton>
                    </span>
                    <br />
                    <h2 className="back-button-class">
                      {this.state.getStartedView === 1
                        ? "Welcome"
                        : "" }
                    </h2>
                  </div>
                </MDBCol>
              </MDBRow>{" "}
            </MDBCol>
          </MDBRow>
          <MDBContainer className="get-started-container">
            {this.renderSwitch(this.state.getStartedView)}
            <MDBRow className="margin20 marginbottom20">
              <MDBCol lg="12" xl="12" xs="12" md="12" sm="12" size="12">
                <div className="text-center">
                  {this.state.getStartedView === 2 ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      className="button-inner-class"
                      onClick={this.goToNextPage}
                    >
                      {" "}
                      Next{" "}
                    </Button>
                  )}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default GetStarted;