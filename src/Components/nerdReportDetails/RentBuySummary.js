import { withRouter, Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
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
// import { Button } from "@material-ui/core";
import Header from "../../common/header";
import "./nerdReportDetails.css";

import renthouseactive from "../../assets/images/rent-house_active.png";
import buyhouseactive from "../../assets/images/buy-home_active.png";

import { Button } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function RentBuySummary(props) {
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
  const [scenariodisable, setScenariodisable] = useState(false);
  useEffect(() => {
    checkScenario()
 }, [scenariodisable])
 const checkScenario = () => {
     if ((CalculatorResponse.FRM2 && (CalculatorResponse.FRM2.Rent || CalculatorResponse.FRM2.Buy)) || (CalculatorResponse.ARM2 && (CalculatorResponse.ARM2.Rent || CalculatorResponse.ARM2.Buy)) ) {
       setScenariodisable(false)
     } else {
       setScenariodisable(true)
     }
 }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header type="Rent vs Buy Summary" className="header-row" />

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
            <Tab label={<span><b>Scenario 2</b> </span>} disabled={scenariodisable} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MDBRow className="margin_30">
              <MDBCol col="10" md="10">
              
              </MDBCol>
              <MDBCol col="4" md="5">
                {
                  (CalculatorResponse && CalculatorResponse.FRM1 && CalculatorResponse.FRM1.Buy) || (CalculatorResponse && CalculatorResponse.ARM1 && CalculatorResponse.ARM1.Buy)
                   ? <img src={buyhouseactive} className="" alt="" /> 
                   : null
                }

                {
                  (CalculatorResponse && CalculatorResponse.FRM1 && CalculatorResponse.FRM1.Rent) || (CalculatorResponse && CalculatorResponse.ARM1 && CalculatorResponse.ARM1.Rent)
                   ? <img src={renthouseactive} className="" alt="" /> 
                   : null
                }
                             
              </MDBCol>
        
              <MDBCol col="10" md="10">
                <br></br>
             <b> 
                  {
                     CalculatorResponse && CalculatorResponse.ARM1
                     ? CalculatorResponse.ARM1.Rent
                     : CalculatorResponse && CalculatorResponse.FRM1
                     ? CalculatorResponse.FRM1.Rent
                     : 0
                  }
               {
                     CalculatorResponse && CalculatorResponse.FRM1
                     ? CalculatorResponse.FRM1.Buy
                     : CalculatorResponse && CalculatorResponse.ARM1
                     ? CalculatorResponse.ARM1.Buy
                     : 0
                  }
                  
                  </b>{" "}
                    <span className="rent_by_amount">   
                       {
                     CalculatorResponse && CalculatorResponse.ARM1
                     ? CalculatorResponse.ARM1["better-renting-by"]
                     : CalculatorResponse && CalculatorResponse.FRM1
                     ? CalculatorResponse.FRM1["better-renting-by"]
                     : 0
                  }
                        {
                     CalculatorResponse && CalculatorResponse.FRM1
                     ? CalculatorResponse.FRM1["better-buying-by"]
                     : CalculatorResponse && CalculatorResponse.ARM1
                     ? CalculatorResponse.ARM1["better-buying-by"]
                     : 0
                  }
                  
                  
                  </span>
              </MDBCol>
            </MDBRow>

         
            <br></br>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <MDBRow className="margin_30">
              <MDBCol col="10" md="10">
             
              </MDBCol>
              <MDBCol col="4" md="5">
                {
                  (CalculatorResponse && CalculatorResponse.FRM2 && CalculatorResponse.FRM2.Buy) || (CalculatorResponse && CalculatorResponse.ARM2 && CalculatorResponse.ARM2.Buy)
                   ? <img src={buyhouseactive} className="" alt="" /> 
                   : null
                }

                {
                  (CalculatorResponse && CalculatorResponse.FRM2 && CalculatorResponse.FRM2.Rent) || (CalculatorResponse && CalculatorResponse.ARM2 && CalculatorResponse.ARM2.Rent)
                   ? <img src={renthouseactive} className="" alt="" /> 
                   : null
                }
                             
              </MDBCol>
         

              <MDBCol col="10" md="10">
                <br></br>
               <b>  {
                     CalculatorResponse && CalculatorResponse.ARM2
                     ? CalculatorResponse.ARM2.Rent
                     : CalculatorResponse && CalculatorResponse.FRM2
                     ? CalculatorResponse.FRM2.Rent
                     : 0
                  }
               {
                     CalculatorResponse && CalculatorResponse.FRM2
                     ? CalculatorResponse.FRM2.Buy
                     : CalculatorResponse && CalculatorResponse.ARM2
                     ? CalculatorResponse.ARM2.Buy
                     : 0
                  }
                  
                  {" "}
                  
                  </b>
               <span className="rent_by_amount">            {
                     CalculatorResponse && CalculatorResponse.ARM2
                     ? CalculatorResponse.ARM2["better-renting-by"]
                     : CalculatorResponse && CalculatorResponse.FRM2
                     ? CalculatorResponse.FRM2["better-buying-by"]
                     : 0
                  }
                        {
                     CalculatorResponse && CalculatorResponse.FRM2
                     ? CalculatorResponse.FRM2["better-renting-by"]
                     : CalculatorResponse && CalculatorResponse.ARM2
                     ? CalculatorResponse.ARM2["better-buying-by"]
                     : 0
                  }
                <br /></span>
              
              </MDBCol>
            </MDBRow>


            <br></br>

          </TabPanel>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(RentBuySummary);
