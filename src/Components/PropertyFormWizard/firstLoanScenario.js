import React, { Component, Fragment } from "react";
import Axios from "axios";
import { MDBRow, MDBCol } from "mdbreact";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Input } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ShowPmiOptionsFirstLoan from "./showPmiOptionsFirstLoan";
import ARMComponentFirstLoan from "./armComponentFirstLoan";
import FrmMortgageProgramValidator from "../validatorRules/FrmMortgageProgramValidator";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";

import quss from "../../assets/images/que.png";

import NumberFormat from "react-number-format";
import { config } from '../config/default';
const { baseURL } = config;


export class FirstLoanScenario extends Component {
  constructor() {
    super();
    this.state = {
      mortgage_program_type: "FIRST",
      mortgage_program_type_value: 1,
      loan_amount: 0,
      loan_amount_number: 0,
      loan_term: 30,
      interest: 0,
      interest_percentage: 0,
      points: 0,
      closing_costs: 0,
      closing_costs_number:0,
      interest_only_option: "N",
      interest_only_period: "0",
      downpayment: 0,
      pmi: 0,
      select_loan_program: "",
      initial_interest_rate: 0,
      first_interest_rate_adj_cap: 0,
      floor_interest_rate: 0,
      ceiling_interest_rate: 0,
      period_cap: 0,
      rate_add: 0,
      second_mortgage_loan_amount: 0,
      second_mortgage_loan_term: 0,
      second_mortgage_interest: 0,
      second_mortgage_points: 0,
      second_mortgage_closing_costs: 0,
      showInterestOnlyPeriodOption: false,
      showMortgageTypeChangeOption: false,
      PMIOptions: "PMI",
      armValidationErrors: "",
      secondmtgpmichoice1: "0",
      PMIfirst1: "0",
      loanamountsecond1: "0",
      Pmtsecond1: "0",
      ARMtype1: 0,
      ARM1rate: 0,
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
      closing_costs_percentage: "0",
      points_percentage: "0",
      is_update:false,
      id: "",
      interestOnlyPeriodValidationError: "",
      interestrateValidationError: "",
      pointsValidationError: ""
    };
    this.validators = FrmMortgageProgramValidator;
    resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
    this.checkproperty()
  }

  checkproperty(){
    const propertyId = JSON.parse(localStorage.getItem('property_id'))
    
    if(propertyId){
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0]
          this.setState({
            mortgage_program_type:propertyDetail.first_frm.mortage_program_type,
            mortgage_program_type_value: 1,
            loan_amount:propertyDetail.first_frm.loan_amount,
            loan_amount_number:propertyDetail.first_frm.loan_amount,
            loan_term: propertyDetail.first_frm.loan_term,
            interest: propertyDetail.first_frm.interest,
            interest_percentage: Number(propertyDetail.first_frm.interest)*100,
            points: propertyDetail.first_frm.points,
            closing_costs: propertyDetail.first_frm.closing_costs,
            closing_costs_number:propertyDetail.first_frm.closing_costs,
            interest_only_option:propertyDetail.first_frm.interest_only_option,
            interest_only_period: propertyDetail.first_frm.interest_only_period,
            downpayment: 0,
            pmi: propertyDetail.first_frm.mpi,
            select_loan_program: "",
            initial_interest_rate: propertyDetail.first_frm.interest,
            first_interest_rate_adj_cap: 0,
            floor_interest_rate: 0,
            ceiling_interest_rate: 0,
            period_cap:propertyDetail.first_frm.periodicadjcap1,
            rate_add:propertyDetail.first_frm.rateadd1,

            second_mortgage_loan_amount:propertyDetail.first_frm.loanamountsecond1,
            second_mortgage_loan_term:propertyDetail.first_frm.second_mortgage_loan_term,
            second_mortgage_interest: propertyDetail.first_frm.second_mortgage_interest,
            second_mortgage_points:propertyDetail.first_frm.second_mortgage_points,
            second_mortgage_closing_costs:propertyDetail.first_frm.second_mortgage_closing_costs,
            showInterestOnlyPeriodOption: false,
            showMortgageTypeChangeOption: false,
            PMIOptions: "PMI",
            armValidationErrors: "",
            secondmtgpmichoice1: "0",
            PMIfirst1: "0",
            loanamountsecond1: "0",
            Pmtsecond1: "0",
            ARMtype1: 0,
            ARM1rate: 0,
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
            closing_costs_percentage: Number(propertyDetail.first_frm.closing_costs)*100,
            points_percentage: Number(propertyDetail.first_frm.points)*100,
            is_update: true,
            id:propertyDetail.first_frm.id
          })
          this.props.handleFirstloanMortgageInfo(this.state, null);
          
          
        })
        .catch((err) => {
         
        });
    }
  }
  getArmValidationError = (error) => {
    this.setState({
      armValidationErrors: error,
    });
  };
  async handleChange(event) {
    const { name } = event.target;
    event.persist();
    if(event.target.name == "interest_only_period"){
      if(this.state.loan_term < event.target.value){
        this.setState({
          interestOnlyPeriodValidationError: "Interest Only period cannot exceed the loan term of the first mortgage"
        }) 
      }else{
        this.setState({
          interestOnlyPeriodValidationError: ""
        }) 
      }
      
  }

  if(event.target.name == "interest"){
    if(parseInt(String(event.target.value).replace(/%/g, '')) > 10){
      this.setState({
        interestrateValidationError: "If the interest rate is greater than 10%, ask ' Is the interest rate input accurate?'"
      }) 
    }else{
      this.setState({
        interestrateValidationError: ""
      }) 
    }
    
}


if(event.target.name == "points"){
  if(parseInt(String(event.target.value).replace(/%/g, '')) > 5){
    this.setState({
      pointsValidationError: "If the points are greater than 5%, ask 'Is the input for points accurate?''"
    }) 
  }else{
    this.setState({
      pointsValidationError: ""
    }) 
  }
  
}





    await this.setState({
      [event.target.name]: event.target.value,
    });
    if (
      (this.state.mortgage_program_type_value === 1 &&
      name === "loan_amount") ||
      name === "interest" ||
      name === "points" ||
      name == "closing_costs"
    ) {
      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;
      this.props.getValidationError(validationErrorLength);
    }

    const dataObject = {
      mortgage_program_type: this.state.mortgage_program_type,
      mortgage_program_type_value: 1,
      loan_amount: this.state.loan_amount,
      loan_term: this.state.loan_term,
      interest: this.state.interest,
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
      is_update: this.state.is_update,
      id: this.state.id
    };
    this.props.handleFirstloanMortgageInfo(dataObject, null);
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
        data && data.secondmtgpmichoice1 ? data.secondmtgpmichoice1 : "0",
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
      is_update: this.state.is_update,
      id: this.state.id
    });
    if (data.PMIOptions === "PMI") {
      const dataWithPmi = {
        mortgage_program_type: this.state.mortgage_program_type,
        mortgage_program_type_value: 1,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        interest: this.state.interest,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        pmi: this.state.pmi,
        property_obj: localStorage.getItem("property_id"),
        secondmtgpmichoice1:
          data && data.secondmtgpmichoice1 ? data.secondmtgpmichoice1 : "0",
        PMIfirst1: data && data.PMIfirst1 ? data.PMIfirst1 : "",
        loanamountsecond1:
          data && data.loanamountsecond1 ? data.loanamountsecond1 : "",
        Pmtsecond1: data && data.Pmtsecond1 ? data.Pmtsecond1 : "",
        ARMtype1: data && data.ARMtype1 ? data.ARMtype1 : "",
        ARM1rate: data && data.ARM1rate ? data.ARM1rate : "",
        ARMfirstadjin1: data && data.ARMfirstadjin1 ? data.ARMfirstadjin1 : "",
        floor1: data && data.floor1 ? data.floor1 : "",
        ceiling1: data && data.ceiling1 ? data.ceiling1 : "",
        periodicadjcap1:
          data && data.periodicadjcap1 ? data.periodicadjcap1 : "",
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
        periodicadjcap2:
          data && data.periodicadjcap2 ? data.periodicadjcap2 : "",
        rateadd2: data && data.rateadd2 ? data.rateadd2 : "",
        is_update: this.state.is_update,
        id: this.state.id
      };
      this.props.handleFirstloanMortgageInfo(dataWithPmi, null);
    } else {
      const dataWithSecondMortgage = {
        mortgage_program_type: this.state.mortgage_program_type,
        mortgage_program_type_value: 1,
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
        property_obj: localStorage.getItem("property_id"),
        secondmtgpmichoice1:
          data && data.secondmtgpmichoice1 ? data.secondmtgpmichoice1 : "0",
        PMIfirst1: data && data.PMIfirst1 ? data.PMIfirst1 : "",
        loanamountsecond1:
          data && data.loanamountsecond1 ? data.loanamountsecond1 : "",
        Pmtsecond1: data && data.Pmtsecond1 ? data.Pmtsecond1 : "",
        ARMtype1: data && data.ARMtype1 ? data.ARMtype1 : "",
        ARM1rate: data && data.ARM1rate ? data.ARM1rate : "",
        ARMfirstadjin1: data && data.ARMfirstadjin1 ? data.ARMfirstadjin1 : "",
        floor1: data && data.floor1 ? data.floor1 : "",
        ceiling1: data && data.ceiling1 ? data.ceiling1 : "",
        periodicadjcap1:
          data && data.periodicadjcap1 ? data.periodicadjcap1 : "",
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
        periodicadjcap2:
          data && data.periodicadjcap2 ? data.periodicadjcap2 : "",
        rateadd2: data && data.rateadd2 ? data.rateadd2 : "",
        is_update: this.state.is_update,
        id: this.state.id
      };
      this.props.handleFirstloanMortgageInfo(dataWithSecondMortgage, null);
    }
  };
  handleArmData = async (data) => {
    this.props.handleFirstloanMortgageInfo(
      data,
      this.state.armValidationErrors
    );
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
      mortgage_program_type_value: value,
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
        {this.state.interestOnlyPeriodValidationError}
      </MDBRow>
    );

    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12" size="12">
            <span className="fico-score-label"></span>
            <br />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" className="margin20">
            <h4 className="get-started-label">Mortgage Details (Option 1)</h4>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select mortgage type</span>
            <br />
            <ToggleButtonGroup
              name="mortgage_program_type"
              value={this.state.mortgage_program_type_value}
              exclusive
              onChange={this.mortgageTypeChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={1}>FRM</ToggleButton>
              <ToggleButton value={2}>ARM</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        {this.state.mortgage_program_type_value === 2 ? (
          <ARMComponentFirstLoan
            downpayment={this.props.downpayment}
            handleArmData={this.handleArmData}
            getArmValidationError={this.getArmValidationError}
          />
        ) : (
          <div>
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
                  onValueChange={async (values) => {
                    const { formattedValue, value } = values;
                    await this.setState({
                      loan_amount_number: formattedValue,
                    });
                    await this.setState({
                      loan_amount: value,
                    });
                  }}
                />
              </MDBCol>
            </MDBRow>
            {displayValidationErrors(this.validators, "loan_amount")}
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Select loan term </span>
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
                <div className="tooltip-img">
                  <img src={quss} className="tool-img"></img>
                  <span className="tooltip-img-text">
                    Interest rate is the cost of borrowing or the amount charged
                    on the first mortgage. Enter Interest % and not APR %.{" "}
                  </span>
                </div>
                <br />

                <NumberFormat
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="interest"
                  value={this.state.interest}
                  onChange={this.handleChange}
                  // thousandSeparator={true}
                  suffix={"%"}
                  onValueChange={async (values) => {
                    const { formattedValue, value } = values;
                    await this.setState({
                      interest: value,
                    });
                    await this.setState({
                      interest_percentage: formattedValue,
                    });
                  }}
                />
              </MDBCol>
              {this.state.interestrateValidationError}
            </MDBRow>
            {/* new fields */}

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
                {/* <Input
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="points"
                  value={this.state.points}
                  onChange={this.handleChange}
                /> */}

                <NumberFormat
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="points"
                  value={this.state.points}
                  onChange={this.handleChange}
                  suffix={"%"}
                  onValueChange={async (values) => {
                    const { formattedValue, value } = values;
                    await this.setState({
                      points: value,
                    });
                    await this.setState({
                      points_percentage: formattedValue,
                    });
                  }}
                />
              </MDBCol>
              {this.state.pointsValidationError}  
            </MDBRow>
           
            <MDBRow className="margin20">
              <MDBCol md="12">
                {/* <span className="get-started-label">Closing costs</span> */}
                <span className="get-started-label">Closing costs</span>
                <div className="tooltip-img">
                  <img src={quss} className="tool-img"></img>
                  <span className="tooltip-img-text">
                    These are fees charged by the lender to the borrower for
                    offering the loan. These may include home appraisal fees,
                    credit appraisal fees etc. Do not include any 'points' you
                    have to pay on the loan. Other closing costs may include
                    escrow fees, title insurance, recording fee, survey fee etc.
                    These can range from 0.3% - 1% of the loan amount or
                    slightly higher based on the lender.
                  </span>
                </div>
                <br />
                {/* <Input
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="closing_costs"
                  value={this.state.closing_costs}
                  onChange={this.handleChange}
                />  */}
                <NumberFormat
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="closing_costs"
                  value={this.state.closing_costs}
                  onChange={this.handleChange}
                  thousandSeparator={true}
                  onValueChange={async (values) => {
                    const { formattedValue, value } = values;
                    await this.setState({
                      closing_costs_number: formattedValue,
                    });
                    await this.setState({
                      closing_costs: value,
                    });
                  }}
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
              <ShowPmiOptionsFirstLoan
                loanAmount={this.state.loan_amount}
                handleDownpaymentData={this.handleDownpaymentData}
              />
            ) : null}
            
          </div>
        )}
      </Fragment>
    );
  }
}

export default FirstLoanScenario;
