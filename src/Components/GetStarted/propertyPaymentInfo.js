import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";

export class GetStartedPropertyPaymentInfo extends Component {
  constructor() {
    super();
    this.state = {
      propertyPaymentView: 1,
    };
    this.goToNextPage = this.goToNextPage.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
  }
  goToNextPage() {
    this.setState({
      propertyPaymentView: this.state.propertyPaymentView + 1,
    });
  }
  goToPreviousPage() {
    this.setState({
      propertyPaymentView: this.state.propertyPaymentView - 1,
    });
  }
  renderSwitch(param) {
    switch (param) {
        case 1:
          return <PropertyPaymentInfo1 />;
        case 2:
          return <PrelimReport />;
        default:
          return <Redirect to="/"/>;
    }
  }
  render() {
    return (
      <Fragment>
           <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <Button
                  variant="contained"
                  size="large"
                  className="button-inner-class"
                  onClick={this.goToPreviousPage}
                >
                  previous
                </Button>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
          {this.renderSwitch(this.state.propertyPaymentView)}
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <div className="text-center">
                <Button  variant="contained" size="large" onClick={this.goToNextPage} className="button-inner-class"> Save </Button>
              </div>
            </MDBCol>
          </MDBRow>
      </Fragment>
    );
  }
}

export default GetStartedPropertyPaymentInfo;
