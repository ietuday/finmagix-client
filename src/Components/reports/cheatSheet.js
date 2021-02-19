import React, { useMemo, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Header from "../../common/header";
import { withRouter, Redirect, Link } from "react-router-dom";
import "../../css/reports.css";
// import "./nerdReportDetails.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  Tooltip
} from "recharts";

// import "./styles.css";

const blues = [
  ["#00aff0"],
  ['#97d24f'],
  ["#00aff0"],
  ['#97d24f']
];
const getColor = (length, index) => {
  return blues[index];
};

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={0} y={y} textAnchor="start" verticalAnchor="middle" scaleToFit>
      {value}
    </Text>
  );
};

let ctx;

export const measureText14HelveticaNeue = (text) => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "8px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE =100;

function CheatSheet(props) {
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

 




  const loandata = [
    {
      name: "Loan Amount First",  
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.loanamountfirst1
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.loanamountfirst1
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: ((CalculatorResponse.ARM1 && CalculatorResponse.ARM1.loanamountsecond1) || (CalculatorResponse.FRM1 && CalculatorResponse.FRM1.loanamountsecond1)) ? "Loan Amount Second" : "PMI Amount",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? (CalculatorResponse.ARM1.loanamountsecond1 ? CalculatorResponse.ARM1.loanamountsecond1 :CalculatorResponse.ARM1.pmi)
              : CalculatorResponse.FRM1
              ? (CalculatorResponse.FRM1.loanamountsecond1 ? CalculatorResponse.FRM1.loanamountsecond1 :CalculatorResponse.FRM1.pmi)
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Loan Amount First",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2.loanamountfirst2
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2.loanamountfirst2
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: ((CalculatorResponse.ARM2 && CalculatorResponse.ARM2.loanamountsecond2) || (CalculatorResponse.FRM2 && CalculatorResponse.FRM2.loanamountsecond1)) ? "Loan Amount Second" : "PMI Amount",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? (CalculatorResponse.ARM2.loanamountsecond2 ? CalculatorResponse.ARM2.loanamountsecond2 :CalculatorResponse.ARM2.pmi)
              : CalculatorResponse.FRM2
              ? (CalculatorResponse.FRM2.loanamountsecond1 ? CalculatorResponse.FRM2.loanamountsecond1 :CalculatorResponse.FRM2.pmi)
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
  ];

  const paymentdata = [
    {
      name: "First Mortage Payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1["mth-mrtg-exp"]
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1["mth-mrtg-exp"]
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Second Mortage payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.Paymentsecond1
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.Paymentsecond1
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "First Mortage Payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2["mth-mrtg-exp"]
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2["mth-mrtg-exp"]
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Second Mortage payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2.Paymentsecond2
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2.Paymentsecond2
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
  ];

  const housingdata = [
    {
      name: "Housing Payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.HousingpaymentcomboARM
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.HousingpaymentcomboFRM
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Total Housing Payment",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2["total-mth-hsg-pay"]
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2["total-mth-hsg-pay"]
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
  ];

  const projectedEquitydata = [
    {
      name: "Scenario1",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.ProjectedequityARMOption1
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.ProjectedequityFRMOption1
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Scenario2",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2.ProjectedequityARMOption2
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2.ProjectedequityFRMOption2
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
  ];

  const afterHomedata = [
    {
      name: "Scenario1",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.Balanceoption1
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.Balanceoption1
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Scenerio2",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2.Balanceoption2
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2.Balanceoption2
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
  ];

  const taxImpact = [
    {
      name: "Scenario1",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM1
              ? CalculatorResponse.ARM1.Taxbenfithomeoption1
              : CalculatorResponse.FRM1
              ? CalculatorResponse.FRM1.Taxbenfithomeoption1
              : 0
          }`
        ).replace(/,/g, "")
      ),
    },
    {
      name: "Scenario2",
      Amount: parseFloat(
        String(
          `${
            CalculatorResponse.ARM2
              ? CalculatorResponse.ARM2.Taxbenfithomeoption2
              : CalculatorResponse.FRM2
              ? CalculatorResponse.FRM2.Taxbenfithomeoption2
              : 0
          }`
        ).replace(/,/g, "")
      )
    },
  ];

  const xKey = "name";
  const yKey = "Amount";

  const maxTextWidthLoan = useMemo(
    () =>
      loandata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [loandata, yKey]
  );

  const maxTextWidthPayment = useMemo(
    () =>
      paymentdata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [paymentdata, yKey]
  );

  const maxTextWidthHousing = useMemo(
    () =>
      housingdata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [housingdata, yKey]
  );

  const maxTextWidthProjected = useMemo(
    () =>
      projectedEquitydata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [projectedEquitydata, yKey]
  );

  const maxTextWidthafterHome = useMemo(
    () =>
      afterHomedata.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [afterHomedata, yKey]
  );

  const maxTextWidthtaxImpact = useMemo(
    () =>
      taxImpact.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [taxImpact, yKey]
  );

  return (
    <Fragment>
      <Header type="Report" />
      <MDBContainer className="report-container">
        <Button
          size="medium"
          className="btn btn-primary btn-sm waves-effect waves-light"
        >
          <Link to="/show-detailed-reports">Go to Report</Link>
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
          <MDBCol md="2" size="10">
            <div
              style={{
                width: "150px",
                height: "20px",
                backgroundColor: "#00aff0",
              }}
            ></div>
          </MDBCol>
          <MDBCol md="2" size="10">
            First Scenario
          </MDBCol>
          <MDBCol md="2" size="10">
            <div
              style={{
                width: "150px",
                height: "20px",
                backgroundColor: "#97d24f",
              }}
            ></div>
          </MDBCol>
          <MDBCol md="2" size="10">
            Second Scenario
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            {/* <Card> */}
            <CardContent>
              <MDBRow className="margin20">
                <MDBCol md="9" size="10">
                  <Typography variant="h5" component="h2">
                    Mortgage Program
                  </Typography>
                </MDBCol>
              </MDBRow>
            </CardContent>
            {/* </Card> */}
          </MDBCol>
        </MDBRow>
        <h6 class="CardTitle">Loan Program Comparison</h6>
        <ResponsiveContainer
          width={"100%"}
          height={50 * loandata.length}
          debounce={50}
        >
          <BarChart
            data={loandata}
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
              {loandata.map((d, idx) => {
                return (
                  <Cell key={d[xKey]} fill={getColor(loandata.length, idx)} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <h6 class="CardTitle">Monthly mortgage payments</h6>
        

        <ResponsiveContainer
          width={"100%"}
          height={50 * paymentdata.length}
          debounce={50}
        >
          <BarChart
            data={paymentdata}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthPayment + (BAR_AXIS_SPACE - 8),
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
                transform: `translate(${
                  maxTextWidthPayment + BAR_AXIS_SPACE
                }, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {paymentdata.map((d, idx) => {
                return (
                  <Cell
                    key={d[xKey]}
                    fill={getColor(paymentdata.length, idx)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <h6 class="CardTitle">Housing Payment</h6>

        <ResponsiveContainer
          width={"100%"}
          height={50 * housingdata.length}
          debounce={50}
        >
          <BarChart
            data={housingdata}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthHousing + (BAR_AXIS_SPACE - 8),
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
                transform: `translate(${
                  maxTextWidthHousing + BAR_AXIS_SPACE
                }, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {housingdata.map((d, idx) => {
                return (
                  <Cell
                    key={d[xKey]}
                    fill={getColor(housingdata.length, idx)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <h6 className="CardTitle">Projected Equity</h6>
        

        <ResponsiveContainer
          width={"100%"}
          height={50 * projectedEquitydata.length}
          debounce={50}
        >
          <BarChart
            data={projectedEquitydata}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthProjected + (BAR_AXIS_SPACE - 8),
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
                transform: `translate(${
                  maxTextWidthProjected + BAR_AXIS_SPACE
                }, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {projectedEquitydata.map((d, idx) => {
                return (
                  <Cell
                    key={d[xKey]}
                    fill={getColor(projectedEquitydata.length, idx)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <h6 className="CardTitle">After home purchase spend profile</h6>
        

        <ResponsiveContainer
          width={"100%"}
          height={50 * afterHomedata.length}
          debounce={50}
        >
          <BarChart
            data={afterHomedata}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthafterHome + (BAR_AXIS_SPACE - 8),
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
                transform: `translate(${
                  maxTextWidthafterHome + BAR_AXIS_SPACE
                }, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {afterHomedata.map((d, idx) => {
                return (
                  <Cell
                    key={d[xKey]}
                    fill={getColor(afterHomedata.length, idx)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <h6 className="CardTitle">Tax Impact</h6>

        <ResponsiveContainer
          width={"100%"}
          height={50 * taxImpact.length}
          debounce={50}
        >
          <BarChart
            data={taxImpact}
            layout="vertical"
            margin={{
              left: 125,
              right: maxTextWidthtaxImpact + (BAR_AXIS_SPACE - 8),
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
                transform: `translate(${
                  maxTextWidthtaxImpact + BAR_AXIS_SPACE
                }, 0)`,
              }}
            />
         
            <Bar dataKey={yKey} minPointSize={2} barSize={32}>
              {taxImpact.map((d, idx) => {
                return (
                  <Cell
                    key={d[xKey]}
                    fill={getColor(taxImpact.length, idx)}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </MDBContainer>
      <br></br><br></br>
      <br></br>
    </Fragment>
  );
}

export default withRouter(CheatSheet);
