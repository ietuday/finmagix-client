import { withRouter, Link } from "react-router-dom";
import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {

  MDBCard,

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
  // let singlePropertyResponse;
  let CalculatorResponse;
  if (
    props.location.state &&
    props.location.state.singlePropertyResponse &&
    props.location.state.GetSinglePropertyResponse
  ) {
    // singlePropertyResponse = props.location.state.singlePropertyResponse;
    CalculatorResponse = props.location.state.GetSinglePropertyResponse;
  } else {
    CalculatorResponse = JSON.parse(localStorage.getItem("calculatorResponse"));
    // singlePropertyResponse = JSON.parse(
    //   localStorage.getItem("GetSinglePropertyResponse")
    // );
    
    
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
          <TabPanel value={value} index={0} style={{ marginTop: "30px" }}>
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
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 36 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 36 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM1.Housingpmtaffordableoption1
                  ).replace(/%/g, "")
                ) <= 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 42 ? (
                  <MDBRow className="housing-ratio">
                    <MDBCol md="12">
                      <div>
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                    <div><strong>Affordable</strong>: Housing to Income Ratio less than equal to 36%</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-yelow"></span>
                    <div><strong>High But affordable</strong>: Housing to Income Ratio 37-42%</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-red"></span>
                    <div><strong>High, may not be affordable</strong>: Greater than 42%</div>
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
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) <= 36 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 36 &&
                parseInt(
                  String(
                    CalculatorResponse.ARM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 36 &&
                parseInt(
                  String(
                    CalculatorResponse.FRM2.Housingpmtaffordableoption2
                  ).replace(/%/g, "")
                ) <= 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 42 ? (
                  <MDBRow className="housing-ratio">
                    <MDBCol md="12">
                      <div>
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                ) > 42 ? (
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="housing-ratio">
                        <img src={down} className="home-afer"  alt="downarrow"  />
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
                    <div><strong>Affordable</strong>: Housing to Income Ratio less than equal to 36%</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-yelow"></span>
                    <div><strong>High But affordable</strong>: Housing to Income Ratio 37-42%</div>
                  </div>
                </MDBCol>
                <MDBCol md="6" className="margin20">
                  <div className="property-finance-get-started-label">
                    <span className="box-red"></span>
                    <div><strong>High, may not be affordable</strong>: Greater than 42%</div>
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
