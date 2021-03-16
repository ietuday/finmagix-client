import { withRouter, Link } from "react-router-dom";
import React, { Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  MDBCard,

  MDBContainer,
} from "mdbreact";
import { Button } from "@material-ui/core";
import Header from "../../common/header";
import "./nerdReportDetails.css";

import {
  BarChart,
  Bar,
  XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
  // Legend,
} from "recharts";

const getIntroOfPage = (label) => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}
let data1 = [];
let data2 = [];

function EquityProjection(props) {
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

    let pv1 =
      CalculatorResponse && CalculatorResponse.ARM1
        ? CalculatorResponse.ARM1.homepricedurationofstay
        : CalculatorResponse && CalculatorResponse.FRM1
        ? CalculatorResponse.FRM1.homepricedurationofstay
        : 0;
      pv1 = parseFloat(String(pv1).replace(/,/g, ''))
    let pv2 =
      CalculatorResponse && CalculatorResponse.ARM2
        ? CalculatorResponse.ARM2.homepricedurationofstay
        : CalculatorResponse && CalculatorResponse.FRM2
        ? CalculatorResponse.FRM2.homepricedurationofstay
        : 0;
        pv2 = parseFloat(String(pv2).replace(/,/g, ''))
    let at1 =
      CalculatorResponse && CalculatorResponse.ARM1
        ? CalculatorResponse.ARM1.EndingARMLoanBaloption1
        : CalculatorResponse && CalculatorResponse.FRM1
        ? CalculatorResponse.FRM1.EndingFRMLoanBaloption1
        : 0;
      at1 = parseFloat(String(at1).replace(/,/g, ''))
    let at2 =
      CalculatorResponse && CalculatorResponse.ARM2
        ? CalculatorResponse.ARM2.EndingARMLoanBaloption2
        : CalculatorResponse && CalculatorResponse.FRM2
        ? CalculatorResponse.FRM2.EndingFRMLoanBaloption2
        : 0;
        at2 = parseFloat(String(at2).replace(/,/g, ''))
    let ct1 =
      CalculatorResponse && CalculatorResponse.ARM1
        ? CalculatorResponse.ARM1.ProjectedequityARMOption1
        : CalculatorResponse && CalculatorResponse.FRM1
        ? CalculatorResponse.FRM1.ProjectedequityFRMOption1
        : 0;
      ct1 = parseFloat(String(ct1).replace(/,/g, ''))
    let ct2 =
      CalculatorResponse && CalculatorResponse.ARM2
        ? CalculatorResponse.ARM2.ProjectedequityARMOption2
        : CalculatorResponse && CalculatorResponse.FRM2
        ? CalculatorResponse.FRM2.ProjectedequityFRMOption2
        : 0;
      ct2 = parseFloat(String(ct2).replace(/,/g, ''))
    data1 = [
      {
        name: "Projected home price",
        pv:
          (CalculatorResponse && CalculatorResponse.ARM1) ||
          (CalculatorResponse && CalculatorResponse.FRM1)
            ? pv1
            : (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? pv2
            : 0
      },
      {
        name: "Loan Balance",
        at:
          (CalculatorResponse && CalculatorResponse.ARM1) ||
          (CalculatorResponse && CalculatorResponse.FRM1)
            ? at1
            : (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? at2
            : 0
      },
      {
        name: "Equity",
        ct:
          (CalculatorResponse && CalculatorResponse.ARM1) ||
          (CalculatorResponse && CalculatorResponse.FRM1)
            ? ct1
            : (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? ct2
            : 0
      },
    ];

    data2 = [
      {
        name: "Projected home price",
        pv:
           (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? pv2
            : 0
      },
      {
        name: "Loan Balance",
        at:
          (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? at2
            : 0
      },
      {
        name: "Equity",
        ct:
          (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? ct2
            : 0
      },
    ];
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header type="Equity Projection" className="header-row" />
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
          <TabPanel value={value} index={0}>
            <div>
              <p>
                Equity represents the difference between your projected home
                price and your total mortgage loan balance at the end of your
                duration of stay of {singlePropertyResponse.stay_duration} years
              </p>
              
              <h4>
                
              {CalculatorResponse.ARM1
                  ? "ARM"
                  : CalculatorResponse.FRM1
                  ? "FRM"
                  : ""}
              </h4>
              <BarChart
                width={300}
                height={400}
                data={data1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />

                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="pv" barSize={40} fill="#32C0CC" />
                <Bar dataKey="at" barSize={40} fill="#19AAF2" />
                <Bar dataKey="ct" barSize={40} fill="#88E6A1" />
              </BarChart>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <p>
                Equity represents the difference between your projected home
                price and your total mortgage loan balance at the end of your
                duration of stay of {singlePropertyResponse.stay_duration} years
              </p>
              
              <h4>
                {CalculatorResponse.ARM2
                  ? "ARM"
                  : CalculatorResponse.FRM2
                  ? "FRM"
                  : ""}
              </h4>
              <BarChart
                  width={300}
                  height={400}
                data={data2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />

                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="pv" barSize={40} fill="#32C0CC" />
                <Bar dataKey="at" barSize={40} fill="#19AAF2" />
                <Bar dataKey="ct" barSize={40} fill="#88E6A1" />
              </BarChart>
            </div>
          </TabPanel>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(EquityProjection);
