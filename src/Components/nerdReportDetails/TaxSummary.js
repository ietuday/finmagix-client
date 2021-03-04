import { withRouter, Redirect, Link } from "react-router-dom";
import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { MDBBtn, MDBCard,   MDBContainer } from 'mdbreact';
import { Button } from "@material-ui/core";
import Header from '../../common/header';
import './nerdReportDetails.css';

// import { Button } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function TaxSummary(props) {
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
    CalculatorResponse = JSON.parse(localStorage.getItem('calculatorResponse'));
    singlePropertyResponse = JSON.parse(localStorage.getItem('GetSinglePropertyResponse'));
    
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Fragment>
      <Header type="Tax Summary" className="header-row" />

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
<div>
    <p>Tax benefit of buying a home for Option #1 for first year is {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1['Taxbenfithomeoption1']
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1['Taxbenfithomeoption1']
                          : 0}</p>
    <p>    As a result of this home purchase, your margin tax rate is projected to
          improve by {CalculatorResponse.ARM1
                          ? CalculatorResponse.ARM1['marginal-tax-rate-improve']
                          : CalculatorResponse.FRM1
                          ? CalculatorResponse.FRM1['marginal-tax-rate-improve']
                          : 0} </p>
          <p>
          To determine the tax benefit of buying a home, we calculate standard deductions and itemized deductions.
           Itemized deductions include amounts related to housing that can be deducted such as property tax and mortgage interest. 
           If your itemized deductions exceed your standardized deductions, then there’s a tax benefit associated with purchasing this home based on the assumptions you inputted.
          </p>
</div>
         
          </TabPanel>
          <TabPanel value={value} index={1}>
          <div>
    <p>Tax benefit of buying a home for Option #1 for first year is {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2['Taxbenfithomeoption2']
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2['Taxbenfithomeoption2']
                          : 0}</p>
    <p>    As a result of this home purchase, your margin tax rate is projected to
          improve by {CalculatorResponse.ARM2
                          ? CalculatorResponse.ARM2['marginal-tax-rate-improve']
                          : CalculatorResponse.FRM2
                          ? CalculatorResponse.FRM2['marginal-tax-rate-improve']
                          : 0}  </p>
          <p>
          To determine the tax benefit of buying a home, we calculate standard deductions and itemized deductions.
           Itemized deductions include amounts related to housing that can be deducted such as property tax and mortgage interest. 
           If your itemized deductions exceed your standardized deductions, then there’s a tax benefit associated with purchasing this home based on the assumptions you inputted.
          </p>
</div>
      

          </TabPanel>

        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(TaxSummary);