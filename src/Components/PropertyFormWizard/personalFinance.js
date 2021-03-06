import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Button from "@material-ui/core/Button";
import RangeSlider from "../../common/RangeSilder";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";
import "react-rangeslider/lib/index.css";
// import PersonaLFinanceValidator from "../validatorRules/PersonalFinanceValidatorRules";
// import { updateValidators } from "../../common/ValidatorFunction";
// import {
//   resetValidators
// } from "../../common/ValidatorFunction";
import DetailedExpenseModal from "../../common/detailedExpense";
import quss from "../../assets/images/que.png";

export class PersonalFinance extends Component {
  constructor() {
    super();
    this.state = {
      fico_score_range: "A",
      marginal_tax_rate:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .marginal_tax_rate
          : "",
      marginal_tax_rate_percentage:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? parseInt(
              String(
                Number(
                  JSON.parse(localStorage.getItem("personal_finance_array"))
                    .marginal_tax_rate
                ) * 100
              )
            ) + "%"
          : "",
      annual_gross_income:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .annual_gross_income
          : "",
      monthly_debt_payments:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .monthly_debt_payments
          : "",
      monthly_non_housing_expenses:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .monthly_non_housing_expenses
          : "",
      filling_status:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .filling_status
          : "",
      federal_income:
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length !== 0
          ? JSON.parse(localStorage.getItem("personal_finance_array"))
              .federal_income
          : "",
          monthlydebtPaymentValidationError:"",
          monthlynonhousingExpensesValidationError:"",
          marginal_tax_rate_ValidationError: "",

      detail_non_housing_expenses: {},
      openModal: false,
      showModal: false,
    };
    // this.validators = PersonaLFinanceValidator;
    // resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
  }
  handleRangeData = (data) => {
    this.setState({
      fico_score_range: data,
    });
    this.props.getPersonalFinanceData(this.state);
  };
  goToNextPage = () => {
    localStorage.setItem("personal_finance_array", JSON.stringify(this.state));

    this.props.handleContinue();
  };
  componentDidMount() {}
  async handleChange(event) {
    // const { name } = event.target;
    event.persist();
    if(event.target.name === "monthly_debt_payments"){
      if(this.state.federal_income < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          monthlydebtPaymentValidationError: " Cannot exceed Adjusted Gross Income"
        }) 
      }else{
        this.setState({
          monthlydebtPaymentValidationError: ""
        }) 
      }
    }
    
    

    if(event.target.name === "monthly_non_housing_expenses"){
      if(this.state.federal_income < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          monthlynonhousingExpensesValidationError: " 'Cannot exceed Adjusted Gross Income"
        }) 
      }else{
        this.setState({
          monthlynonhousingExpensesValidationError: ""
        }) 
      }
    }
    
    if (event.target.name === "marginal_tax_rate_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, '')) > 37) {
        this.setState({
          marginal_tax_rate_ValidationError: "Cannot exceed 37%"
        })
      } else {
        this.setState({
          marginal_tax_rate_ValidationError: ""
        })
      }

    }



    
    await this.setState({
      [event.target.name]: event.target.value,
    });
    // if (
    //   name === "marginal_tax_rate" ||
    //   name === "annual_gross_income" ||
    //   name === "monthly_debt_payments" ||
    //   name === "monthly_non_housing_expenses" ||
    //   name === "federal_income"
      
    // ) {
    //   updateValidators(this.validators, event.target.name, event.target.value);
    //   const validationErrorLength = this.validators[event.target.name].errors
    //     .length;
    //   this.props.getValidationError(validationErrorLength);
    // }

    this.props.getPersonalFinanceData(this.state);
  }

  calculateNonHousingExpense = async (data) => {
    this.setState((prevState) => {
      let detail_non_housing_expenses = Object.assign(
        {},
        prevState.detail_non_housing_expenses
      );
      detail_non_housing_expenses = data;
      return { detail_non_housing_expenses };
    });
    JSON.parse(localStorage.getItem("personal_finance_array"))
      .detail_non_housing_expenses &&
    Object.entries(
      JSON.parse(localStorage.getItem("personal_finance_array"))
        .detail_non_housing_expenses
    ).length !== 0
      ? this.props.updateDetailExpenses(this.state.detail_non_housing_expenses)
      : this.props.saveDetailExpenses(this.state.detail_non_housing_expenses);
  };
  toggle = () => {
    this.setState({
      openModal: !this.state.openModal,
      showModal: !this.state.showModal,
    });
  };
  setCurrency = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };
  render() {
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Select your FICO score range
            </span>
            <br />
            <RangeSlider
              apiRangeData={
                Object.entries(
                  JSON.parse(localStorage.getItem("personal_finance_array"))
                ).length !== 0
                  ? JSON.parse(localStorage.getItem("personal_finance_array"))
                  : ""
              }
              getRangeData={this.handleRangeData}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20 marginbottom20">
          <MDBCol md="12">
            <span className="get-started-label">
              Select your filling status
            </span>
            <br />
            <Select
              value={this.state.filling_status}
              name="filling_status"
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={"1"}>Single</MenuItem>
              <MenuItem value={"2"}>Married filling jointly</MenuItem>
              <MenuItem value={"3"}>Married filling seperately</MenuItem>
              <MenuItem value={"4"}>Head of household</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Adjusted Gross Income</span>
            <div className="tooltip-img">
            <img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            AGI calculation is equal to the total income you report that's subject to income tax—such as earnings from your job, self-employment, dividends and interest —minus specific deductions, or “adjustments” that you're eligible to take. This refers to line 11 from 1040 tax form.{" "}
            </span>
          </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="federal_income"
              value={this.state.federal_income}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="federal_income"
              value={this.state.federal_income}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  federal_income_number: formattedValue,
                });
                await this.setState({
                  federal_income: value,
                });
              }}
            />
          </MDBCol>
         
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Monthly debt payments</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                Monthly debt payments are all your NON-HOUSING debt payments
                such as credit cards, car loans etc.{" "}
              </span>
            </div>
            <br />
            {/* <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_debt_payments"
              value={this.state.monthly_debt_payments}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_debt_payments"
              value={this.state.monthly_debt_payments}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  monthly_debt_payments_number: formattedValue,
                });
                await this.setState({
                  monthly_debt_payments: value,
                });
              }}
            />
            <span className="validation-text-color">
            {this.state.monthlydebtPaymentValidationError}
            </span>
         
          </MDBCol>
         
        </MDBRow>
      

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Monthly non-housing expenses
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                These are all of the non-housing expenses except Taxes such as
                Food, Utilities, Entertainment etc. This input is used to
                calculate your 'post home purchase' spend profile
              </span>
            </div>
            <br />
            {/* <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_non_housing_expenses"
              value={this.state.monthly_non_housing_expenses}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_non_housing_expenses"
              value={this.state.monthly_non_housing_expenses}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  monthly_non_housing_expenses_number: formattedValue,
                });
                await this.setState({
                  monthly_non_housing_expenses: value,
                });
              }}
            />
            <span className="validation-text-color">
            {this.state.monthlynonhousingExpensesValidationError}
            </span>
         
          </MDBCol>
         
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Marginal tax rate</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
              Marginal Tax rate refers to the rate you pay  on the amount of your income that falls into a certain range. 
              We use to estimate monthly taxes you may pay on your income.{" "}
              </span>
            </div>
            <br />
            {/* <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="marginal_tax_rate_percentage"
              value={this.state.marginal_tax_rate_percentage}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="marginal_tax_rate_percentage"
              value={this.state.marginal_tax_rate_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  marginal_tax_rate: value,
                });
                await this.setState({
                  marginal_tax_rate_percentage: formattedValue,
                });
              }}
            />
             <span className="validation-text-color">
             {this.state.marginal_tax_rate_ValidationError}
             </span>
           
          </MDBCol>
        </MDBRow>

        {this.props.saveButtonforPersonalFinance &&
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
        ).length === 0 ? (
          <div>
            {/* <MDBRow className="margin20">
              <MDBCol md="8"></MDBCol>
              <MDBCol md="4">
                <span className="link" onClick={this.toggle}>
                  Enter Detailed Expenses {`>`}
                </span>
              </MDBCol>
            </MDBRow> */}
            {this.state.showModal ? (
              <DetailedExpenseModal
                toggle={this.toggle}
                openModal={this.state.openModal}
                calculateNonHousingExpense={this.calculateNonHousingExpense}
              />
            ) : null}
            <MDBRow className="margin20 text-center">
              <MDBCol md="12">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="button-inner-class"
                  onClick={this.goToNextPage}
                >
                  {" "}
                  Save and Continue
                </Button>
              </MDBCol>
            </MDBRow>

            <br />
            <br />
            <br />
          </div>
        ) : null}

        {JSON.parse(localStorage.getItem("personal_finance_array"))
          .detail_non_housing_expenses &&
        Object.entries(
          JSON.parse(localStorage.getItem("personal_finance_array"))
            .detail_non_housing_expenses
        ).length !== 0 ? (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="8"></MDBCol>
              <MDBCol md="4">
                <span className="link" onClick={this.toggle}>
                  Enter Detailed Expenses {`>`}
                </span>
              </MDBCol>
            </MDBRow>
            {this.state.showModal ? (
              <DetailedExpenseModal
                toggle={this.toggle}
                apiResponse={
                  JSON.parse(localStorage.getItem("personal_finance_array"))
                    .detail_non_housing_expenses
                }
                openModal={this.state.openModal}
                calculateNonHousingExpense={this.calculateNonHousingExpense}
              />
            ) : null}
            <br />
            <br />
            <br />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default PersonalFinance;
