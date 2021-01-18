import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import NumberFormat from "react-number-format";
import quss from "../../assets/images/que.png";
export class ShowPmiOptionsSecondLoan extends Component {
  constructor() {
    super();
    this.state = {
      pmi_amount: "",
      pmi_amount_number:"",
      second_mortgage_loan_amount: "",
      second_mortgage_loan_term: "",
      second_mortgage_interest: "",
      second_mortgage_interest_percentage: "",
      second_mortgage_points: "",
      second_mortgage_closing_costs: "",
      PMIOptions: "PMI",
      showSecondloanOption: false,
      secondmtgpmichoice1: "",
      PMIfirst1: "0",
      loanamountsecond1: "0",
      Pmtsecond1: "0",
      ARMtype1: "0",
      ARM1rate: "0",
      ARMfirstadjin1: "0",
      floor1: "0",
      ceiling1: "0",
      periodicadjcap1: "0",
      rateadd1: "0",
      secondmtgpmichoice2: "0",
      PMIfirst2: "0",
      loanamountsecond2: "0",
      Pmtsecond2: "0",
      ARM2rate: "0",
      ARMfirstadjin2: "0",
      floor2: "0",
      ceiling2: "0",
      periodicadjcap2: "0",
      rateadd2: "0",
      second_mortgage_closing_costs_percentage: "0",
      second_mortgage_points_percentage: "0",
      loanamountsecond2_number:"0"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  showPmiSecondloan = (event, value) => {
    this.setState({
      PMIOptions: value,
    });
    if (value === "PMI") {
      this.setState({
        showSecondloanOption: false,
      });
    } else if (value === "Second Loan") {
      this.setState({
        showSecondloanOption: true,
      });
    }
  };
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });
    this.props.handleDownpaymentData(this.state);
  }
  componentDidMount() {}
  render() {
    const showPmiAmount = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">PMI Amount</span>
          <br />
          {/* <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="pmi_amount"
            value={this.state.pmi_amount}
            onChange={this.handleChange}
          /> */}
       <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="pmi_amount"
              value={this.state.pmi_amount}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  pmi_amount_number: formattedValue,
                });
                await this.setState({
                  pmi_amount: value,
                });
              }}
            />
        </MDBCol>
      </MDBRow>
    );
    const showSecondLoan = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">loanamountsecond2</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Enter the amount you plan to borrow for this mortgage{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loanamountsecond2"
              value={this.state.loanamountsecond2}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loanamountsecond2"
              value={this.state.loanamountsecond2}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  loanamountsecond2_number: formattedValue,
                });
                await this.setState({
                  loanamountsecond2: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select Loan term</span>
            <br />
            <Select
              value={this.state.second_mortgage_loan_term}
              name="second_mortgage_loan_term"
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={5}>5 years</MenuItem>
              <MenuItem value={10}>10 years</MenuItem>
              <MenuItem value={15}>15 years</MenuItem>
              <MenuItem value={20}>20 years</MenuItem>
              <MenuItem value={25}>25 years</MenuItem>
              <MenuItem value={30}>30 years</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Interest on your second mortgage
            </span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_interest"
              value={this.state.second_mortgage_interest}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_interest_percentage"
              value={this.state.second_mortgage_interest_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  second_mortgage_interest: value,
                });
                await this.setState({
                  second_mortgage_interest_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Points</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Input the points you may need to pay on your loan expressed as a
                % of the loan amount. For e.g. 2 points is 2% of the loan
                amount. Points are levied to cover origination costs or reduce
                interest rate.{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_points"
              value={this.state.second_mortgage_points}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_points_percentage"
              value={this.state.second_mortgage_points_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  second_mortgage_points: value,
                });
                await this.setState({
                  second_mortgage_points_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            {/* <span className="get-started-label">Closing costs</span> */}
            <span className="get-started-label">Closing costs</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                These are fees charged by the lender to the borrower for
                offering the loan. These may include home appraisal fees, credit
                appraisal fees etc. Do not include any 'points' you have to pay
                on the loan. Other closing costs may include escrow fees, title
                insurance, recording fee, survey fee etc. These can range from
                0.3% - 1% of the loan amount or slightly higher based on the
                lender.
              </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_closing_costs"
              value={this.state.second_mortgage_closing_costs}
              onChange={this.handleChange}
            />
           
          </MDBCol>
        </MDBRow>
      </div>
    );
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12" size="12">
            <p>Your downpayment is less than 20%</p>
            <br />
            <span className="get-started-label">
              Do you want to pay Private Mortgage Insurane(PMI) or Do you prefer
              a second loan?
            </span>
            <ToggleButtonGroup
              name="PMIOptions"
              value={this.state.PMIOptions}
              exclusive
              onChange={this.showPmiSecondloan}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={"PMI"}>PMI</ToggleButton>
              <ToggleButton value={"Second Loan"}>Second Mortgage</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        {this.state.showSecondloanOption ? showSecondLoan : showPmiAmount}
      </Fragment>
    );
  }
}

export default ShowPmiOptionsSecondLoan;
