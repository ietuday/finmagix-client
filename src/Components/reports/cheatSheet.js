import React, { Component, Fragment, PureComponent } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { withRouter, Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Chart } from "react-google-charts";

import { Button } from "@material-ui/core";
import "../../css/reports.css";

export class CheatSheet extends Component {
  constructor() {
    super();
    this.state = {
      homeScreen: false,
      cheatSheet: false,
    };
   
  }
  goToHomeScreen = () => {
    this.setState({
      homeScreen: !this.state.homeScreen,
    });
  };
  componentDidMount() {
   
  }
  render() {
    const {
      singlePropertyResponse,
      CalculatorResponse,
    } = this.props.location.state;
    if (this.state.homeScreen) {
      return (
        <Redirect
          to={{
            pathname: "/show-detailed-reports",
            state: { propertyId: singlePropertyResponse.id },
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header type="Report" />
        <MDBContainer className="report-container">
          <Button
            size="medium"
            className="btn btn-primary btn-sm waves-effect waves-light"
            onClick={this.goToHomeScreen}
          >
            Go To Reports Screen
          </Button>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow className="margin20">
                    <MDBCol md="9" size="10">
                      <div>
                        <Typography variant="h5" component="h2">
                          <MDBIcon icon="map-marker-alt" /> &nbsp;&nbsp;
                          {singlePropertyResponse.house_address}
                        </Typography>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12">
              <span className="get-started-label">Loan Program Comparison</span>
            </MDBCol>
          </MDBRow>
          <MDBRow className="">
            <MDBCol md="9" size="10">
              <span className="short-label">First Mortgage Program</span>
            </MDBCol>
            <MDBCol md="2" size="2">
              <span className="get-started-label">
                {CalculatorResponse.ARM1
                  ? "ARM"
                  : CalculatorResponse.FRM1
                  ? "FRM"
                  : ""}
              </span>
            </MDBCol>
          </MDBRow>
          <MDBRow className="">
            <MDBCol md="9" size="10">
              <p className="progress-bar-label">
                Mortgage amount(
                {CalculatorResponse.ARM1
                  ? CalculatorResponse.ARM1.termfirst1
                  : CalculatorResponse.FRM1
                  ? CalculatorResponse.FRM1.termfirst1
                  : "0"}{" "}
                years)
              </p>
              <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
              
            </MDBCol>
            <MDBCol md="2" size="2">
              <br />
              <div className="get-started-label">
                {CalculatorResponse.ARM1
                  ? CalculatorResponse.ARM1.loanamountfirst1
                  : CalculatorResponse.FRM1
                  ? CalculatorResponse.FRM1.loanamountfirst1
                  : "0"}
              </div>
            </MDBCol>
          </MDBRow>

          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <p className="progress-bar-label">Monthly mortgage payment</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <br />
                  <div className="get-started-label">
                    {CalculatorResponse.ARM2
                      ? CalculatorResponse.ARM2["mth-mrtg-exp"]
                      : CalculatorResponse.FRM2
                      ? CalculatorResponse.FRM2["mth-mrtg-exp"]
                      : "0"}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM1 && CalculatorResponse.ARM1["termfirst1"]) ||
          (CalculatorResponse.FRM1 && CalculatorResponse.FRM1["termfirst1"]) ? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="9" size="10">
                  <span className="short-label">Second Mortgage Program</span>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <span className="get-started-label">
                    {CalculatorResponse.ARM2
                      ? "ARM"
                      : CalculatorResponse.FRM2
                      ? "FRM"
                      : ""}
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <p className="progress-bar-label">
                    Mortgage amount(
                    {CalculatorResponse.ARM1
                      ? CalculatorResponse.ARM1.termfirst1
                      : CalculatorResponse.FRM1
                      ? CalculatorResponse.FRM1.termfirst1
                      : "0"}{" "}
                    years)
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <br />
                  <div className="get-started-label">
                    {" "}
                    {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1.loanamountfirst1
                      ? 
                          CalculatorResponse.ARM1.loanamountfirst1
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1.loanamountfirst1
                      ? 
                          CalculatorResponse.FRM1.loanamountfirst1
                      : "0"}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <p className="progress-bar-label">Monthly mortgage payment</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <br />
                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2["mth-mrtg-exp"]
                      ? CalculatorResponse.ARM2["mth-mrtg-exp"]
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2["mth-mrtg-exp"]
                      ? CalculatorResponse.FRM2["mth-mrtg-exp"]
                      : "0"}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM1 &&
            CalculatorResponse.ARM1["total-mth-hsg-pay"]) ||
          (CalculatorResponse.FRM1 &&
            CalculatorResponse.FRM1["total-mth-hsg-pay"]) ? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Housing Payment</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1["total-mth-hsg-pay"]
                      ? 
                        CalculatorResponse.ARM1["total-mth-hsg-pay"]
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1["total-mth-hsg-pay"]
                      ? 
                        CalculatorResponse.FRM1["total-mth-hsg-pay"]
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}
          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2["total-mth-hsg-pay"]
                      ? 
                          CalculatorResponse.ARM2["total-mth-hsg-pay"]
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2["total-mth-hsg-pay"]
                      ? 
                          CalculatorResponse.FRM2["total-mth-hsg-pay"]
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}
          {(CalculatorResponse.ARM1 &&
            CalculatorResponse.ARM1["ProjectedequityARMOption1"]) ||
          (CalculatorResponse.FRM1 &&
            CalculatorResponse.FRM1["ProjectedequityFRMOption1"]) ? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Projected Equity</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1.ProjectedequityARMOption1
                      ? 
                          CalculatorResponse.ARM1.ProjectedequityARMOption1
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1.ProjectedequityFRMOption1
                      ? 
                          CalculatorResponse.FRM1.ProjectedequityFRMOption1
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}
          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2.ProjectedequityARMOption2
                      ? 
                          CalculatorResponse.ARM2.ProjectedequityARMOption2
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2.ProjectedequityFRMOption2
                      ? 
                          CalculatorResponse.FRM2.ProjectedequityFRMOption2
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM1 &&
            CalculatorResponse.ARM1["Balanceoption1"]) ||
          (CalculatorResponse.FRM1 &&
            CalculatorResponse.FRM1["Balanceoption1"]) ? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">
                    After home purchase spend profile
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1.Balanceoption1
                      ? CalculatorResponse.ARM1.Balanceoption1
                        
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1.Balanceoption1
                      ? CalculatorResponse.FRM1.Balanceoption1
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2.Balanceoption2
                      ? CalculatorResponse.ARM2.Balanceoption2
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2.Balanceoption2
                      ? CalculatorResponse.FRM2.Balanceoption2
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM1 &&
            CalculatorResponse.ARM1["better-renting-by"]) ||
          (CalculatorResponse.FRM1 &&
            CalculatorResponse.FRM1["better-renting-by"])  || 
            (CalculatorResponse.ARM1 &&
              CalculatorResponse.ARM1["better-buying-by"]) || 
              (CalculatorResponse.FRM1 &&
                CalculatorResponse.FRM1["better-buying-by"])? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">
                    Rent vs Buy(for 3 years)
                  </span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <p className="progress-bar-label">Rent</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <br />

                  <div className="get-started-label">
                  {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1["better-buying-by"]
                      ? 
                          CalculatorResponse.ARM1["better-buying-by"]
                        
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1["better-buying-by"]
                      ? 
                          CalculatorResponse.FRM1["better-buying-by"]
                        
                      : (CalculatorResponse.ARM1 &&
                      CalculatorResponse.ARM1["better-buying-by"]) ? 
                        CalculatorResponse.ARM1["better-buying-by"]
                      :(CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1["better-buying-by"]) ?  
                          CalculatorResponse.ARM1["better-buying-by"]
                        : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}
          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"])
             ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) 
            
            ||
            ((CalculatorResponse.ARM2 &&
              CalculatorResponse.ARM2["better-buying-by"]) 
              )

            ||
            ((CalculatorResponse.FRM2 &&
              CalculatorResponse.FRM2["better-buying-by"]) 
              )
            ||
            ((CalculatorResponse.FRM2 &&
              CalculatorResponse.FRM2["better-renting-by"]) 
              )

            ||
            ((CalculatorResponse.FRM2 &&
              CalculatorResponse.FRM2["better-renting-by"]) 
              )
            
            ? (
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <p className="progress-bar-label">Buy</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <br />
                  {/* static data */}

                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2["better-buying-by"]
                      ? 
                          CalculatorResponse.ARM2["better-buying-by"]
                       
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2["better-buying-by"]
                      ? 
                          CalculatorResponse.FRM2["better-buying-by"]
                       
                      : (CalculatorResponse.ARM2 &&
                      CalculatorResponse.ARM2["better-buying-by"]) ? 
                        CalculatorResponse.ARM2["better-buying-by"]
                     :(CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2["better-buying-by"]) ?  
                          CalculatorResponse.ARM2["better-buying-by"]
                       : ""}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          {(CalculatorResponse.ARM1 &&
            CalculatorResponse.ARM1["Taxbenfithomeoption1"]) ||
          (CalculatorResponse.FRM1 &&
            CalculatorResponse.FRM1["Taxbenfithomeoption1"]) ? (
            <div>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Tax impact</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">
                  <div className="get-started-label">
                    {CalculatorResponse.ARM1 &&
                    CalculatorResponse.ARM1.Taxbenfithomeoption1
                      ? 
                          CalculatorResponse.ARM1.Taxbenfithomeoption1
                      : CalculatorResponse.FRM1 &&
                        CalculatorResponse.FRM1.Taxbenfithomeoption1
                      ? 
                          CalculatorResponse.FRM1.Taxbenfithomeoption1
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}
          <br/>

          {(CalculatorResponse.ARM2 &&
            CalculatorResponse.ARM2["loanamountfirst2"]) 
            ||
          (CalculatorResponse.FRM2 &&
            CalculatorResponse.FRM2["loanamountfirst2"]) 
            &&
            (CalculatorResponse.ARM2 &&
              CalculatorResponse.ARM2.Taxbenfithomeoption2)
            &&
            (CalculatorResponse.FRM2 &&
              CalculatorResponse.FRM2.Taxbenfithomeoption2)

            ? (
             
            <div>
              <MDBRow className="">
                <MDBCol md="9" size="10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
                <MDBCol md="2" size="2">

                  <div className="get-started-label">
                    {CalculatorResponse.ARM2 &&
                    CalculatorResponse.ARM2.Taxbenfithomeoption2
                      ? 
                          CalculatorResponse.ARM2.Taxbenfithomeoption2
                      : CalculatorResponse.FRM2 &&
                        CalculatorResponse.FRM2.Taxbenfithomeoption2
                      ? 
                          CalculatorResponse.FRM2.Taxbenfithomeoption2
                      : 0}
                  </div>
                </MDBCol>
              </MDBRow>
            </div>
          ) : null}

          <br />
          <br />
        </MDBContainer>
        <br />
        <br />
      </Fragment>
    );
  }
}
export default withRouter(CheatSheet);
