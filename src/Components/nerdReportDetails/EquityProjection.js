import { withRouter, Link } from "react-router-dom";
import React, { useMemo, Fragment} from "react";
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
  YAxis,
  // Legend,
  ResponsiveContainer,
  Cell,
  Text,
} from "recharts";

export const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "8px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

let ctx;

const mortgageBlues = [
  ["#00aff0"],
  ["#00aff0"],
  ['#2FD411'],
  ['#2FD411']
];

const getMortageColor = (length, index) => {
  return mortgageBlues[index];
};

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </Text>
  );
};

const BAR_AXIS_SPACE =100;

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
        pv:
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
        pv:
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
        pv:
          (CalculatorResponse && CalculatorResponse.ARM2) ||
              (CalculatorResponse && CalculatorResponse.FRM2)
            ? at2
            : 0
      },
      {
        name: "Equity",
        pv:
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

  const xKey = "name";
  const yKey = "pv";

  const maxTextWidthLoan = useMemo(
    () =>
      data1.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),[]
    // [data1, yKey]
  );

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
              <Tab label={<span><b>Scenario 1</b> </span>} />
              <Tab label={<span><b>Scenario 2</b> </span>} />
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
      <ResponsiveContainer
          width={"100%"}
          height={50 * data1.length}
          debounce={50}
        >
          <BarChart
            data={data1}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthLoan + (BAR_AXIS_SPACE - 8),
            }}
          >
            <XAxis hide axisLine={false} type="number" />
            <YAxis
              yAxisId={0}
              dataKey={xKey}
              type="category"
              axisLine={false}
              tickLine={false}
              tick={YAxisLeftTick}
            />
            <YAxis
              orientation="right"
              yAxisId={1}
              dataKey={yKey}
              type="category"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              mirror
              tick={{
                transform: `translate(${maxTextWidthLoan + BAR_AXIS_SPACE}, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {data1.map((d, idx) => {
                return (
                  <Cell key={d[xKey]} fill={getMortageColor(data1.length, idx)} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
      <ResponsiveContainer
          width={"100%"}
          height={50 * data2.length}
          debounce={50}
        >
          <BarChart
            data={data2}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthLoan + (BAR_AXIS_SPACE - 8),
            }}
          >
            <XAxis hide axisLine={false} type="number" />
            <YAxis
              yAxisId={0}
              dataKey={xKey}
              type="category"
              axisLine={false}
              tickLine={false}
              tick={YAxisLeftTick}
            />
            <YAxis
              orientation="right"
              yAxisId={1}
              dataKey={yKey}
              type="category"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              mirror
              tick={{
                transform: `translate(${maxTextWidthLoan + BAR_AXIS_SPACE}, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {data1.map((d, idx) => {
                return (
                  <Cell key={d[xKey]} fill={getMortageColor(data2.length, idx)} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
            </div>
          </TabPanel>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
}
export default withRouter(EquityProjection);
