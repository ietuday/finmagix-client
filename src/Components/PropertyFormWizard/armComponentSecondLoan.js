import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Axios from "axios";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";
import ShowPmiOptionsSecondLoanARM from "./showPmiOptionsSecondLoanARM";
import ArmMortgageProgramValidator from "../validatorRules/ArmMortgageProgramValidator";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import quss from "../../assets/images/que.png";

import { config } from '../config/default';
const { baseURL } = config;


export class ARMComponentSecondLoan extends Component {
  constructor() {
    super();
    this.state = {
      mortage_program_type: "SECOND",
      loan_amount: 0,
      loan_amount_number:"",
      loan_term: "15",
      select_loan_program: "1/1 ARM",
      initial_interest_rate: 0,
      initial_interest_rate_percentage: 0,
      first_interest_rate_adj_cap: 0,
      floor_interest_rate: 0,
      ceiling_interest_rate: 0,
      period_cap: 0,
      rate_add: 0,
      points: 0,
      closing_costs: 0,
      closing_costs_number: 0,
      interest_only_option: "N",
      interest_only_period: 0,
      pmi: 0,
      second_mortgage_loan_amount: 0,
      second_mortgage_loan_term: 0,
      second_mortgage_interest: 0,
      second_mortgage_points: 0,
      second_mortgage_closing_costs: 0,
      showInterestOnlyPeriodOption: false,
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
      first_interest_rate_adj_cap_percentage: "0",
      floor_interest_rate_percentage: "0",
      ceiling_interest_rate_percentage: "0",
      rate_add_percentage: "0",
      closing_costs_percentage: "0",
      points_percentage: "0",
      period_cap_percentage: "0",
      is_update: false,
      id: "",
      rateAdjustmentCapValidationError: "",
      floorinterestrateValidationError: "",
      periodCapValidationError: "",
      rateAddValidationError: "",
      property_price: "",
      loan_amount_validation_error: "",
      interestrateValidationError: "",
      closingCostsValidationError:""
    };
    // this.validators = ArmMortgageProgramValidator;
    // resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty()
  }

  checkProperty() {

    const propertyId = JSON.parse(localStorage.getItem('property_id'))
    if (propertyId) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0]
          console.log(propertyDetail.property_price)
          this.setState({
            'property_price': propertyDetail.property_price
          })
          if (propertyDetail.second_arm && propertyDetail.second_arm.id) {
            this.setState({
              mortgage_program_type: propertyDetail.second_arm.mortage_program_type,
              loan_amount: propertyDetail.second_arm.loan_amount,
              loan_amount_number: propertyDetail.second_arm.loan_amount,
              loan_term: propertyDetail.second_arm.loan_term,
              select_loan_program: propertyDetail.second_arm.select_loan_program,
              initial_interest_rate: propertyDetail.second_arm.initial_interest_rate,
              initial_interest_rate_percentage: Number(propertyDetail.second_arm.initial_interest_rate) * 100,
              first_interest_rate_adj_cap: propertyDetail.second_arm.first_interest_rate_adj_cap,
              first_interest_rate_adj_cap_percentage: Number(propertyDetail.second_arm.first_interest_rate_adj_cap) * 100,
              floor_interest_rate: propertyDetail.second_arm.floor_interest_rate,
              floor_interest_rate_percentage: Number(propertyDetail.second_arm.floor_interest_rate) * 100,
              ceiling_interest_rate: propertyDetail.second_arm.ceiling_interest_rate,
              ceiling_interest_rate_percentage: Number(propertyDetail.second_arm.ceiling_interest_rate) * 100,
              period_cap: propertyDetail.second_arm.period_cap,
              rate_add: propertyDetail.second_arm.rate_add,
              rate_add_percentage: Number(propertyDetail.second_arm.rate_add) * 100,
              points: propertyDetail.second_arm.points,
              closing_costs: propertyDetail.second_arm.closing_costs,
              closing_costs_number: propertyDetail.second_arm.closing_costs,
              interest_only_option: propertyDetail.second_arm.interest_only_period ? "Y" : "N",
              interest_only_period: propertyDetail.second_arm.interest_only_period,
              pmi: propertyDetail.second_arm.pmi,
              second_mortgage_loan_amount: propertyDetail.second_arm.second_mortgage_loan_amount,
              second_mortgage_loan_term: propertyDetail.second_arm.second_mortgage_loan_term,
              second_mortgage_interest: propertyDetail.second_arm.second_mortgage_interest,
              second_mortgage_points: propertyDetail.second_arm.second_mortgage_points,
              second_mortgage_closing_costs: propertyDetail.second_arm.second_mortgage_closing_costs,
              showInterestOnlyPeriodOption: false,
              secondmtgpmichoice1: propertyDetail.second_arm.secondmtgpmichoice1,
              PMIfirst1: propertyDetail.second_arm.PMIfirst1,
              loanamountsecond1: propertyDetail.second_arm.loanamountsecond1,
              Pmtsecond1: propertyDetail.second_arm.Pmtsecond1,
              ARMtype1: propertyDetail.second_arm.ARMtype1,
              ARM1rate: propertyDetail.second_arm.ARM1rate,
              ARMfirstadjin1: propertyDetail.second_arm.ARMfirstadjin1,
              floor1: propertyDetail.second_arm.floor1,
              ceiling1: propertyDetail.second_arm.ceiling1,
              periodicadjcap1: propertyDetail.second_arm.periodicadjcap1,
              rateadd1: propertyDetail.second_arm.rateadd1,
              secondmtgpmichoice2: propertyDetail.second_arm.secondmtgpmichoice2,
              PMIfirst2: propertyDetail.second_arm.PMIfirst2,
              loanamountsecond2: propertyDetail.second_arm.loanamountsecond2,
              Pmtsecond2: propertyDetail.second_arm.Pmtsecond2,
              ARM2rate: propertyDetail.second_arm.ARM2rate,
              ARMfirstadjin2: propertyDetail.second_arm.ARMfirstadjin2,
              floor2: propertyDetail.second_arm.floor2,
              ceiling2: propertyDetail.second_arm.ceiling2,
              periodicadjcap2: propertyDetail.second_arm.periodicadjcap2,
              rateadd2: propertyDetail.second_arm.rateadd2,
              points_percentage: Number(propertyDetail.second_arm.points) * 100,
              closing_costs_percentage: Number(propertyDetail.second_arm.closing_costs) * 100,
              period_cap_percentage: Number(propertyDetail.second_arm.period_cap) * 100,
              is_update: true,
              id: propertyDetail.second_arm.id
            })
          }

          this.props.handleArmData(this.state);
        })
        .catch((err) => {

        });
    }
  }

  async handleChange(event) {
    const { name } = event.target;
    event.persist();

    if (event.target.name == "loan_amount") {
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


    if (event.target.name == "initial_interest_rate_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, '')) > 10) {
        this.setState({
          interestrateValidationError: "Is the interest rate input accurate?"
        })
      } else {
        this.setState({
          interestrateValidationError: ""
        })
      }

    }

    if (event.target.name == "first_interest_rate_adj_cap_percentage") {
      if (this.state.initial_interest_rate > event.target.value) {
        this.setState({
          rateAdjustmentCapValidationError: "First interest rate adjustment cap cannot be less than initial interest rate"
        })
      } else {
        this.setState({
          rateAdjustmentCapValidationError: ""
        })
      }
    }

    if (event.target.name == "floor_interest_rate_percentage") {
      if (this.state.initial_interest_rate < event.target.value) {
        this.setState({
          floorinterestrateValidationError: "Floor interest rate cannot be greater than initial interest rate"
        })
      } else {
        this.setState({
          floorinterestrateValidationError: ""
        })
      }
    }


    if (event.target.name == "period_cap_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, '')) > 3) {
        this.setState({
          periodCapValidationError: "Is the period cap input accurate?"
        })
      } else {
        this.setState({
          periodCapValidationError: ""
        })
      }

    }

    if (event.target.name == "rate_add_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, '')) > 3) {
        this.setState({
          rateAddValidationError: "If the Rate add input is greater than 3%, ask 'Is the rate add input accurate?'"
        })
      } else {
        this.setState({
          rateAddValidationError: ""
        })
      }

    }

    if (event.target.name == "closing_costs") {
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


    await this.setState({
      [event.target.name]: event.target.value,
    });

    // if (
    //   (this.state.mortgage_program_type_value === 2 &&
    //     name === "loan_amount") ||
    //   // name === "initial_interest_rate" ||
    //   name === "first_interest_rate_adj_cap" ||
    //   name === "floor_interest_rate" ||
    //   name === "ceiling_interest_rate" ||
    //   name === "period_cap" ||
    //   name === "rate_add" ||
    //   name === "points" ||
    //   name == "closing_costs"
    // ) {
    //   updateValidators(this.validators, event.target.name, event.target.value);
    //   const validationErrorLength = this.validators[event.target.name].errors
    //     .length;
    //   this.props.getArmValidationError(validationErrorLength);
    // }
    const dataObject = {
      mortage_program_type: this.state.mortage_program_type,
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
      is_update: this.state.is_update,
      id: this.state.id
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
      property_obj: localStorage.getItem("property_id"),
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
      is_update: this.state.is_update,
      id: this.state.id
    });
    if (data.PMIOptions === "PMI") {
      const dataWithPmi = {
        mortage_program_type: this.state.mortage_program_type,
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
        is_update: this.state.is_update,
        id: this.state.id
      };
      this.props.handleArmData(dataWithPmi);
    } else {
      const dataWithSecondMortgage = {
        mortage_program_type: this.state.mortage_program_type,
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
        is_update: this.state.is_update,
        id: this.state.id
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
  componentDidMount() { }
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
        {/* {displayValidationErrors(this.validators, "loan_amount")} */}
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
              <MenuItem value={"1"}>1/1 ARM</MenuItem>
              <MenuItem value={"2"}>3/1 ARM</MenuItem>
              <MenuItem value={"3"}>5/1 ARM</MenuItem>
              <MenuItem value={"4"}>7/1 ARM</MenuItem>
              <MenuItem value={"5"}>10/1 ARM</MenuItem>
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
            {this.state.interestrateValidationError}
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
              // thousandSeparator={true}
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
            {this.state.rateAdjustmentCapValidationError}
          </MDBCol>

        </MDBRow>
        {/* {displayValidationErrors(
          this.validators,
          "first_interest_rate_adj_cap"
        )} */}
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
              // thousandSeparator={true}
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
            {this.state.floorinterestrateValidationError}
          </MDBCol>

        </MDBRow>
        {/* {displayValidationErrors(this.validators, "floor_interest_rate")} */}
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
              // thousandSeparator={true}
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
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="period_cap"
              value={this.state.period_cap}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="period_cap_percentage"
              value={this.state.period_cap_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  period_cap: value,
                });
                await this.setState({
                  period_cap_percentage: formattedValue,
                });
              }}
            />
            {this.state.periodCapValidationError}
          </MDBCol>

        </MDBRow>
        {/* {displayValidationErrors(this.validators, "period_cap")} */}
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
              // thousandSeparator={true}
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
            {this.state.rateAddValidationError}
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
              </MDBCol>
            </MDBRow>
            {/* {displayValidationErrors(this.validators, "points")} */}
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
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="closing_costs"
              value={this.state.closing_costs}
              onChange={this.handleChange}
            /> */}

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
        {/* {displayValidationErrors(this.validators, "closing_costs")} */}

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
          <ShowPmiOptionsSecondLoanARM
            loanAmount={this.state.loan_amount}
            handleDownpaymentData={this.handleDownpaymentData}
          />
        ) : null}
      </Fragment>
    );
  }
} 

export default ARMComponentSecondLoan;
