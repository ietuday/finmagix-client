import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Axios from "axios";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Input } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ShowPmiOptionsSecondLoan from "./showPmiOptionsSecondLoan";
import ARMComponentSecondLoan from "./armComponentSecondLoan";
import quss from "../../assets/images/que.png";

import NumberFormat from "react-number-format";

import { config } from '../config/default';
const { baseURL } = config;
 

export class SecondLoanScenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mortgage_program_type: props.Frm === "true" ? 1 : 2,
      loan_amount: this.props.FrmGetResponse ? props.FrmGetResponse.loan_amount : "",
      loan_amount_number: this.props.FrmGetResponse ? props.FrmGetResponse.loan_amount : "",
      loan_term: this.props.FrmGetResponse ? props.FrmGetResponse.loan_term : "",
      interest: this.props.FrmGetResponse ? props.FrmGetResponse.interest : "",
      interest_percentage: this.props.FrmGetResponse ? props.FrmGetResponse.interest : "",
      points:this.props.FrmGetResponse ? props.FrmGetResponse.points : "",
      closing_costs:this.props.FrmGetResponse ? props.FrmGetResponse.closing_costs : "",
      closing_costs_number: this.props.FrmGetResponse ? props.FrmGetResponse.closing_costs : "",
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
      armValidationErrors: 0,
      
      points_percentage: this.props.FrmGetResponse ? props.FrmGetResponse.points : "",
      is_update:false,
      id: "",
      interestrateValidationError: "",
      pointsValidationError: "",
      property_price: "",
      loan_amount_validation_error: "",
      closingCostsValidationError: "",
      property_downpayment: "",
      downpaymentCheck: ""
    };
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
            'property_price': propertyDetail.property_price,
            'property_downpayment': propertyDetail.downpayment_amount
          })
          if (propertyDetail.first_frm && propertyDetail.first_frm.id) {
            this.setState({
              mortgage_program_type:this.state.mortgage_program_type,
              mortgage_program_type_value: this.state.mortgage_program_type,
              loan_amount:propertyDetail.second_frm.loan_amount,
              loan_amount_number:propertyDetail.second_frm.loan_amount,
              loan_term: propertyDetail.second_frm.loan_term,
              interest: propertyDetail.second_frm.interest,
              interest_percentage: Number(propertyDetail.second_frm.interest)*100,
              points: propertyDetail.second_frm.points,
              closing_costs: propertyDetail.second_frm.closing_costs,
              closing_costs_number:propertyDetail.second_frm.closing_costs,
              interest_only_option:propertyDetail.second_frm.interest_only_period ? "Y" : "N",
              interest_only_period: propertyDetail.second_frm.interest_only_period,
              downpayment: 0,
              pmi: propertyDetail.second_frm.mpi,
              select_loan_program: "",
              initial_interest_rate: propertyDetail.second_frm.interest,
              first_interest_rate_adj_cap: 0,
              floor_interest_rate: 0,
              ceiling_interest_rate: 0,
              period_cap:propertyDetail.second_frm.periodicadjcap1,
              rate_add:propertyDetail.second_frm.rateadd1,
  
              second_mortgage_loan_amount:propertyDetail.second_frm.loanamountsecond1,
              second_mortgage_loan_term:propertyDetail.second_frm.second_mortgage_loan_term,
              second_mortgage_interest: propertyDetail.second_frm.second_mortgage_interest,
              second_mortgage_points:propertyDetail.second_frm.second_mortgage_points,
              second_mortgage_closing_costs:propertyDetail.second_frm.second_mortgage_closing_costs,
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
              closing_costs_percentage: Number(propertyDetail.second_frm.closing_costs)*100,
              points_percentage: Number(propertyDetail.second_frm.points)*100,
              is_update: true,
              id: propertyDetail.second_frm.id,
              interestOnlyPeriodValidationError: this.state.interestOnlyPeriodValidationError,
              interestrateValidationError: this.state.interestrateValidationError,
              pointsValidationError: this.state.pointsValidationError,
              loan_amount_validation_error: this.state.loan_amount_validation_error,
              closingCostsValidationError: this.state.closingCostsValidationError
            })
          }

          if(this.state.property_price){
            let twenty_percent_of_property_price =
              (this.state.property_price * 20) / 100;
            if (this.state.property_downpayment < twenty_percent_of_property_price) {
              this.setState({
                downpaymentCheck: "lessthan20"
              })
            } else {
              this.setState({
                downpaymentCheck: "greaterthan20"
              })
              // downpayment = "greaterthan20";
            }
          }
          this.props.handleSecondloanMortgageInfo(this.state, null);
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
    // const { name } = event.target;

    if (event.target.name === "loan_amount") {
      if (this.state.property_price < parseInt(String(event.target.value).replace(/,/g, ''))) {
        this.setState({
          loan_amount_validation_error: "Cannot exceed Property price"
        })
      } else {
        this.setState({
          loan_amount_validation_error: ""
        })
      }
    }


    if(event.target.name === "interest_only_period"){
      let loan_term_value = parseInt(this.state.loan_term)
      if(loan_term_value < event.target.value){
        this.setState({
          interestOnlyPeriodValidationError: "Interest Only period cannot exceed the loan term of the first mortgage"
        }) 
      }else{
        this.setState({
          interestOnlyPeriodValidationError: ""
        }) 
      }
  }
  
  if(event.target.name === "interest_percentage"){
    if(parseInt(String(event.target.value).replace(/%/g, '')) > 10){
      this.setState({
        interestrateValidationError: "Is the interest rate input accurate?"
      }) 
    }else{
      this.setState({
        interestrateValidationError: ""
      }) 
    }
    
}

if(event.target.name === "points_percentage"){
  if(parseInt(String(event.target.value).replace(/%/g, '')) > 5){
    this.setState({
      pointsValidationError: "Points cannot exceed 5%"
    }) 
  }else{
    this.setState({
      pointsValidationError: ""
    }) 
  }
  
}

if (event.target.name === "closing_costs") {
  if (
    parseInt(String(event.target.value).replace(/,/g, "")) >
    (parseFloat(String(this.state.loan_amount).replace(/,/g, "")) * 5) /
      100
  ) {
    this.setState({
      closingCostsValidationError:
        " Closing costs cannot exceed 5% of loan amount",
    });
  } else {
    this.setState({
      closingCostsValidationError: "",
    });
  }
}


    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });

    const dataObject = {
      mortage_program_type: this.state.mortage_program_type,
      mortgage_program_type_value: 1,
      loan_amount: this.state.loan_amount,
      loan_term: this.state.loan_term,
      interest: this.state.interest,
      points: this.state.points,
      closing_costs: this.state.closing_costs,
      interest_only_option: this.state.interest_only_option,
      interest_only_period: this.state.interest_only_period,
      property_obj: localStorage.getItem("property_id"),
      is_update: this.state.is_update,
      id: this.state.id,
      property_price: this.state.property_price,
      interestOnlyPeriodValidationError: this.state.interestOnlyPeriodValidationError,
      interestrateValidationError: this.state.interestrateValidationError,
      pointsValidationError: this.state.pointsValidationError,
      loan_amount_validation_error: this.state.loan_amount_validation_error,
      closingCostsValidationError: this.state.closingCostsValidationError,
      property_downpayment: this.state.property_downpayment,
      downpaymentCheck: this.state.downpaymentCheck,
    };
    this.props.handleSecondloanMortgageInfo(dataObject, null);
  }
  handleDownpaymentData = async (data) => {
    await this.setState({
      pmi: data.pmi_amount,
      loanamountsecond2: data.loanamountsecond2,
      second_mortgage_loan_term: data.second_mortgage_loan_term,
      second_mortgage_interest: data.second_mortgage_interest,
      second_mortgage_points: data.second_mortgage_points,
      second_mortgage_closing_costs: data.second_mortgage_closing_costs,
      is_update: this.state.is_update,
      id: this.state.id,
      property_price: this.state.property_price,
      interestOnlyPeriodValidationError: this.state.interestOnlyPeriodValidationError,
      interestrateValidationError: this.state.interestrateValidationError,
      pointsValidationError: this.state.pointsValidationError,
      loan_amount_validation_error: this.state.loan_amount_validation_error,
      closingCostsValidationError: this.state.closingCostsValidationError,
      property_downpayment: this.state.property_downpayment,
      downpaymentCheck: this.state.downpaymentCheck,
    });
    if (data.PMIOptions === "PMI") {
      const dataWithPmi = {
        mortage_program_type: this.state.mortage_program_type,
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
        is_update: this.state.is_update,
        id: this.state.id,
        property_price: this.state.property_price,
        interestOnlyPeriodValidationError: this.state.interestOnlyPeriodValidationError,
        interestrateValidationError: this.state.interestrateValidationError,
        pointsValidationError: this.state.pointsValidationError,
        loan_amount_validation_error: this.state.loan_amount_validation_error,
        closingCostsValidationError: this.state.closingCostsValidationError,
        property_downpayment: this.state.property_downpayment,
        downpaymentCheck: this.state.downpaymentCheck,
      };
      this.props.handleSecondloanMortgageInfo(dataWithPmi, null);
    } else {
      const dataWithSecondMortgage = {
        mortage_program_type: this.state.mortage_program_type,
        mortgage_program_type_value: 1,
        loan_amount: this.state.loan_amount,
        loan_term: this.state.loan_term,
        interest: this.state.interest,
        points: this.state.points,
        closing_costs: this.state.closing_costs,
        interest_only_option: this.state.interest_only_option,
        interest_only_period: this.state.interest_only_period,
        loanamountsecond2: this.state.loanamountsecond2,
        second_mortgage_loan_term: this.state.second_mortgage_loan_term,
        second_mortgage_interest: this.state.second_mortgage_interest,
        second_mortgage_points: this.state.second_mortgage_points,
        second_mortgage_closing_costs: this.state.second_mortgage_closing_costs,
        property_obj: localStorage.getItem("property_id"),
        is_update: this.state.is_update,
        id: this.state.id, 
        property_price: this.state.property_price,
        interestOnlyPeriodValidationError: this.state.interestOnlyPeriodValidationError,
        interestrateValidationError: this.state.interestrateValidationError,
        pointsValidationError: this.state.pointsValidationError,
        loan_amount_validation_error: this.state.loan_amount_validation_error,
        closingCostsValidationError: this.state.closingCostsValidationError,
        property_downpayment: this.state.property_downpayment,
        downpaymentCheck: this.state.downpaymentCheck,
      };
      this.props.handleSecondloanMortgageInfo(dataWithSecondMortgage, null);
    }
  };
  handleArmData = async (data) => {
    // this.props.handleSecondloanMortgageInfo(data);
    this.props.handleSecondloanMortgageInfo(
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
          <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
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
          <span className="validation_red">
            {this.state.interestOnlyPeriodValidationError}
          </span>
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
            <h4 className="get-started-label">Mortgage Details</h4>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" className="margin20">
            <h4 className="text-center get-started-label">Scenario 2</h4>
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
            downpayment={this.state.downpaymentCheck}
            handleArmData={this.handleArmData}
            ArmGetResponse = {this.props.ArmGetResponse}
            getArmValidationError={this.getArmValidationError}
          />
        ) : (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Loan Amount</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Enter the amount you plan to borrow for this mortgage </span>
</div>
                <br />
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
                {this.state.loan_amount_validation_error}
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
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">Interest rate is the cost of borrowing or the amount charged on the first mortgage. Enter Interest % and not APR %. </span>
            </div>
                <br />
                <NumberFormat
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="interest_percentage"
                value={this.state.interest_percentage}
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
            {this.state.interestrateValidationError}
              </MDBCol>
            </MDBRow>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Points</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
                <br />
               
                <NumberFormat
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="points_percentage"
                value={this.state.points_percentage}
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
            {this.state.pointsValidationError}

              </MDBCol>
            </MDBRow>
            <MDBRow className="margin20">
              <MDBCol md="12">
                {/* <span className="get-started-label">Closing costs</span> */}
                <span className="get-started-label">Closing costs</span>
            <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
                <br />
                
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
{this.state.closingCostsValidationError}
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
            {this.state.downpaymentCheck === "lessthan20" ? (
              <ShowPmiOptionsSecondLoan
                handleDownpaymentData={this.handleDownpaymentData}
                frmResponse = {this.props.FrmGetResponse}
                armResponse = {this.props.ArmGetResponse}
                mortgageProgramType={this.state.mortgage_program_type}
                loanAmount={this.state.loan_amount}
              />
            ) : null}
          </div>
        )}
      </Fragment>
    );
  }
}

export default SecondLoanScenario;
