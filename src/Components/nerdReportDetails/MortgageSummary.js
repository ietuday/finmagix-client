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
import { Button } from "@material-ui/core";
import Header from "../../common/header";
import "./nerdReportDetails.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function MortgageSummary(props) {
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
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header type="Mortgage Summary" className="header-row" />
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
              <Tab label={<span><b>Scenario 1</b> </span>} />
              <Tab label={<span><b>Scenario 2</b> </span>} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <h6 className="box">Monthly Payments</h6>
                      <h6 className="box-1">First Mortgage</h6>
                      <h6 className="box-1">Second Mortgage</h6>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Type</div>
                      <div className="box-1">
                      { CalculatorResponse ?  (CalculatorResponse.ARM1 ? "ARM" : CalculatorResponse.FRM1 ? "FRM" : "") : ""}
                      </div>
                      <div className="box-1">
                        {/* { CalculatorResponse ?  (CalculatorResponse.ARM1 ? "ARM" : CalculatorResponse.FRM1 ? "FRM" : "") : ""} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Term</div>
                      <div className="box-1">
                      {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.termfirst1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.termfirst1 
                          : 0}
                      </div>
                      <div className="box-1">
                 
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Amount</div>
                      <div className="box-1">
                      {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.loanamountfirst1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.loanamountfirst1 
                          : 0}
                      </div>
                      <div className="box-1">
                      {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.loanamountsecond1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.loanamountsecond1 
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Interest rate</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.ARM1rate
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.interestfirst1 // The interest rate field for FRM1 is interestfirst1 - I don't find it anywhere in this file
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.interestsecond1  
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.interestsecond1
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Interest Only Period</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.interestonlyfirstterm1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.interestonlyfirstterm1
                          : 0}
                      </div>
                      <div className="box-1">
                        {/* {CalculatorResponse.ARM1 // what is this code for ? There is no interest only term for the second mortgage
                          ? CalculatorResponse.ARM1.interestonlysecondterm1 
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.interestonlysecondterm1 
                          : 0} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Total Monthly Housing Payment</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["total-mth-hsg-pay"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["total-mth-hsg-pay"]
                          : 0}
                      </div>
                      <div className="box-1">
                        {/* {CalculatorResponse.ARM1 // what is this for?
                          ? CalculatorResponse.ARM1['total-mth-hsg-pay'] // we don't have 'total-mth-hsg-pay' for second mortgage
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1['total-mth-hsg-pay'] // we don't have 'total-mth-hsg-pay' for second mortgage
                          : 0} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Mortgage Payment</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["mth-mrtg-exp"] // This should be changed to InitialpaymentARM1. Note 'InitialpaymentFRM1' is for FRM only
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["mth-mrtg-exp"]
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1 // what is this block of code for? second mortgage?
                          ? CalculatorResponse.ARM1.Paymentsecond1 // what are these lines for 201-204, let's discuss? If it's for second mortgage, then it should be 'Paymentsecond1'
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.Paymentsecond1 // what are these lines for 201-204, let's discuss? If it's for second mortgage, then it should be 'Paymentsecond1'
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Property Tax</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["mth-prop-tax"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["mth-prop-tax"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Home Owner’s Insurance</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["mth-hoi"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["mth-hoi"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly HOA</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["mth-hoa"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["mth-hoa"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly PMI</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["mth-pmi"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["mth-pmi"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <div className="CardTitle">OTHER DETAILS</div>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Points</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.pointsfirst1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.pointsfirst1
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.pointssecond1 // is this for second mortgage? if so, this is correct
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.pointssecond1 // is this for second mortgage? if so, this is correct
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Closing Costs</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.closingcostsfirst1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.closingcostsfirst1
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1.closingcostssecond1
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1.closingcostssecond1
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      {/* PMI-Stop-Year */}
                      <div className="box">PMI will stop in year</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1["PMI-Stop-Year"]
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1["PMI-Stop-Year"]
                          : 0}
                      </div>
                      <div className="box-1">
               
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </TabPanel>

          {/* End of 1st tab bar */}

          <TabPanel value={value} index={1}>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <h6 className="box">Monthly Payments</h6>
                      <h6 className="box-1">First Mortgage</h6>
                      <h6 className="box-1">Second Mortgage</h6>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Type</div>
                      <div className="box-1">
                      { CalculatorResponse ?  (CalculatorResponse.ARM2 ? "ARM" : CalculatorResponse.FRM2 ? "FRM" : "") : ""}
                      </div>
                      <div className="box-1">
                      {/* { CalculatorResponse ?  (CalculatorResponse.ARM1 ? "ARM" : CalculatorResponse.FRM1 ? "FRM" : "") : ""} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Term</div>
                      <div className="box-1">
                      {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.termfirst2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.termfirst2 
                          : 0}
                      </div>
                      <div className="box-1">
                        {/* { CalculatorResponse ?  (CalculatorResponse.ARM1 ? "ARM" : CalculatorResponse.FRM1 ? "FRM" : "") : ""} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Loan Amount</div>
                      <div className="box-1">
                      {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.loanamountfirst2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.loanamountfirst2 
                          : 0}
                      </div>
                      <div className="box-1">
                      {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.loanamountsecond2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.loanamountsecond1 
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Interest rate</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.ARM2rate // this should be changed to 'ARM2rate'
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.interestfirst2
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.interestsecond2 // is this for interest rate for second mortgage? if so, then it's correct!
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.interestsecond1
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Interest Only Period</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.interestonlyfirstterm2 // this is the interest only period for ARM in second scenario
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.interestonlyfirstterm2 // this is the interest only period for FRM in second scenario
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Total Monthly Housing Payment</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["total-mth-hsg-pay"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["total-mth-hsg-pay"]
                          : 0}
                      </div>
                      <div className="box-1">
                        {/* {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["total-mth-hsg-pay"] // are we repeating the lines 623-625? note that there is no 'total-mth-hsg-pay' for second mortgage, it's only for first mortgage
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["total-mth-hsg-pay"]
                          : 0} */}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Mortgage Payment</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["mth-mrtg-exp"] // change to InitialpaymentARM2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["mth-mrtg-exp"]
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.Paymentsecond2 // if this is for second mortgage, change to 'Paymentsecond2'
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.Paymentsecond2
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Property Tax</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["mth-prop-tax"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["mth-prop-tax"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly Home Owner’s Insurance</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["mth-hoi"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["mth-hoi"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly HOA</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["mth-hoa"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["mth-hoa"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Monthly PMI</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["mth-pmi"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["mth-pmi"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>

                <div className="CardTitle">OTHER DETAILS</div>

                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Points</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.pointsfirst2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.pointsfirst2
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.pointssecond2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.pointssecond2
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">Closing Costs</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.closingcostsfirst2
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.closingcostsfirst2
                          : 0}
                      </div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2.closingcostssecond2 // if this is closing costs for second mortgage, change to 'closingcostssecond2'
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2.closingcostssecond2 // if this is closing costs for second mortgage, change to 'closingcostssecond2'
                          : 0}
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="tab_contnt">
                      <div className="box">PMI will stop in year</div>
                      <div className="box-1">
                        {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2["PMI-Stop-Year"]
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2["PMI-Stop-Year"]
                          : 0}
                      </div>
                      <div className="box-1"></div>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </TabPanel>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(MortgageSummary);
