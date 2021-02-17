import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import RangeSlider from "../../common/RangeSilder";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";
import "react-rangeslider/lib/index.css";
import PersonaLFinanceValidator from "../validatorRules/PersonalFinanceValidatorRules";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
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
          ? 
          parseInt(String(Number(JSON.parse(localStorage.getItem("personal_finance_array"))
          .marginal_tax_rate)*100))
           + "%"
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
      // total_non_housing: Object.entries(
      //   JSON.parse(localStorage.getItem("personal_finance_array"))
      // ).length !== 0
      //   ? JSON.parse(localStorage.getItem("personal_finance_array"))
      //       .total_non_housing
      //   : "",
      detail_non_housing_expenses: {},
      openModal: false,
      showModal: false,
    };
    this.validators = PersonaLFinanceValidator;
    resetValidators(this.validators);
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
  componentDidMount() {
  }
  async handleChange(event) {
    const { name } = event.target;
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });
    if (
      name === "marginal_tax_rate" ||
      name === "annual_gross_income" ||
      name === "monthly_debt_payments" ||
      name == "monthly_non_housing_expenses" ||
      name == "federal_income"
      // ||
      // name == "total_non_housing"
    ) {
      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;
      this.props.getValidationError(validationErrorLength);
    }

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
        {/* <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Annual gross income</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Annual Gross income is your total gross income
              before any deductions such as income taxes. If you have other sources
              other than salary & wages, please include them as well. </span>
            </div>
            <br />
            <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_gross_income"
              value={this.state.annual_gross_income}
              onChange={this.handleChange}
            />

          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "annual_gross_income")} */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Monthly debt payments</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
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
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "monthly_debt_payments")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Monthly non-housing expenses
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
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
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Marginal tax rate</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Note that we have to build a check here that the interest only
                period cannot be equal to the loan term or greater than the loan
                term.{" "}
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
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Federal Income</span>
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
          {displayValidationErrors(this.validators, "federal_income")}
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
            <MDBRow className="margin20" className="text-center">
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
