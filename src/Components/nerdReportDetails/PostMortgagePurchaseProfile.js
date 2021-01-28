import { withRouter, Redirect, Link, PureComponent } from "react-router-dom";
import React, { Fragment, useMemo  } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  PieChart, 
  Pie, 
  Sector
} from "recharts"
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
import { Button } from "@material-ui/core";
import Header from "../../common/header";
import "./nerdReportDetails.css";

const COLORS = ["#32C0CC", "#19AAF2", "#88E6A1", "#EFB1EF"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}
const blues = [
  ["#33c0cc"],
  ["#19aaf2"],
  ["#88e6a1"],
  ["#efb1ef"]
];

const getColor = (length, index) => {
  
    return blues[index];
  // }

  // return blues[blues.length - 1][index % blues.length];
};


const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </Text>
  );
};

let ctx;

export const measureText14HelveticaNeue = text => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

function PostMortgagePurchaseProfile(props) {
  

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
  }
 
  const data2 = [
    { name: "Home expenses post tax", pv: parseFloat(String(CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Homeexpensesposttax2
      : CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Homeexpensesposttax2
      : 0).replace(/,/g, ""))},
    { name: "Estimated tax", pv: parseFloat(String(CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Estimatedtax
      : CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Estimatedtax
      : 0).replace(/,/g, ""))},
    { name: "Total Non Housing", pv: parseFloat(String(CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2._Totalnonhousing
      : CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2._Totalnonhousing
      : 0).replace(/,/g, "")) },
    { name: "Balance Option", pv: parseFloat(String(CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Balanceoption2
      : CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Balanceoption2
      : 0).replace(/,/g, "")) }
  ];


  const data = [
    { name: "Home expenses post tax", pv: parseFloat(String(CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Homeexpensesposttax1
      : CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Homeexpensesposttax1
      : 0).replace(/,/g, ""))},
    { name: "Estimated tax", pv: parseFloat(String(CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Estimatedtax
      : CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Estimatedtax
      : 0).replace(/,/g, ""))},
    { name: "Total Non Housing", pv: parseFloat(String(CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1._Totalnonhousing
      : CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1._Totalnonhousing
      : 0).replace(/,/g, "")) },
    { name: "Balance Option", pv: parseFloat(String(CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Balanceoption1
      : CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Balanceoption1
      : 0).replace(/,/g, "")) }
  ];




  const xKey="name";
  const yKey="pv";
  //  yKey, xKey
  console.log("data",data)
  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [data, yKey]
  );
  let ga1 =
    CalculatorResponse && CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Homeexpensesposttax1
      : CalculatorResponse && CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Homeexpensesposttax1
      : 0;
  ga1 = parseFloat(String(ga1).replace(/,/g, ""));

  let ga2 =
    CalculatorResponse && CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Homeexpensesposttax2
      : CalculatorResponse && CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Homeexpensesposttax2
      : 0;

  ga2 = parseFloat(String(ga2).replace(/,/g, ""));

  let gb1 =
    CalculatorResponse && CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Estimatedtax
      : CalculatorResponse && CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Estimatedtax
      : 0;

  gb1 = parseFloat(String(gb1).replace(/,/g, ""));

  let gb2 =
    CalculatorResponse && CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Estimatedtax
      : CalculatorResponse && CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Estimatedtax
      : 0;
  gb2 = parseFloat(String(gb2).replace(/,/g, ""));

  let gc1 =
    CalculatorResponse && CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1._Totalnonhousing
      : CalculatorResponse && CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1._Totalnonhousing
      : 0;

  gc1 = parseFloat(String(gc1).replace(/,/g, ""));

  let gc2 =
    CalculatorResponse && CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2._Totalnonhousing
      : CalculatorResponse && CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2._Totalnonhousing
      : 0;
  gc2 = parseFloat(String(gc2).replace(/,/g, ""));

  let gd1 =
    CalculatorResponse && CalculatorResponse.FRM1
      ? CalculatorResponse.FRM1.Balanceoption1
      : CalculatorResponse && CalculatorResponse.ARM1
      ? CalculatorResponse.ARM1.Balanceoption1
      : 0;

  gd1 = parseFloat(String(gd1).replace(/,/g, ""));

  let gd2 =
    CalculatorResponse && CalculatorResponse.FRM2
      ? CalculatorResponse.FRM2.Balanceoption2
      : CalculatorResponse && CalculatorResponse.ARM2
      ? CalculatorResponse.ARM2.Balanceoption2
      : 0;
  gd2 = parseFloat(String(gd2).replace(/,/g, ""));

  const piedata = [
    {
      name: "Group A",
      value:
        (CalculatorResponse && CalculatorResponse.ARM1) ||
        (CalculatorResponse && CalculatorResponse.FRM1)
          ? Math.abs(ga1)
          : (CalculatorResponse && CalculatorResponse.ARM2) ||
            (CalculatorResponse && CalculatorResponse.FRM2)
          ? Math.abs(ga2)
          : 0,
    },
    {
      name: "Group B",
      value:
        (CalculatorResponse && CalculatorResponse.ARM1) ||
        (CalculatorResponse && CalculatorResponse.FRM1)
          ? Math.abs(gb1)
          : (CalculatorResponse && CalculatorResponse.ARM2) ||
            (CalculatorResponse && CalculatorResponse.FRM2)
          ? Math.abs(gb2)
          : 0,
    },
    {
      name: "Group C",
      value:
        (CalculatorResponse && CalculatorResponse.ARM1) ||
        (CalculatorResponse && CalculatorResponse.FRM1)
          ? Math.abs(gc1)
          : (CalculatorResponse && CalculatorResponse.ARM2) ||
            (CalculatorResponse && CalculatorResponse.FRM2)
          ? Math.abs(gc2)
          : 0,
    },
    {
      name: "Group D",
      value:
        (CalculatorResponse && CalculatorResponse.ARM1) ||
        (CalculatorResponse && CalculatorResponse.FRM1)
          ? Math.abs(gd1)
          : (CalculatorResponse && CalculatorResponse.ARM2) ||
            (CalculatorResponse && CalculatorResponse.FRM2)
          ? Math.abs(gd2)
          : 0,
    },
  ];

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header type="Post Mortgage Purchase Profile" className="header-row" />

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
                {" "}
                The pie chart shows the distribution of monthly spend. The
                Balance represents the difference between your monthly income
                and your monthly spend.
              </p>
              <div className="CardTitle">
                For{" "}
                {CalculatorResponse.ARM1
                  ? "ARM"
                  : CalculatorResponse.FRM1
                  ? "FRM"
                  : ""}
              </div>
              {}
              <PieChart width={400} height={230}>
                <Pie
                  data={piedata}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 130, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
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
          tickFormatter={value => value.toLocaleString()}
          mirror
          tick={{
            transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
          }}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {data.map((d, idx) => {
            return <Cell key={d[xKey]} fill={getColor(data.length, idx)} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

              {/* <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Home expenses post tax{" "}
                    <b>
                      {CalculatorResponse.ARM1
                        ? CalculatorResponse.ARM1.Homeexpensesposttax1
                        : CalculatorResponse.FRM1
                        ? CalculatorResponse.FRM1.Homeexpensesposttax1
                        : 0}
                    </b>
                  </h6>
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
              </MDBRow>
              <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Estimated tax{" "}
                    <b>
                      {CalculatorResponse.ARM1
                        ? CalculatorResponse.ARM1.Estimatedtax
                        : CalculatorResponse.FRM1
                        ? CalculatorResponse.FRM1.Estimatedtax
                        : 0}
                    </b>
                  </h6>
                  <div className="progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar-pink"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Total Non Housing{" "}
                    <b>
                      {CalculatorResponse.ARM1
                        ? CalculatorResponse.ARM1._Totalnonhousing
                        : CalculatorResponse.FRM1
                        ? CalculatorResponse.FRM1._Totalnonhousing
                        : 0}
                    </b>
                  </h6>
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
              </MDBRow>
              <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Balance Option{" "}
                    <b>
                      {CalculatorResponse.ARM1
                        ? CalculatorResponse.ARM1.Balanceoption1
                        : CalculatorResponse.FRM1
                        ? CalculatorResponse.FRM1.Balanceoption1
                        : 0}
                    </b>
                  </h6>
                  <div className="progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar-blue"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
              </MDBRow> */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <p>
                {" "}
                The pie chart shows the distribution of monthly spend. The
                Balance represents the difference between your monthly income
                and your monthly spend.
              </p>
              <div className="CardTitle">
                For{" "}
                {CalculatorResponse.ARM2
                  ? "ARM"
                  : CalculatorResponse.FRM2
                  ? "FRM"
                  : ""}
              </div>

              <PieChart width={400} height={230}>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>

              {/* <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Home expenses post tax{" "}
                    <b>
                      {CalculatorResponse.ARM2
                        ? CalculatorResponse.ARM2.Homeexpensesposttax2
                        : CalculatorResponse.FRM2
                        ? CalculatorResponse.FRM2.Homeexpensesposttax2
                        : 0}
                    </b>{" "}
                  </h6>
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
              </MDBRow> */}
              {/* <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Estimated tax{" "}
                    <b>
                      {CalculatorResponse.ARM2
                        ? CalculatorResponse.ARM2.Estimatedtax
                        : CalculatorResponse.FRM2
                        ? CalculatorResponse.FRM2.Estimatedtax
                        : 0}
                    </b>
                  </h6>
                  <div className="progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar-pink"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
              </MDBRow> */}

              {/* <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Total Non Housing{" "}
                    <b>
                      {CalculatorResponse.ARM2
                        ? CalculatorResponse.ARM2._Totalnonhousing
                        : CalculatorResponse.FRM2
                        ? CalculatorResponse.FRM2._Totalnonhousing
                        : 0}
                    </b>
                  </h6>
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
              </MDBRow> */}

              {/* <MDBRow className="margin_30">
                <MDBCol col="12" md="12">
                  <h6>
                    Balance Option{" "}
                    <b>
                      {CalculatorResponse.ARM1
                        ? CalculatorResponse.ARM2.Balanceoption2
                        : CalculatorResponse.FRM2
                        ? CalculatorResponse.FRM2.Balanceoption2
                        : 0}
                    </b>
                  </h6>
                  <div className="progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar-blue"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </MDBCol>
              </MDBRow> */}
            <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
      <BarChart
        data={data2}
        layout="vertical"
        margin={{ left: 130, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
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
          tickFormatter={value => value.toLocaleString()}
          mirror
          tick={{
            transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
          }}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {data.map((d, idx) => {
            return <Cell key={d[xKey]} fill={getColor(data.length, idx)} />;
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
export default withRouter(PostMortgagePurchaseProfile);
