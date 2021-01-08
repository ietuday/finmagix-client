import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

export class Summary extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showReports: false,
    };
  }

  showReports = () => {
    this.props.history.push("/show-detailed-reports");
  };
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        <MDBContainer>
          <MDBRow className="margin20">
            <MDBCol>
              <div className="text-center">
                <img
                  src={require("../../assets/logo/report-logo.png")}
                  alt="report"
                  onClick={this.showReports}
                />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div className="text-center">
                <h1 className="report-text">Well done,</h1>
                <h4 className="get-started-label report-text">
                  Your report is ready
                </h4>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol>
              <div className="text-center">
                <p>Do you want to Edit or Review inputs?</p>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Property Information</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push("/property-information-review-edit")
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Personal Finance</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push("/personalfinance-review-edit")
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Mortgage Programs</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push("/mortgage-programs-review-edit")
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Rent vs Buy</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push("/rent-vs-buy-review-edit")
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 marginbottom50">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Taxes</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() => this.props.history.push("/taxes-review-edit")}
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}
export default withRouter(Summary);
