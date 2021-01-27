import React, { Component, Fragment, PureComponent } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { withRouter, Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Chart } from "react-google-charts";

import { Button } from "@material-ui/core";
import "../../css/reports.css";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const data = [
  {
    name: "First Mortage Amount",
    MortgageAmount: 40000,
    MonthlyMortgagePayment: 8000,
  },
];

const data1 = [
  {
    name: "Housing Payment",
    Amount1: 20000,
    Amount2: 8000,
  },
];

const data2 = [
  {
    name: "Projected Equity",
    Amount1: 5000,
    Amount2: 8000,
  },
];

const renderCustomizedLabel = (props) => {
  console.log("props", props);
  const { x, y, width, height, value } = props;
  const radius = 10;
};

export class CheatSheet extends Component {
  constructor(props) {
    super();
    this.state = {
      homeScreen: false,
      cheatSheet: false,
      mortgageProgram: [],
      housingPayment: [],
      projectedEquity: [],
      afterHomePurchaseSpendProfile: [],
      buy: [],
      taxImpact: [],
    };
    // console.log(this.props.location.state.CalculatorResponse)
  }
  goToHomeScreen = () => {
    this.setState({
      homeScreen: !this.state.homeScreen,
    });
  };
  componentDidMount() {
    // console.log(this.props.location.state.CalculatorResponse)
    if (
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.CalculatorResponse
    ) {

      // {
      //   name: 'First Mortage Amount', Amount1: 40000, Amount2: 8000,
      // },
      // {
      //   name: 'Second Mortage Amount', Amount1: 3000, Amount2: 6000,
      // },
      // {
      //   name: 'Housing Payment', Amount1: 29000, Amount2: 25000,
      // },
      // {
      //   name: 'Projected Equity', Amount1: 500000, Amount2: 450000,
      // },
      const { CalculatorResponse } = this.props.location.state;
      this.setState({
        mortgageProgram: [
          {
            name: `First Mortage Program`,
            MortgageAmount: parseFloat(
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
            MonthlyMortgagePayment: parseFloat(
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
            name: `Second Mortage Program`,
            MortgageAmount: parseFloat(
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
            MonthlyMortgagePayment: parseFloat(
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
        ],

        housingPayments: [
          {
            name: `housing Payment`,
            housingPayment: parseFloat(
              String(
                `${
                  CalculatorResponse.ARM1
                    ? CalculatorResponse.ARM1.HousingpaymentcomboARM
                    : CalculatorResponse.FRM1
                    ? CalculatorResponse.FRM1.HousingpaymentcomboARM
                    : 0
                }`
              ).replace(/,/g, "")
            ),
            totalhousingPayment: parseFloat(
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
          
 
        ],

        projectedEquitys: [
          {
            name: `Projected Equity`,
            projectedEquityptionscenario1: parseFloat(
              String(
                `${
                  CalculatorResponse.ARM1
                    ? CalculatorResponse.ARM1.ProjectedequityARMOption1
                    : CalculatorResponse.FRM1
                    ? CalculatorResponse.FRM1.ProjectedequityARMOption1
                    : 0
                }`
              ).replace(/,/g, "")
            ),
            projectedEquityptionscenario2: parseFloat(
              String(
                `${
                  CalculatorResponse.ARM2
                    ? CalculatorResponse.ARM2.ProjectedequityARMOption2
                    : CalculatorResponse.FRM2
                    ? CalculatorResponse.FRM2.ProjectedequityARMOption2
                    : 0
                }`
              ).replace(/,/g, "")
            ),
          },
          
 
        ],      


        afterHomePurchaseSpendProfile: [
          {
            name: `After home purchase spend profile`,
            HomePurchaseSpendProfilescenario1: parseFloat(
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
            HomePurchaseSpendProfilescenario2: parseFloat(
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
          
 
        ],  


        taxImpact: [
          {
            name: `Tax impact`,
            Taximpactscenario1: parseFloat(
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
            Taximpactscenario2: parseFloat(
              String(
                `${
                  CalculatorResponse.ARM2
                    ? CalculatorResponse.ARM2.Taxbenfithomeoption2
                    : CalculatorResponse.FRM2
                    ? CalculatorResponse.FRM2.Taxbenfithomeoption2
                    : 0
                }`
              ).replace(/,/g, "")
            ),
          },
          
 
        ],  


        
      });
    }
  }
  render() {
    const {
      singlePropertyResponse,
      CalculatorResponse,
    } = this.props.location.state;
    if (this.state.homeScreen) {
      return (
        <Redirect
          to={{
            pathname: "/show-detailed-reports",
            state: { propertyId: singlePropertyResponse.id },
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header type="Report" />
        <MDBContainer className="report-container">
          <Button
            size="medium"
            className="btn btn-primary btn-sm waves-effect waves-light"
            onClick={this.goToHomeScreen}
          >
            Go To Reports Screen
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
 

          
          <MDBRow>
            <MDBCol>
              <h6 className="CardTitle">Loan Program Comparison</h6>
              <div>
                <BarChart
                  width={600}
                  height={400}
                  data={this.state.mortgageProgram}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="MortgageAmount" fill="#4d6fc4" minPointSize={5}>
                    {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                  </Bar>
                  <Bar
                    dataKey="MonthlyMortgagePayment"
                    fill="#97d24f"
                    minPointSize={10}
                  />
                </BarChart>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <h6 className="CardTitle">Housing Payment</h6>
              <div>
                <BarChart
                  width={600}
                  height={400}
                  data={this.state.housingPayments}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="housingPayment" fill="#4d6fc4" minPointSize={5}>
                    {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                  </Bar>
                  <Bar
                    dataKey="totalhousingPayment"
                    fill="#97d24f"
                    minPointSize={10}
                  />
                </BarChart>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <h6 className="CardTitle">Projected Equity</h6>
              <div>
                <BarChart
                  width={600}
                  height={400}
                  data={this.state.projectedEquitys}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="projectedEquityptionscenario1" fill="#4d6fc4" minPointSize={5}>
                    {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                  </Bar>
                  <Bar
                    dataKey="projectedEquityptionscenario2"
                    fill="#97d24f"
                    minPointSize={10}
                  />
                </BarChart>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <h6 className="CardTitle">After home purchase spend profile</h6>
              <div>
                <BarChart
                  width={600}
                  height={400}
                  data={this.state.afterHomePurchaseSpendProfile}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="HomePurchaseSpendProfilescenario1" fill="#4d6fc4" minPointSize={5}>
                    {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                  </Bar>
                  <Bar
                    dataKey="HomePurchaseSpendProfilescenario2"
                    fill="#97d24f"
                    minPointSize={10}
                  />
                </BarChart>
              </div>
            </MDBCol>
          </MDBRow>
          

          <MDBRow>
            <MDBCol>
              <h6 className="CardTitle">Tax Impact</h6>
              <div>
                <BarChart
                  width={600}
                  height={400}
                  data={this.state.taxImpact}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="Taximpactscenario1" fill="#4d6fc4" minPointSize={5}>
                    {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
                  </Bar>
                  <Bar
                    dataKey="Taximpactscenario2"
                    fill="#97d24f"
                    minPointSize={10}
                  />
                </BarChart>
              </div>
            </MDBCol>
          </MDBRow>


        </MDBContainer>
        <br />
        <br />
      </Fragment>
    );
  }
}
export default withRouter(CheatSheet);
