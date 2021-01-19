import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ShowPmiOptionsSecondLoanARM from "./showPmiOptionsSecondLoanARM";
import quss from "../../assets/images/que.png";

export class ARMComponentSecondLoan extends Component {
  constructor() {
    super();
    this.state = {
      mortgage_program_type: 2,
      loan_amount: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.loan_amount
        : "",
      loan_term: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.loan_term
        : "",
      select_loan_program: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.select_loan_program
        : "",
      initial_interest_rate: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.initial_interest_rate
        : "",
      first_interest_rate_adj_cap: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.first_interest_rate_adj_cap
        : "",
      floor_interest_rate: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.floor_interest_rate
        : "",
      ceiling_interest_rate: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.ceiling_interest_rate
        : "",
      period_cap: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.period_cap
        : "",
        period_cap: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.period_cap_percentage
        : "",
      rate_add: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.rate_add
        : "",
      points: this.props.ArmGetResponse ? this.props.ArmGetResponse.points : "",
      closing_costs: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.closing_costs
        : "",
      interest_only_option: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.interest_only_option
        : "",
      interest_only_period:
        this.props.ArmGetResponse &&
        this.props.ArmGetResponse.interest_only_option === "Y"
          ? this.props.ArmGetResponse.interest_only_period
          : "",
      pmi: this.props.ArmGetResponse ? this.props.ArmGetResponse.pmi : "",
      second_mortgage_loan_amount: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.second_mortgage_loan_amount
        : "",
      second_mortgage_loan_term: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.second_mortgage_loan_term
        : "",
      second_mortgage_interest: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.second_mortgage_interest
        : "",
      second_mortgage_points: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.second_mortgage_points
        : "",
      second_mortgage_closing_costs: this.props.ArmGetResponse
        ? this.props.ArmGetResponse.second_mortgage_closing_costs
        : "",
      showInterestOnlyPeriodOption:
        this.props.ArmGetResponse &&
        this.props.ArmGetResponse.interest_only_option === "Y"
          ? true
          : false,
      secondmtgpmichoice1:
        this.props.ArmGetResponse &&
        this.props.ArmGetResponse.secondmtgpmichoice1
          ? this.props.ArmGetResponse.secondmtgpmichoice1
          : "",
      PMIfirst1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.PMIfirst1
          ? this.props.ArmGetResponse.PMIfirst1
          : "",
      loanamountsecond1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.loanamountsecond1
          ? this.props.ArmGetResponse.loanamountsecond1
          : "",
      Pmtsecond1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.Pmtsecond1
          ? this.props.ArmGetResponse.Pmtsecond1
          : "",
      ARMtype1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ARMtype1
          ? this.props.ArmGetResponse.ARMtype1
          : "",
      ARM1rate:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ARM1rate
          ? this.props.ArmGetResponse.ARM1rate
          : "",
      ARMfirstadjin1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ARMfirstadjin1
          ? this.props.ArmGetResponse.ARMfirstadjin1
          : "",
      floor1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.floor1
          ? this.props.ArmGetResponse.floor1
          : "",
      ceiling1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ceiling1
          ? this.props.ArmGetResponse.ceiling1
          : "",
      periodicadjcap1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.periodicadjcap1
          ? this.props.ArmGetResponse.periodicadjcap1
          : "",
      rateadd1:
        this.props.ArmGetResponse && this.props.ArmGetResponse.rateadd1
          ? this.props.ArmGetResponse.rateadd1
          : "",
      secondmtgpmichoice2:
        this.props.ArmGetResponse &&
        this.props.ArmGetResponse.secondmtgpmichoice2
          ? this.props.ArmGetResponse.secondmtgpmichoice2
          : "",
      PMIfirst2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.PMIfirst2
          ? this.props.ArmGetResponse.PMIfirst2
          : "",
      loanamountsecond2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.loanamountsecond2
          ? this.props.ArmGetResponse.loanamountsecond2
          : "",
      Pmtsecond2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.Pmtsecond2
          ? this.props.ArmGetResponse.Pmtsecond2
          : "",
      ARM2rate:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ARM2rate
          ? this.props.ArmGetResponse.ARM2rate
          : "",
      ARMfirstadjin2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ARMfirstadjin2
          ? this.props.ArmGetResponse.ARMfirstadjin2
          : "",
      floor2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.floor2
          ? this.props.ArmGetResponse.floor2
          : "",
      ceiling2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.ceiling2
          ? this.props.ArmGetResponse.ceiling2
          : "",
      periodicadjcap2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.periodicadjcap2
          ? this.props.ArmGetResponse.periodicadjcap2
          : "",
      rateadd2:
        this.props.ArmGetResponse && this.props.ArmGetResponse.rateadd2
          ? this.props.ArmGetResponse.rateadd2
          : "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });
    const dataObject = {
      mortgage_program_type: 2,
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
        mortgage_program_type: 2,
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
        mortgage_program_type: 2,
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
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loan_amount"
              value={this.state.loan_amount}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select Loan term</span>
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
            <span className="get-started-label">
              Interest on your first mortgage
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Interest rate is the cost of borrowing or the amount charged on
                the first mortgage. Enter Interest % and not APR %.{" "}
              </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="initial_interest_rate"
              value={this.state.initial_interest_rate}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
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
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="first_interest_rate_adj_cap"
              value={this.state.first_interest_rate_adj_cap}
              onChange={this.handleChange}
            />
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
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="floor_interest_rate"
              value={this.state.floor_interest_rate}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
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
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="ceiling_interest_rate"
              value={this.state.ceiling_interest_rate}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
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
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="rate_add"
              value={this.state.rate_add}
              onChange={this.handleChange}
            />
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
              name="closing_costs"
              value={this.state.closing_costs}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
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
        {this.props.ArmGetResponse.pmi !== "null" ||
        this.props.ArmGetResponse.second_mortgage_loan_amount !== "null" ||
        this.props.downpayment === "lessthan20" ? (
          <ShowPmiOptionsSecondLoanARM
            handleDownpaymentData={this.handleDownpaymentData}
            frmResponse={this.props.FrmGetResponse}
            armResponse={this.props.ArmGetResponse}
            mortgageProgramType={this.state.mortgage_program_type}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default ARMComponentSecondLoan;
