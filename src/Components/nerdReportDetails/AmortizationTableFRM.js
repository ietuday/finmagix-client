import { withRouter, Redirect, Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import Header from "../../common/header";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabContainer(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

class AmortizationTableFRM extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: 0,
      scenarioData1: [],
      scenarioData2: [],
      scenariodescond1: [],
      scenariodsecond2: [],
      singlePropertyResponse: {},
      CalculatorResponse: {},
      dfrm1: [],
      dfrm2: [],
      darm1: [],
      darm2: [],
      dsecond1: [],
      dsecond2: [],
    };
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.singlePropertyResponse &&
      props.location.state.GetSinglePropertyResponse
    ) {
      this.singlePropertyResponseglePropertyResponse =
        props.location.state.singlePropertyResponse;
      this.CalculatorResponse = props.location.state.GetSinglePropertyResponse;
    } else {
      this.CalculatorResponse = JSON.parse(
        localStorage.getItem("calculatorResponse")
      );
      this.singlePropertyResponse = JSON.parse(
        localStorage.getItem("GetSinglePropertyResponse")
      );

      if (this.CalculatorResponse && this.CalculatorResponse.dFRM1) {
        const Years = this.CalculatorResponse.dFRM1.Year;
        const Priorbalances = this.CalculatorResponse.dFRM1.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dFRM1.Principalpaid;
        const Payments = this.CalculatorResponse.dFRM1.Payment;
        const Interestpaids = this.CalculatorResponse.dFRM1.Interestpaid;
        const TotalPayments = this.CalculatorResponse.dFRM1["TotalPayments"];
        const Endingbalances = this.CalculatorResponse.dFRM1.Endingbalance;
        const InterestRate= this.CalculatorResponse.dFRM1.InterestRate;
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });

        const objInterestRate = InterestRate.map((x) => {
          return {
            InterestRate: x,
          };
        });

        objYear.map((yr, index) => {
          this.state.dfrm1.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment: objTotalPayment[index].TotalPayment || "N/A",
            InterestRate: objInterestRate[index].InterestRate || "N/A",
          });
        });
        if (this.state.dfrm1.length > 0) {
          this.state.scenarioData1 = this.state.dfrm1;
          this.setState((prevState, props) => ({
            scenarioData1: [this.state.dfrm1, ...prevState.scenarioData1],
          }));
        }
      }
      if (this.CalculatorResponse && this.CalculatorResponse.dFRM2) {
        const Years = this.CalculatorResponse.dFRM2.Year;
        const Priorbalances = this.CalculatorResponse.dFRM2.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dFRM2.Principalpaid;
        const Payments = this.CalculatorResponse.dFRM2.Payment;
        const Interestpaids = this.CalculatorResponse.dFRM2.Interestpaid;
        const TotalPayments = this.CalculatorResponse.dFRM2["TotalPayments"];
        const Endingbalances = this.CalculatorResponse.dFRM2.Endingbalance;
        const Interestrate = this.CalculatorResponse.dFRM2.InterestRate;
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });
        const objInterestrate = Interestrate.map((x) => {
          return {
            Interestrate: x,
          };
        });

        objYear.map((yr, index) => {
          this.state.dfrm2.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment: objTotalPayment[index].TotalPayment,
            Interestrate: objInterestrate[index].Interestrate,
          });
        });
        if (this.state.dfrm2.length > 0) {
          this.state.scenarioData2 = this.state.dfrm2;
          this.setState((prevState, props) => ({
            scenarioData2: [this.state.dfrm2, ...prevState.scenarioData2],
          }));
        }
      }

      if (this.CalculatorResponse && this.CalculatorResponse.dARM1) {
        const Years = this.CalculatorResponse.dARM1.Year;
        const Priorbalances = this.CalculatorResponse.dARM1.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dARM1.Principalpaid;
        const Payments = this.CalculatorResponse.dARM1.Payment;
        const Interestpaids = this.CalculatorResponse.dARM1["Interestpaid"];
        const TotalPayments =
          this.CalculatorResponse.dARM1["TotalPayments"] || [];
        const Endingbalances = this.CalculatorResponse.dARM1.Endingbalance;
        const InterestRate= this.CalculatorResponse.dARM1.InterestRate;
        
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });

        const objInterestRate = InterestRate.map((x) => {
          return {
            InterestRate: x,
          };
        });
        objYear.map((yr, index) => {
          this.state.darm1.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment:
              objTotalPayment.length > 0
                ? objTotalPayment[index].TotalPayment
                : "N/A",
            InterestRate: objInterestRate[index].InterestRate || "N/A",
          });
        });
        if (this.state.darm1.length > 0) {
          this.state.scenarioData1 = this.state.darm1;
          this.setState((prevState, props) => ({
            scenarioData1: [this.state.darm1, ...prevState.scenarioData1],
          }));
        }
      }

      if (this.CalculatorResponse && this.CalculatorResponse.dARM2) {
        const Years = this.CalculatorResponse.dARM2.Year;
        const Priorbalances = this.CalculatorResponse.dARM2.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dARM2.Principalpaid;
        const Payments = this.CalculatorResponse.dARM2.Payment;
        const Interestpaids = this.CalculatorResponse.dARM2["Interestpaid"];
        const TotalPayments =
          this.CalculatorResponse.dARM2["TotalPayments"] || [];
        const Endingbalances = this.CalculatorResponse.dARM2.Endingbalance;
        const InterestRate = this.CalculatorResponse.dARM2.InterestRate;
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });
        const objInterestRate = InterestRate.map((x) => {
          return {
            InterestRate: x,
          };
        });
        objYear.map((yr, index) => {
          this.state.darm2.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment:
              objTotalPayment.length > 0
                ? objTotalPayment[index].TotalPayment
                : "N/A",
                InterestRate:
                objInterestRate.length > 0
                  ? objInterestRate[index].InterestRate
                  : "N/A",
          });
          
        });
        if (this.state.darm2.length > 0) {
          this.state.scenarioData2 = this.state.darm2;
          this.setState((prevState, props) => ({
            scenarioData2: [this.state.darm2, ...prevState.scenarioData2],
          }));
        }
      }

      if (this.CalculatorResponse && this.CalculatorResponse.dsecond1) {
        const Years = this.CalculatorResponse.dsecond1.Year;
        const Priorbalances = this.CalculatorResponse.dsecond1.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dsecond1.Principalpaid;
        const Payments = this.CalculatorResponse.dsecond1.Payment;
        const Interestpaids = this.CalculatorResponse.dsecond1.Interestpaid;
        const TotalPayments =
          this.CalculatorResponse.dsecond1["TotalPayments"] || [];
        const Endingbalances = this.CalculatorResponse.dsecond1.Endingbalance;
        const InterestRate = this.CalculatorResponse.dsecond1.InterestRate;
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });

        const objInterestRate = InterestRate.map((x) => {
          return {
            InterestRate: x,
          };
        });

        objYear.map((yr, index) => {
          this.state.dsecond1.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment:
              objTotalPayment.length > 0
                ? objTotalPayment[index].TotalPayment
                : "N/A",
            InterestRate: objInterestRate[index].InterestRate || "N/A",
          });

          if (this.state.dsecond1.length > 0) {
            this.state.scenariodescond1 = this.state.dsecond1;
            this.setState((prevState, props) => ({
              scenariodescond1: [
                this.state.dsecond1,
                ...prevState.scenariodescond1,
              ],
            }));
          }
        });
      }
      if (this.CalculatorResponse && this.CalculatorResponse.dsecond2) {
        const Years = this.CalculatorResponse.dsecond2.Year;
        const Priorbalances = this.CalculatorResponse.dsecond2.Priorbalance;
        const Principalpaids = this.CalculatorResponse.dsecond2.Principalpaid;
        const Payments = this.CalculatorResponse.dsecond2.Payment;
        const Interestpaids = this.CalculatorResponse.dsecond2.Interestpaid;
        const TotalPayments =
          this.CalculatorResponse.dsecond2["TotalPayments"] || [];
        const Endingbalances = this.CalculatorResponse.dsecond2.Endingbalance;
        const InterestRate = this.CalculatorResponse.dsecond2.InterestRate;
        const objYear = Years.map((x) => {
          return {
            Year: x,
          };
        });
        const objPriorbalance = Priorbalances.map((x) => {
          return {
            Priorbalance: x,
          };
        });
        const objPrincipalpaid = Principalpaids.map((x) => {
          return {
            Principalpaid: x,
          };
        });
        const objPayment = Payments.map((x) => {
          return {
            Payment: x,
          };
        });
        const objInterestpaid = Interestpaids.map((x) => {
          return {
            Interestpaid: x,
          };
        });
        const objTotalPayment = TotalPayments.map((x) => {
          return {
            TotalPayment: x,
          };
        });
        const objEndingbalances = Endingbalances.map((x) => {
          return {
            Endingbalance: x,
          };
        });

      const objInterestRate = InterestRate.map((x) => {
          return {
            InterestRate: x,
          };
        });

        objYear.map((yr, index) => {
          this.state.dsecond2.push({
            Year: yr.Year,
            Endingbalance: objEndingbalances[index].Endingbalance,
            Priorbalance: objPriorbalance[index].Priorbalance,
            Principalpaid: objPrincipalpaid[index].Principalpaid,
            Payment: objPayment[index].Payment,
            Interestpaid: objInterestpaid[index].Interestpaid,
            TotalPayment:
              objTotalPayment.length > 0
                ? objTotalPayment[index].TotalPayment
                : "N/A",
            InterestRate: objInterestRate[index].InterestRate || "N/A",
          });
        });
        if (this.state.dsecond2.length > 0) {
          this.state.scenariodsecond2 = this.state.dsecond2;
          this.setState((prevState, props) => ({
            scenariodsecond2: [
              this.state.dsecond2,
              ...prevState.scenariodsecond2,
            ],
          }));
        }
      }
    }
  }
  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  dropChange = (event, value) => {
    if (event.target.value == 2) {
      if (this.CalculatorResponse && this.CalculatorResponse.dsecond1) {
        this.state.scenarioData1 = this.state.dsecond1;
        this.setState((prevState, props) => ({
          scenarioData1: [this.state.dsecond1, ...prevState.scenarioData1],
        }));
      }
      if (this.CalculatorResponse && this.CalculatorResponse.dsecond2) {
        this.state.scenarioData2 = this.state.dsecond2;
        this.setState((prevState, props) => ({
          scenarioData2: [this.state.dsecond2, ...prevState.scenarioData2],
        }));
      }
      if (
        !(this.CalculatorResponse && this.CalculatorResponse.dsecond2) ||
        !(this.CalculatorResponse && this.CalculatorResponse.dsecond1)
      ) {
        this.state.scenarioData1 = [];
        this.setState((prevState, props) => ({
          scenarioData1: [this.state.dsecond1, ...prevState.scenarioData1],
        }));
        this.state.scenarioData1 = [];
        this.setState((prevState, props) => ({
          scenarioData1: [this.state.dsecond1, ...prevState.scenarioData1],
        }));
      }
    } else {
      if (this.CalculatorResponse && this.CalculatorResponse.dFRM1) {
        this.state.scenarioData1 = this.state.dfrm1;
        this.setState((prevState, props) => ({
          scenarioData1: [this.state.dfrm1, ...prevState.scenarioData1],
        }));
      } else if (this.CalculatorResponse && this.CalculatorResponse.dARM1) {
        this.state.scenarioData1 = this.state.darm1;
        this.setState((prevState, props) => ({
          scenarioData1: [this.state.darm1, ...prevState.scenarioData1],
        }));
      } else if (this.CalculatorResponse && this.CalculatorResponse.dFRM2) {
        this.state.scenarioData2 = this.state.dfrm2;
        this.setState((prevState, props) => ({
          scenarioData2: [this.state.dfrm2, ...prevState.scenarioData2],
        }));
      } else if (this.CalculatorResponse && this.CalculatorResponse.dARM2) {
        this.state.scenarioData2 = this.state.darm2;
        this.setState((prevState, props) => ({
          scenarioData2: [this.state.darm2, ...prevState.scenarioData2],
        }));
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const name = this.CalculatorResponse
      ? this.CalculatorResponse.ARM1
        ? "Amortization Table ARM"
        : "Amortization Table FRM"
      : "";
    const label1 = this.CalculatorResponse
      ? this.CalculatorResponse.ARM1
        ? "Scenario One ARM"
        : "Scenario One FRM"
      : "";

    const label2 = "Second Mortgage";
    const label3 = this.CalculatorResponse
      ? this.CalculatorResponse.ARM2
        ? "Scenario Two ARM"
        : "Scenario Two FRM"
      : "";

    const label4 = "Second Mortgage";
    return (
      <Fragment>
        <Header type={name} className="header-row" />
        <MDBContainer>
          <Button
            size="medium"
            className="btn btn-primary btn-sm waves-effect waves-light"
          >
            <Link to="/nerd-report">Go to Nerd Report</Link>
          </Button>
          <div className={classes.root} className="margin10">
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label={label1} />
                <Tab label={label2} />
                <Tab label={label3} />
                <Tab label={label4} />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Prior Balance</th>
                      <th scope="col">Payment Amount</th>
                      <th scope="col">Principal Paid</th>
                      <th scope="col">Interest Paid</th>
                      <th scope="col">Total Payments</th>
                      <th scope="col">Ending Balance </th>
                      <th scope="col">Interest Rate </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.scenarioData1.length > 0 ? (
                      this.state.scenarioData1.map((listValue, index) => {
                        return (
                          <tr key={index}>
                            <td>{listValue.Year}</td>
                            <td>{listValue.Priorbalance}</td>
                            <td>{listValue.Payment}</td>
                            <td>{listValue.Principalpaid}</td>
                            <td>{listValue.Interestpaid}</td>
                            <td>{listValue.TotalPayment}</td>
                            <td>{listValue.Endingbalance}</td>
                            <td>{listValue.InterestRate}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Prior Balance</th>
                      <th scope="col">Payment Amount</th>
                      <th scope="col">Principal Paid</th>
                      <th scope="col">Interest Paid</th>
                      <th scope="col">Total Payments</th>
                      <th scope="col">Ending Balance </th>
                      <th scope="col">Interest Rate </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.scenariodescond1.length > 0 ? (
                      this.state.scenariodescond1.map((listValue, index) => {
                        return (
                          <tr key={index}>
                            <td>{listValue.Year}</td>
                            <td>{listValue.Priorbalance}</td>
                            <td>{listValue.Payment}</td>
                            <td>{listValue.Principalpaid}</td>
                            <td>{listValue.Interestpaid}</td>
                            <td>{listValue.TotalPayment}</td>
                            <td>{listValue.Endingbalance}</td>
                            <td>{listValue.InterestRate}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Prior Balance</th>
                      <th scope="col">Payment Amount</th>
                      <th scope="col">Principal Paid</th>
                      <th scope="col">Interest Paid</th>
                      <th scope="col">Total Payments</th>
                      <th scope="col">Ending Balance </th>
                      <th scope="col">Interest Rate </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.scenarioData2.length > 0 ? (
                      this.state.scenarioData2.map((listValue, index) => {
                        return (
                          <tr key={index}>
                            <td>{listValue.Year}</td>
                            <td>{listValue.Priorbalance}</td>
                            <td>{listValue.Payment}</td>
                            <td>{listValue.Principalpaid}</td>
                            <td>{listValue.Interestpaid}</td>
                            <td>{listValue.TotalPayment}</td>
                            <td>{listValue.Endingbalance}</td>
                            <td>{listValue.Interestrate}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </TabContainer>
            )}

            {value === 3 && (
              <TabContainer>
                <table className="table" width="100%">
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Prior Balance</th>
                      <th scope="col">Payment Amount</th>
                      <th scope="col">Principal Paid</th>
                      <th scope="col">Interest Paid</th>
                      <th scope="col">Total Payments</th>
                      <th scope="col">Ending Balance </th>
                      <th scope="col">Interest Rate </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.scenariodsecond2.length > 0 ? (
                      this.state.scenariodsecond2.map((listValue, index) => {
                        return (
                          <tr key={index}>
                            <td>{listValue.Year}</td>
                            <td>{listValue.Priorbalance}</td>
                            <td>{listValue.Payment}</td>
                            <td>{listValue.Principalpaid}</td>
                            <td>{listValue.Interestpaid}</td>
                            <td>{listValue.TotalPayment}</td>
                            <td>{listValue.Endingbalance}</td>
                            <td>{listValue.InterestRate}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>NA</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </TabContainer>
            )}
          </div>
        </MDBContainer>
      </Fragment>
    );
  }
}

AmortizationTableFRM.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AmortizationTableFRM);
