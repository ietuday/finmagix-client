// import React, { Component, Fragment, PureComponent } from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
// import { connect } from "react-redux";
// import Header from "../../common/header";
// import { withRouter, Redirect } from "react-router-dom";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import { Chart } from "react-google-charts";

// import { Button } from "@material-ui/core";
// import "../../css/reports.css";

// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   LabelList,
// } from "recharts";

// const renderCustomizedLabel = (props) => {
//   console.log("props", props);
//   const { x, y, width, height, value } = props;
//   const radius = 10;
// };

// export class CheatSheet extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       homeScreen: false,
//       cheatSheet: false,
//       mortgageProgram: [],
//       housingPayment: [],
//       projectedEquity: [],
//       afterHomePurchaseSpendProfile: [],
//       monthlyMortgagePayment:[],
//       buy: [],
//       taxImpact: [],
//     };
//     // console.log(this.props.location.state.CalculatorResponse)
//   }
//   goToHomeScreen = () => {
//     this.setState({
//       homeScreen: !this.state.homeScreen,
//     });
//   };
//   componentDidMount() {
//     // console.log(this.props.location.state.CalculatorResponse)
//     if (
//       this.props &&
//       this.props.location &&
//       this.props.location.state &&
//       this.props.location.state.CalculatorResponse
//     ) {
//       const { CalculatorResponse } = this.props.location.state;
//       this.setState({
//         mortgageProgram: [
//           {
//             name: `FirstMortageProgram`,
//             LoanAmountFirst: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.loanamountfirst1 != 0 ? CalculatorResponse.ARM1.loanamountfirst1:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.loanamountfirst1 != 0 ? CalculatorResponse.FRM1.loanamountfirst1:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             LoanAmountSecond: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.loanamountsecond1 != 0 ? CalculatorResponse.ARM1.loanamountsecond1:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.loanamountsecond1 != 0 ? CalculatorResponse.FRM1.loanamountsecond1:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//           {
//             name: `SecondMortageProgram`,
//             LoanAmountFirst: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2.loanamountfirst2 != 0 ? CalculatorResponse.ARM2.loanamountfirst2:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2.loanamountfirst2 != 0 ? CalculatorResponse.FRM2.loanamountfirst2:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             LoanAmountSecond: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2.loanamountsecond2 != 0 ? CalculatorResponse.ARM2.loanamountsecond2:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2.loanamountsecond2 != 0 ? CalculatorResponse.FRM2.loanamountsecond2:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],

//         monthlyMortgagePayment: [
//           {
//             name: `Firstmortgagepayments`,
//             FirstMortgagePayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1["mth-mrtg-exp"] != 0 ? CalculatorResponse.ARM1["mth-mrtg-exp"]:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1["mth-mrtg-exp"] != 0 ? CalculatorResponse.FRM1["mth-mrtg-exp"]:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             SecondMortgagePayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1["mth-mrtg-exp"] != 0 ? CalculatorResponse.ARM1["mth-mrtg-exp"]:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1["mth-mrtg-exp"] != 0 ? CalculatorResponse.FRM1["mth-mrtg-exp"]:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//           {
//             name: `MortgagePayment`,
//             FirstMortgagePayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2["mth-mrtg-exp"] != 0 ? CalculatorResponse.ARM2["mth-mrtg-exp"]:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2["mth-mrtg-exp"] != 0 ? CalculatorResponse.FRM2["mth-mrtg-exp"]:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             SecondMortgagePayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2["mth-mrtg-exp"] != 0 ? CalculatorResponse.ARM2["mth-mrtg-exp"]:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2["mth-mrtg-exp"] != 0 ? CalculatorResponse.FRM2["mth-mrtg-exp"]:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],

//         housingPayment: [
//           {
//             name: `HousingPayment`,
//             HousingPayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.HousingpaymentcomboARM != 0 ? CalculatorResponse.ARM1.HousingpaymentcomboARM:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.HousingpaymentcomboFRM != 0 ? CalculatorResponse.FRM1.HousingpaymentcomboFRM:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             TotalHousingPayment: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2["total-mth-hsg-pay"] != 0 ? CalculatorResponse.ARM2["total-mth-hsg-pay"]:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2["total-mth-hsg-pay"] != 0 ? CalculatorResponse.FRM2["total-mth-hsg-pay"]:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],

//         projectedEquity: [
//           {
//             name: `ProjectedEquity`,
//             ProjectedEquityptionScenario1: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.ProjectedequityARMOption1 != 0 ? CalculatorResponse.ARM1.ProjectedequityARMOption1:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.ProjectedequityFRMOption1 != 0 ? CalculatorResponse.FRM1.ProjectedequityFRMOption1:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             ProjectedEquityptionScenario2: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2.ProjectedequityARMOption2 != 0 ? CalculatorResponse.ARM2.ProjectedequityARMOption2:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2.ProjectedequityFRMOption2 != 0 ? CalculatorResponse.FRM2.ProjectedequityFRMOption2:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],

//         afterHomePurchaseSpendProfile: [
//           {
//             name: `AfterHomePurchaseSpendProfile`,
//             HomePurchaseSpendProfilescenario1: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.Balanceoption1 != 0 ? CalculatorResponse.ARM1.Balanceoption1:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.Balanceoption1 != 0 ? CalculatorResponse.FRM1.Balanceoption1:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             HomePurchaseSpendProfilescenario2: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2.Balanceoption2 != 0 ? CalculatorResponse.ARM2.Balanceoption2:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2.Balanceoption2 != 0 ? CalculatorResponse.FRM2.Balanceoption2:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],

//         taxImpact: [
//           {
//             name: `TaxImpact`,
//             TaxImpactScenario1: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM1
//                     ? CalculatorResponse.ARM1.Taxbenfithomeoption1 != 0 ? CalculatorResponse.ARM1.Taxbenfithomeoption1:""
//                     : CalculatorResponse.FRM1
//                     ? CalculatorResponse.FRM1.Taxbenfithomeoption1 != 0 ? CalculatorResponse.FRM1.Taxbenfithomeoption1:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//             TaxImpactScenario2: parseFloat(
//               String(
//                 `${
//                   CalculatorResponse.ARM2
//                     ? CalculatorResponse.ARM2.Taxbenfithomeoption2 != 0 ? CalculatorResponse.ARM2.Taxbenfithomeoption2:""
//                     : CalculatorResponse.FRM2
//                     ? CalculatorResponse.FRM2.Taxbenfithomeoption2 != 0 ? CalculatorResponse.FRM2.Taxbenfithomeoption2:""
//                     : 0
//                 }`
//               ).replace(/,/g, "")
//             ),
//           },
//         ],
//       });
//     }
//   }
//   render() {
//     const {
//       singlePropertyResponse,
//       CalculatorResponse,
//     } = this.props.location.state;
//     if (this.state.homeScreen) {
//       return (
//         <Redirect
//           to={{
//             pathname: "/show-detailed-reports",
//             state: { propertyId: singlePropertyResponse.id },
//           }}
//         />
//       );
//     }
//     return (
//       <Fragment>
//         <Header type="Report" />
//         <MDBContainer className="report-container">
//           <Button
//             size="medium"
//             className="btn btn-primary btn-sm waves-effect waves-light"
//             onClick={this.goToHomeScreen}
//           >
//             Go To Reports Screen
//           </Button>
//           <MDBRow className="margin20">
//             <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
//               <Card>
//                 <CardContent>
//                   <MDBRow className="margin20">
//                     <MDBCol md="9" size="10">
//                       <div>
//                         <Typography variant="h5" component="h2">
//                           <MDBIcon icon="map-marker-alt" /> &nbsp;&nbsp;
//                           {singlePropertyResponse.house_address}
//                         </Typography>
//                       </div>
//                     </MDBCol>
//                   </MDBRow>
//                 </CardContent>
//               </Card>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>

//             <MDBCol>
//               <h6 className="CardTitle">Loan Program Comparison</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.mortgageProgram}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar dataKey="LoanAmountFirst" fill="#4d6fc4" minPointSize={5}>
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="LoanAmountSecond"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>

//             <MDBCol>
//               <h6 className="CardTitle">Monthly mortgage payments</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.monthlyMortgagePayment}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar dataKey="FirstMortgagePayment" fill="#4d6fc4" minPointSize={5}>
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="SecondMortgagePayment"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>

//             </MDBRow>
//             <MDBRow>
//             <MDBCol>
//               <h6 className="CardTitle">Housing Payment</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.housingPayment}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar dataKey="HousingPayment" fill="#4d6fc4" minPointSize={5}>
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="TotalHousingPayment"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>

//             <MDBCol>
//               <h6 className="CardTitle">Projected Equity</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.projectedEquity}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar
//                     dataKey="ProjectedEquityptionScenario1"
//                     fill="#4d6fc4"
//                     minPointSize={5}
//                   >
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="ProjectedEquityptionScenario2"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>

//             <MDBCol>
//               <h6 className="CardTitle">After home purchase spend profile</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.afterHomePurchaseSpendProfile}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar
//                     dataKey="HomePurchaseSpendProfilescenario1"
//                     fill="#4d6fc4"
//                     minPointSize={5}
//                   >
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="HomePurchaseSpendProfilescenario2"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>
//             <MDBCol>
//               <h6 className="CardTitle">Tax Impact</h6>
//               <div>
//                 <BarChart
//                   width={300}
//                   height={300}
//                   data={this.state.taxImpact}
//                   margin={{
//                     top: 0,
//                     right: 0,
//                     left: 0,
//                     bottom: 0,
//                   }}
//                 >
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   {/* <Legend /> */}
//                   <Bar
//                     dataKey="TaxImpactScenario1"
//                     fill="#4d6fc4"
//                     minPointSize={5}
//                   >
//                     {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
//                   </Bar>
//                   <Bar
//                     dataKey="TaxImpactScenario2"
//                     fill="#97d24f"
//                     minPointSize={10}
//                   />
//                 </BarChart>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//         <br />
//         <br />
//       </Fragment>
//     );
//   }
// }
// export default withRouter(CheatSheet);

// import React, { Component, Fragment, PureComponent } from "react";