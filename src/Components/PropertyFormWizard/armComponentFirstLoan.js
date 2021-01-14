import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";
import ShowPmiOptionsFirstLoanARM from "./showPmiOptionsFirstLoanARM";
import ArmMortgageProgramValidator from "../validatorRules/ArmMortgageProgramValidator";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import quss from "../../assets/images/que.png";

export class ARMComponentFirstLoan extends Component {
  constructor() {
    super();
    this.state = {
      mortgage_program_type: "FIRST",
      loan_amount: 0,
      loan_term: "15",
      select_loan_program: "1/1 ARM",
      initial_interest_rate: 0,
      initial_interest_rate_percentage: 0,
      first_interest_rate_adj_cap: 0,
      first_interest_rate_adj_cap_percentage: 0,
      floor_interest_rate: 0,
      floor_interest_rate_percentage: 0,
      ceiling_interest_rate: 0,
      ceiling_interest_rate_percentage: 0,
      period_cap: 0,
      rate_add: 0,
      rate_add_percentage: 0,
      points: 0,
      closing_costs: 0,
      interest_only_option: "N",
      interest_only_period: 0,
      pmi: 0,
      second_mortgage_loan_amount: 0,
      second_mortgage_loan_term: 0,
      second_mortgage_interest: 0,
      second_mortgage_points: 0,
      second_mortgage_closing_costs: 0,
      showInterestOnlyPeriodOption: false,
      secondmtgpmichoice1: 0,
      PMIfirst1: 0,
      loanamountsecond1: 0,
      Pmtsecond1: 0,
      ARMtype1: 0,
      ARM1rate: 0,
      ARMfirstadjin1: 0,
      floor1: 0,
      ceiling1: 0,
      periodicadjcap1: 0,
      rateadd1: 0,
      secondmtgpmichoice2: 0,
      PMIfirst2: 0,
      loanamountsecond2: 0,
      Pmtsecond2: 0,
      ARM2rate: 0,
      ARMfirstadjin2: 0,
      floor2: 0,
      ceiling2: 0,
      periodicadjcap2: 0,
      rateadd2: 0,
    };
    this.validators = ArmMortgageProgramValidator;
    resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const { name } = event.target;
    event.persist();
    let downpayment;
    await this.setState({
      [event.target.name]: event.target.value,
    });

    if (
      (this.state.mortgage_program_type_value === 2 &&
        name === "loan_amount") ||
      // name === "initial_interest_rate" ||
      name === "first_interest_rate_adj_cap" ||
      name === "floor_interest_rate" ||
      name === "ceiling_interest_rate" ||
      name === "period_cap" ||
      name === "rate_add" ||
      name === "points" ||
      name == "closing_costs"
    ) {
      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;
      this.props.getArmValidationError(validationErrorLength);
    }
    const dataObject = {
      mortgage_program_type: this.state.mortgage_program_type,
      mortgage_program_type_value: 2,
      loan_amount: this.state.loan_amount,
      loan_term: this.state.loan_term,
      select_loan_program: this.state.select_loan_program,
      initial_interest_rate: this.state.initial_interest_rate,
      first_interest_rate_adj_cap: this.state.first_interest_rate_adj_cap,
      floor_interest_rate: this.state.floor_interest_rate,
      ceiling_interest_rate: this.state.ceiling_interest_rate,
      period_cap: this.state.period_cap,
      rate_add: this.state.rate_add,
      points: this.state.points,
      closing_costs: this.state.closing_costs,
      interest_only_option: this.state.interest_only_option,
      interest_only_period: this.state.interest_only_period,
      property_obj: localStorage.getItem("property_id"),
      secondmtgpmichoice1: this.state.secondmtgpmichoice1,
      PMIfirst1: this.state.PMIfirst1,
      loanamountsecond1: this.state.loanamountsecond1,
      Pmtsecond1: this.state.Pmtsecond1,
      ARMtype1: this.state.ARMtype1,
      ARM1rate: this.state.ARM1rate,
      ARMfirstadjin1: this.state.ARMfirstadjin1,
      floor1: this.state.floor1,
      ceiling1: this.state.ceiling1,
      periodicadjcap1: this.state.periodicadjcap1,
      rateadd1: this.state.rateadd1,
      secondmtgpmichoice2: this.state.secondmtgpmichoice2,
      PMIfirst2: this.state.PMIfirst2,
      loanamountsecond2: this.state.loanamountsecond2,
      Pmtsecond2: this.state.Pmtsecond2,
      ARM2rate: this.state.ARM2rate,
      ARMfirstadjin2: this.state.ARMfirstadjin2,
      floor2: this.state.floor2,
      ceiling2: this.state.ceiling2,
      periodicadjcap2: this.state.periodicadjcap2,
      rateadd2: this.state.rateadd2,
    };
    this.props.handleArmData(dataObject);
  }

  handleDownpaymentData = async (data) => {
    await this.setState({
      pmi: data.pmi_amount,
      second_mortgage_loan_amount: data.second_mortgage_loan_amount,
      second_mortgage_loan_term: data.second_mortgage_loan_term,
      second_mortgage_interest: data.second_mortgage_interest,
      second_mortgage_points: data.second_mortgage_points,
      second_mortgage_closing_costs: data.second_mortgage_closing_costs,
      secondmtgpmichoice1:
        data && data.secondmtgpmichoice1 ? data.secondmtgpmichoice1 : "",
      PMIfirst1: data && data.PMIfirst1 ? data.PMIfirst1 : "",
      loanamountsecond1:
        data && data.loanamountsecond1 ? data.loanamountsecond1 : "",
      Pmtsecond1: data && data.Pmtsecond1 ? data.Pmtsecond1 : "",
      ARMtype1: data && data.ARMtype1 ? data.ARMtype1 : "",
      ARM1rate: data && data.ARM1rate ? data.ARM1rate : "",
      ARMfirstadjin1: data && data.ARMfirstadjin1 ? data.ARMfirstadjin1 : "",
      floor1: data && data.floor1 ? data.floor1 : "",
      ceiling1: data && data.ceiling1 ? data.ceiling1 : "",
      periodicadjcap1: data && data.periodicadjcap1 ? data.periodicadjcap1 : "",
      rateadd1: data && data.rateadd1 ? data.rateadd1 : "",
      secondmtgpmichoice2:
        data && data.secondmtgpmichoice2 ? data.secondmtgpmichoice2 : "",
      PMIfirst2: data && data.PMIfirst2 ? data.PMIfirst2 : "",
      loanamountsecond2:
        data && data.loanamountsecond2 ? data.loanamountsecond2 : "",
      Pmtsecond2: data && data.Pmtsecond2 ? data.Pmtsecond2 : "",
      ARM2rate: data && data.ARM2rate ? data.ARM2rate : "",
      ARMfirstadjin2: data && data.ARMfirstadjin2 ? data.ARMfirstadjin2 : "",
      floor2: data && data.floor2 ? data.floor2 : "",
      ceiling2: data && data.ceiling2 ? data.ceiling2 : "",
      periodicadjcap2: data && data.periodicadjcap2 ? data.periodicadjcap2 : "",
      rateadd2: data && data.rateadd2 ? data.rateadd2 : "",
    });
    if (data.PMIOptions === "PMI") {
      const dataWithPmi = {
        mortgage_program_type: this.state.mortgage_program_type,
        mortgage_program_type_value: 2,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        select_loan_program: this.state.select_loan_program,
        initial_interest_rate: this.state.initial_interest_rate,
        first_interest_rate_adj_cap: this.state.first_interest_rate_adj_cap,
        floor_interest_rate: this.state.floor_interest_rate,
        ceiling_interest_rate: this.state.ceiling_interest_rate,
        period_cap: this.state.period_cap,
        rate_add: this.state.rate_add,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        pmi: this.state.pmi,
        property_obj: localStorage.getItem("property_id"),
        secondmtgpmichoice1: this.state.secondmtgpmichoice1,
        PMIfirst1: this.state.PMIfirst1,
        loanamountsecond1: this.state.loanamountsecond1,
        Pmtsecond1: this.state.Pmtsecond1,
        ARMtype1: this.state.ARMtype1,
        ARM1rate: this.state.ARM1rate,
        ARMfirstadjin1: this.state.ARMfirstadjin1,
        floor1: this.state.floor1,
        ceiling1: this.state.ceiling1,
        periodicadjcap1: this.state.periodicadjcap1,
        rateadd1: this.state.rateadd1,
        secondmtgpmichoice2: this.state.secondmtgpmichoice2,
        PMIfirst2: this.state.PMIfirst2,
        loanamountsecond2: this.state.loanamountsecond2,
        Pmtsecond2: this.state.Pmtsecond2,
        ARM2rate: this.state.ARM2rate,
        ARMfirstadjin2: this.state.ARMfirstadjin2,
        floor2: this.state.floor2,
        ceiling2: this.state.ceiling2,
        periodicadjcap2: this.state.periodicadjcap2,
        rateadd2: this.state.rateadd2,
      };
      this.props.handleArmData(dataWithPmi);
    } else {
      const dataWithSecondMortgage = {
        mortgage_program_type: this.state.mortgage_program_type,
        mortgage_program_type_value: 2,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        select_loan_program: this.state.select_loan_program,
        initial_interest_rate: this.state.initial_interest_rate,
        first_interest_rate_adj_cap: this.state.first_interest_rate_adj_cap,
        floor_interest_rate: this.state.floor_interest_rate,
        ceiling_interest_rate: this.state.ceiling_interest_rate,
        period_cap: this.state.period_cap,
        rate_add: this.state.rate_add,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        second_mortgage_loan_amount: this.state.second_mortgage_loan_amount,
        second_mortgage_loan_term: this.state.second_mortgage_loan_term,
        second_mortgage_interest: this.state.second_mortgage_interest,
        second_mortgage_points: this.state.second_mortgage_points,
        second_mortgage_closing_costs: this.state.second_mortgage_closing_costs,
        property_obj: localStorage.getItem("property_id"),
        secondmtgpmichoice1: this.state.secondmtgpmichoice1,
        PMIfirst1: this.state.PMIfirst1,
        loanamountsecond1: this.state.loanamountsecond1,
        Pmtsecond1: this.state.Pmtsecond1,
        ARMtype1: this.state.ARMtype1,
        ARM1rate: this.state.ARM1rate,
        ARMfirstadjin1: this.state.ARMfirstadjin1,
        floor1: this.state.floor1,
        ceiling1: this.state.ceiling1,
        periodicadjcap1: this.state.periodicadjcap1,
        rateadd1: this.state.rateadd1,
        secondmtgpmichoice2: this.state.secondmtgpmichoice2,
        PMIfirst2: this.state.PMIfirst2,
        loanamountsecond2: this.state.loanamountsecond2,
        Pmtsecond2: this.state.Pmtsecond2,
        ARM2rate: this.state.ARM2rate,
        ARMfirstadjin2: this.state.ARMfirstadjin2,
        floor2: this.state.floor2,
        ceiling2: this.state.ceiling2,
        periodicadjcap2: this.state.periodicadjcap2,
        rateadd2: this.state.rateadd2,
      };
      this.props.handleArmData(dataWithSecondMortgage);
    }
  };

  showInterestOnlyPeriodChange = (event, value) => {
    this.setState({
      interest_only_option: value,
    });
    if (value === "Y") {
      this.setState({
        showInterestOnlyPeriodOption: true,
      });
    } else if (value === "N") {
      this.setState({
        showInterestOnlyPeriodOption: false,
      });
    }
  };
  componentDidMount() {}
  render() {
    const showInterestOnlyPeriodButton = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">Interest only period</span>
          <div className="tooltip-img">
            <img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">
              This is the # of years for which you won't pay principal on the
              loan and will pay only the interest amount on a loan{" "}
            </span>
          </div>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter period here"
            name="interest_only_period"
            value={this.state.interest_only_period}
            onChange={this.handleChange}
          />
        </MDBCol>
      </MDBRow>
    );
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Loan Amount</span>
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
              name="loan_amount"
              value={this.state.loan_amount}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loan_amount"
              value={this.state.loan_amount}
              onChange={this.handleChange}
              thousandSeparator={true}
              // prefix={"$"}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "loan_amount")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select Loan Term</span>
            <br />
            <Select
              name="loan_term"
              value={this.state.loan_term}
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={15}>15 years</MenuItem>
              <MenuItem value={20}>20 years</MenuItem>
              <MenuItem value={25}>25 years</MenuItem>
              <MenuItem value={30}>30 years</MenuItem>
              <MenuItem value={40}>40 years</MenuItem>
              <MenuItem value={50}>50 years</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select loan program</span>
            <br />
            <Select
              name="select_loan_program"
              value={this.state.select_loan_program}
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={"1/1 ARM"}>1/1 ARM</MenuItem>
              <MenuItem value={"3/1 ARM"}>3/1 ARM</MenuItem>
              <MenuItem value={"5/1 ARM"}>5/1 ARM</MenuItem>
              <MenuItem value={"7/1 ARM"}>7/1 ARM</MenuItem>
              <MenuItem value={"10/1 ARM"}>10/1 ARM</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Initial Interest Rate</span>
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter here"
              name="initial_interest_rate"
              value={this.state.initial_interest_rate}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="initial_interest_rate_percentage"
              value={this.state.initial_interest_rate_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  initial_interest_rate: value,
                });
                await this.setState({
                  initial_interest_rate_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {/* {displayValidationErrors(this.validators, "initial_interest_rate")} */}

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              First interest rate adjustment cap
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                This is the maximum interest that you can be charged after an
                ARM mortgages resets its interest rate for the first time. For
                e.g. for a 3/1 ARM mortgage at 3%, the first interest rate
                adjustment cap may be the maximum interest that can be charged
                the first year after the ARM resets i.e. after 3 years for a 3/1
                ARM mortgage
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="first_interest_rate_adj_cap"
              value={this.state.first_interest_rate_adj_cap}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="first_interest_rate_adj_cap_percentage"
              value={this.state.first_interest_rate_adj_cap_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  first_interest_rate_adj_cap: value,
                });
                await this.setState({
                  first_interest_rate_adj_cap_percentage: formattedValue,
                });
              }}
            />

            {/* {displayValidationErrors(
              this.validators,
              "first_interest_rate_adj_cap"
            )} */}
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Floor interest rate</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                This is the lowest interest rate or 'floor' for an ARM. If the
                index rate continues to decrease, the 'floor interest rate'
                gives the lender a floor interest that the lender can levy even
                if the calculated interest rate is below that floor
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="floor_interest_rate"
              value={this.state.floor_interest_rate}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="floor_interest_rate_percentage"
              value={this.state.floor_interest_rate_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  floor_interest_rate: value,
                });
                await this.setState({
                  floor_interest_rate_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "floor_interest_rate")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Ceiling interest rate</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                This is the maximum interest rate that a lender can charge for
                an ARM. If the index rate on the loan continues to go up, the
                interest rate on the ARM can go up. The ceiling interest rate
                caps the maximum interest a lender can charge
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="ceiling_interest_rate"
              value={this.state.ceiling_interest_rate}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="ceiling_interest_rate_percentage"
              value={this.state.ceiling_interest_rate_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  ceiling_interest_rate: value,
                });
                await this.setState({
                  ceiling_interest_rate_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {/* {displayValidationErrors(this.validators, "ceiling_interest_rate")} */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Period cap</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                This is the maximum amount an interest rate can increase by when
                the ARM interest rate resets. For e.g. on a 5/1 ARM mortgage,
                after 5 years, the interest rate can reset every year '1'. The
                period cap denotes that maximum amount it can go up by when it
                resets every year after the first 5 years.
              </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="period_cap"
              value={this.state.period_cap}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "period_cap")}

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Rate add</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                This field allows you to model an increase or a decrease in your
                index ARM rate every year
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="rate_add"
              value={this.state.rate_add}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="rate_add_percentage"
              value={this.state.rate_add_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  rate_add: value,
                });
                await this.setState({
                  rate_add_percentage: formattedValue,
                });
              }}
            />

            {/* {displayValidationErrors(this.validators, "rate_add")} */}

            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Points</span>
                <div className="tooltip-img">
                  <img src={quss} className="tool-img"></img>
                  <span className="tooltip-img-text">
                    Input the points you may need to pay on your loan expressed
                    as a % of the loan amount. For e.g. 2 points is 2% of the
                    loan amount. Points are levied to cover origination costs or
                    reduce interest rate.{" "}
                  </span>
                </div>
                <br />
                <Input
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="points"
                  value={this.state.points}
                  onChange={this.handleChange}
                />
              </MDBCol>
            </MDBRow>
            {displayValidationErrors(this.validators, "points")}
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
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
              name="closing_costs"
              value={this.state.closing_costs}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "closing_costs")}

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Interest only option</span>
            <br />
            <ToggleButtonGroup
              name="interest_only_option"
              value={this.state.interest_only_option}
              exclusive
              onChange={this.showInterestOnlyPeriodChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={"Y"}>Yes</ToggleButton>
              <ToggleButton value={"N"}>No</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        {this.state.showInterestOnlyPeriodOption
          ? showInterestOnlyPeriodButton
          : null}
        <br />
        {this.props.downpayment === "lessthan20" ? (
          <ShowPmiOptionsFirstLoanARM
            handleDownpaymentData={this.handleDownpaymentData}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default ARMComponentFirstLoan;
