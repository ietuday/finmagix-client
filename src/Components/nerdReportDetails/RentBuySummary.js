import { withRouter, Redirect, Link } from "react-router-dom";
import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBContainer } from 'mdbreact';
// import { Button } from "@material-ui/core";
import Header from '../../common/header';
import './nerdReportDetails.css';

import { Button } from "@material-ui/core";



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function RentBuySummary(props) {
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
    CalculatorResponse = JSON.parse(localStorage.getItem('calculatorResponse'))
    singlePropertyResponse = JSON.parse(localStorage.getItem('GetSinglePropertyResponse'));
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Fragment>
      <Header type="Rent vs Buy Summary" className="header-row" />
 
      <MDBContainer>
      <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light">
      <Link to="/nerd-report">Go to Nerd Report</Link>
</Button>
        <MDBCard className="margin10">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="Scenario 1" />
              <Tab label="Scenario 2" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>


          <MDBRow className="margin_30">
  <MDBCol col="10" md="10">
    <h6>Rent</h6>
    <div className="progress" style={{ height: "30px" }}>

      <div
        className="progress-bar-dgreen"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

  </MDBCol>
  <MDBCol col="2" md="2">
    <br></br>
    {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1['better-renting-by']
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1['better-renting-by']
                          : 0}
  </MDBCol> 

</MDBRow>
<MDBRow className="margin_30">
  <MDBCol col="10" md="10">
    <h6>Buy Home</h6>
    <div className="progress" style={{ height: "30px" }}>

      <div
        className="progress-bar-pgreen"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

  </MDBCol>
  <MDBCol col="2" md="2">
    <br></br>
    {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1['better-buying-by']
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1['better-buying-by']
                          : 0}
  </MDBCol> 

</MDBRow>
<br></br>
<h4>For the duration of your stay, you are better off buying home</h4>
          </TabPanel>
          <TabPanel value={value} index={1}>
        

          <MDBRow className="margin_30">
  <MDBCol col="10" md="10">
    <h6>Rent</h6>
    <div className="progress" style={{ height: "30px" }}>

      <div
        className="progress-bar-dgreen"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

  </MDBCol>
  <MDBCol col="2" md="2">
    <br></br>
    {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2['better-renting-by']
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2['better-renting-by']
                          : 0}
  </MDBCol> 

</MDBRow>
<MDBRow className="margin_30">
  <MDBCol col="10" md="10">
    <h6>Buy Home</h6>
    <div className="progress" style={{ height: "30px" }}>

      <div
        className="progress-bar-pgreen"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

  </MDBCol>
  <MDBCol col="2" md="2">
    <br></br>
    {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2['better-buying-by']
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2['better-buying-by']
                          : 0}
  </MDBCol> 

</MDBRow>
<br></br>
<h4>Rent and Buy scenarios are the same based on current assumptions</h4>

          </TabPanel>

        </MDBCard>

      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(RentBuySummary);