import { withRouter, Redirect, Link } from "react-router-dom";
import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdbreact";
import down from "../../assets/images/down-arrow.png";
import Header from "../../common/header";
import "./nerdReportDetails.css";

import { Button } from "@material-ui/core";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function HomeAffordability(props) {
  let singlePropertyResponse;
  let CalculatorResponse;
  if (
    props.location.state &&
    props.location.state.singlePropertyResponse &&
    props.location.state.GetSinglePropertyResponse
  ) {
    singlePropertyResponse = props.location.state.singlePropertyResponse;
    CalculatorResponse = props.location.state.GetSinglePropertyResponse;
  } else {
    CalculatorResponse = JSON.parse(localStorage.getItem("calculatorResponse"));
    singlePropertyResponse = JSON.parse(
      localStorage.getItem("GetSinglePropertyResponse")
    );
    console.log(CalculatorResponse);
    // debugger
    // console.log(parseInt(String(CalculatorResponse.FRM1.Housingpmtaffordableoption1).replace(/%/g, "")))
    if (
      CalculatorResponse.FRM1 &&
      CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.FRM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) > 28 &&
      parseInt(
        String(CalculatorResponse.FRM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) <= 36
    ) {
      console.log("FRM1 28-36");
    }
    if (
      CalculatorResponse.FRM1 &&
      CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.FRM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) > 36
    ) {
      console.log("FRM1 >36");
    }

    if (
      CalculatorResponse.FRM1 &&
      CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.FRM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) < 28
    ) {
      console.log("FRM1 28");
    }

    if (
      CalculatorResponse.ARM1 &&
      CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.ARM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) > 28 &&
      parseInt(
        String(CalculatorResponse.ARM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) <= 36
    ) {
      console.log("ARM1 28-36");
    }
    if (
      CalculatorResponse.ARM1 &&
      CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.ARM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) > 36
    ) {
      console.log("ARM1 >36");
    }

    if (
      CalculatorResponse.ARM1 &&
      CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
      parseInt(
        String(CalculatorResponse.ARM1.Housingpmtaffordableoption1).replace(
          /%/g,
          ""
        )
      ) < 28
    ) {
      console.log("ARM1 28");
    }
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header type="Home Affordability" className="header-row" />

      <MDBContainer>
        <Button
          size="medium"
          className="btn btn-primary btn-sm waves-effect waves-light"
        >
          <Link to="/nerd-report">Go to Nerd Report</Link>
        </Button>
        <MDBCard className="margin10">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Scenario 1" />
              <Tab label="Scenario 2" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} style={{ marginTop: "50px" }}>
            <div className="progress" style={{ height: "30px" }}>
              <div
                className="progress-bar-green"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM1 &&
                CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 28 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM1 &&
                CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 28 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>

              <div
                className="progress-bar-yellow"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM1 &&
                CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) > 28 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM1 &&
                CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) > 28 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>

              <div
                className="progress-bar-red"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM1 &&
                CalculatorResponse.ARM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) > 36 ? (
                  <MDBRow style={{color: "black"}}>
                    <MDBCol md="12">
                      <div>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM1 &&
                CalculatorResponse.FRM1.Housingpmtaffordableoption1 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) > 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM1.Housingpmtaffordableoption1}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>
            </div>

            <MDBRow>
              <MDBCol md="12">
                <div className="tab_contnt">
                  <h6 className="box">Housing Ratio 28%</h6>
                  <h6 className="box-1">Housing Ratio 36%</h6>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <div className="tab_contnt">
                  <h6>
                    {CalculatorResponse.ARM1
                      ? CalculatorResponse.ARM1[
                          "Housingpmtaffordableoption1_comment"
                        ]
                      : CalculatorResponse.FRM1
                      ? CalculatorResponse.FRM1[
                          "Housingpmtaffordableoption1_comment"
                        ]
                      : ""}
                  </h6>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-green"></span>
                    <div>Affordable</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-yelow"></span>
                    <div>High, but Affordable</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-red"></span>
                    <div>May not be affordable</div>
                  </div>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </TabPanel>

          <TabPanel value={value} index={1}>
           
          <div className="progress" style={{ height: "30px" }}>
              <div
                className="progress-bar-green"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM2 &&
                CalculatorResponse.ARM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 28 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM2 &&
                CalculatorResponse.FRM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 28 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>

              <div
                className="progress-bar-yellow"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM2 &&
                CalculatorResponse.ARM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) > 28 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM2 &&
                CalculatorResponse.FRM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) > 28 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>

              <div
                className="progress-bar-red"
                role="progressbar"
                style={{ width: "33.33%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {CalculatorResponse.ARM2 &&
                CalculatorResponse.ARM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) > 36 ? (
                  <MDBRow style={{color: "black"}}>
                    <MDBCol md="12">
                      <div>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.ARM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}

                {CalculatorResponse.FRM2 &&
                CalculatorResponse.FRM2.Housingpmtaffordableoption2 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) > 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div style={{color: "black"}}>
                        <img src={down} className="home-afer"></img>
                        {CalculatorResponse.FRM2.Housingpmtaffordableoption2}
                      </div>
                    </MDBCol>
                  </MDBRow>
                ) : null}
              </div>
            </div>


            <MDBRow>
              <MDBCol md="12">
                <div className="tab_contnt">
                  <h6 className="box">Housing Ratio 28%</h6>
                  <h6 className="box-1">Housing Ratio 36%</h6>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <div className="tab_contnt">
                  <h6>
                    {CalculatorResponse.ARM2
                      ? CalculatorResponse.ARM2[
                          "Housingpmtaffordableoption2_comment"
                        ]
                      : CalculatorResponse.FRM2
                      ? CalculatorResponse.FRM2[
                          "Housingpmtaffordableoption2_comment"
                        ]
                      : "TEST"}
                  </h6>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-green"></span>
                    <div>Affordable</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-yelow"></span>
                    <div>High, but Affordable</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-red"></span>
                    <div>  May not be affordable</div>
                  </div>
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </TabPanel>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(HomeAffordability);
