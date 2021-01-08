import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Input } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ShowPmiOptionsSecondLoan from "./showPmiOptionsSecondLoan";
import ARMComponentSecondLoan from "./armComponentSecondLoan";
import quss from "../../assets/images/que.png";


export class SecondLoanScenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mortgage_program_type: props.Frm === "true" ? 1 : 2,
      loan_amount: this.props.FrmGetResponse ? props.FrmGetResponse.loan_amount : "",
      loan_term: this.props.FrmGetResponse ? props.FrmGetResponse.loan_term : "",
      interest: this.props.FrmGetResponse ? props.FrmGetResponse.interest : "",
      points:this.props.FrmGetResponse ? props.FrmGetResponse.points : "",
      closing_costs:this.props.FrmGetResponse ? props.FrmGetResponse.closing_costs : "",
      interest_only_option:this.props.FrmGetResponse ? props.FrmGetResponse.interest_only_option : "N",
      interest_only_period: this.props.FrmGetResponse && props.FrmGetResponse.interest_only_option === "Y" ? props.FrmGetResponse.interest_only_period : "",
      downpayment: this.props.FrmGetResponse ? props.FrmGetResponse.downpayment : "",
      pmi: this.props.FrmGetResponse ? props.FrmGetResponse.pmi : "",
      select_loan_program:this.props.FrmGetResponse ? props.FrmGetResponse.select_loan_program : "",
      initial_interest_rate: this.props.FrmGetResponse ? props.FrmGetResponse.initial_interest_rate : "",
      first_interest_rate_adj_cap: this.props.FrmGetResponse ? props.FrmGetResponse.first_interest_rate_adj_cap : "",
      floor_interest_rate: this.props.FrmGetResponse ? props.FrmGetResponse.floor_interest_rate : "",
      ceiling_interest_rate: this.props.FrmGetResponse ? props.FrmGetResponse.ceiling_interest_rate : "",
      period_cap: this.props.FrmGetResponse ? props.FrmGetResponse.period_cap : "",
      rate_add: this.props.FrmGetResponse ? props.FrmGetResponse.rate_add : "",
      second_mortgage_loan_amount: this.props.FrmGetResponse ? props.FrmGetResponse.second_mortgage_loan_amount : "",
      second_mortgage_loan_term: this.props.FrmGetResponse ? props.FrmGetResponse.second_mortgage_loan_term : "",
      second_mortgage_interest: this.props.FrmGetResponse ? props.FrmGetResponse.second_mortgage_interest : "",
      second_mortgage_points: this.props.FrmGetResponse ? props.FrmGetResponse.second_mortgage_points : "",
      second_mortgage_closing_costs: this.props.FrmGetResponse ? props.FrmGetResponse.second_mortgage_closing_costs : "",
      showInterestOnlyPeriodOption:this.props.FrmGetResponse && props.FrmGetResponse.interest_only_option === "Y" ? true : false,
      showMortgageTypeChangeOption: false,
      PMIOptions: "PMI",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async handleChange(event) { 
    event.persist();
    if (event.target.name == 'interest'){
      let data = Number(event.target.value)/100
      event.target.value = String(data)
    }
    await this.setState({
      [event.target.name]: event.target.value,
    });
    const dataObject = {
      mortgage_program_type: this.state.mortgage_program_type,
      loan_amount: this.state.loan_amount,
      loan_term: this.state.loan_term,
      interest: this.state.interest,
      points: this.state.points,
      closing_costs: this.state.closing_costs,
      interest_only_option: this.state.interest_only_option,
      interest_only_period: this.state.interest_only_period,
    };
    this.props.handleSecondloanMortgageInfo(dataObject);
  }
  handleDownpaymentData = async (data) => {
    await this.setState({
      pmi: data.pmi_amount,
      second_mortgage_loan_amount: data.second_mortgage_loan_amount,
      second_mortgage_loan_term: data.second_mortgage_loan_term,
      second_mortgage_interest: data.second_mortgage_interest,
      second_mortgage_points: data.second_mortgage_points,
      second_mortgage_closing_costs: data.second_mortgage_closing_costs,
    });
    if (data.PMIOptions === "PMI") {
      const dataWithPmi = {
        mortgage_program_type: this.state.mortgage_program_type,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        interest: this.state.interest,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        pmi: this.state.pmi,
      };
      this.props.handleSecondloanMortgageInfo(dataWithPmi);
    } else {
      const dataWithSecondMortgage = {
        mortgage_program_type: this.state.mortgage_program_type,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        interest: this.state.interest,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        second_mortgage_loan_amount: this.state.second_mortgage_loan_amount,
        second_mortgage_loan_term: this.state.second_mortgage_loan_term,
        second_mortgage_interest: this.state.second_mortgage_interest,
        second_mortgage_points: this.state.second_mortgage_points,
        second_mortgage_closing_costs: this.state.second_mortgage_closing_costs,
      };
      this.props.handleSecondloanMortgageInfo(dataWithSecondMortgage);
    }
  };
  handleArmData = async (data) => {
    this.props.handleSecondloanMortgageInfo(data);
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
  mortgageTypeChange = (event, value) => {
    this.setState({
      mortgage_program_type: value,
    });
    if (value === 1) {
      this.setState({
        showMortgageTypeChangeOption: true,
      });
    } else if (value === 2) {
      this.setState({
        showMortgageTypeChangeOption: false,
      });
    }
  };
  render(props) {
    const showInterestOnlyPeriodButton = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">Interest only period</span>
          <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">This is the # of years for which you won't pay principal on the
             loan and will pay only the interest amount on a loan </span>
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
          <MDBCol md="12" size="12">
            <span className="fico-score-label">
            
            </span>
            <br />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" className="margin20">
            <h4 className="get-started-label">Mortgage Details (Option 2)</h4>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select mortgage type</span>
            <br />
            <ToggleButtonGroup
              name="mortgage_program_type"
              value={this.state.mortgage_program_type}
              exclusive
              onChange={this.mortgageTypeChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton disabled={this.props.frmDisabled ? true : false} value={1}>FRM</ToggleButton>
              <ToggleButton disabled={this.props.armDisabled ? true : false} value={2}>ARM</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        {this.state.mortgage_program_type === 2 && this.props.armDisabled !== true ? (
          <ARMComponentSecondLoan
            downpayment={this.props.downpayment}
            handleArmData={this.handleArmData}
            ArmGetResponse = {this.props.ArmGetResponse}
          />
        ) : (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Loan Amount</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Enter the amount you plan to borrow for this mortgage </span>
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
                <span className="get-started-label">Select loan term</span>
                <br />
                <Select
                  value={this.state.loan_term}
                  name="loan_term"
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
                <span className="get-started-label">
                  Interest on your first mortgage
                </span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Interest rate is the cost of borrowing or the amount charged on the first mortgage. Enter Interest % and not APR %. </span>
            </div>
                <br />
                <Input
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="interest"
                  value={this.state.interest}
                  onChange={this.handleChange}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Points</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
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
            <MDBRow className="margin20">
              <MDBCol md="12">
                {/* <span className="get-started-label">Closing costs</span> */}
                <span className="get-started-label">Closing costs</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
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
            {this.props.FrmGetResponse.pmi !== "null" || (this.props.FrmGetResponse.second_mortgage_loan_amount !=="null") || this.props.downpayment === "lessthan20" ? (
              <ShowPmiOptionsSecondLoan
                handleDownpaymentData={this.handleDownpaymentData}
                frmResponse = {this.props.FrmGetResponse}
                armResponse = {this.props.ArmGetResponse}
                mortgageProgramType={this.state.mortgage_program_type}
              />
            ) : null}
          </div>
        )}
      </Fragment>
    );
  }
}

export default SecondLoanScenario;
