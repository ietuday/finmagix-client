import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { updateValidators } from "../../common/ValidatorFunction";
import Axios from "axios";
import NumberFormat from "react-number-format";

import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tax1YesValidator from "../validatorRules/Tax1YesValidator";
import Tax1NoValidator from "../validatorRules/Tax1NoValidator";
import quss from "../../assets/images/que.png";

import { config } from '../config/default';
const { baseURL } = config;


export class Tax1 extends Component {
  constructor() {
    super();
    this.state = {
      filling_status: "",
      detailed_tax_expenses: "N",
      previous_balance: "N",

      fedral_adjusted_gross_income: JSON.parse(
        localStorage.getItem("tax_array")
      ).fedral_adjusted_gross_income
        ? JSON.parse(localStorage.getItem("tax_array"))
            .fedral_adjusted_gross_income
        : "",

      fedral_adjusted_gross_income_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).fedral_adjusted_gross_income
        ? JSON.parse(localStorage.getItem("tax_array"))
            .fedral_adjusted_gross_income
        : "",

      avg_loan_balance_for_grandfathered_debt: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_grandfathered_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_grandfathered_debt
        : "",

      avg_loan_balance_for_grandfathered_debt_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_grandfathered_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_grandfathered_debt
        : "",

      avg_loan_balance_for_home_acquisition_debt: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_home_acquisition_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_home_acquisition_debt
        : "",

      avg_loan_balance_for_home_acquisition_debt_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_home_acquisition_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_home_acquisition_debt
        : "",

      paid_mortgage_on_gf_ha_debt: JSON.parse(localStorage.getItem("tax_array"))
        .paid_mortgage_on_gf_ha_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .paid_mortgage_on_gf_ha_debt
        : "",

      paid_mortgage_on_gf_ha_debt_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).paid_mortgage_on_gf_ha_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .paid_mortgage_on_gf_ha_debt
        : "",

      medical_and_dental_expenses: JSON.parse(localStorage.getItem("tax_array"))
        .medical_and_dental_expenses
        ? JSON.parse(localStorage.getItem("tax_array"))
            .medical_and_dental_expenses
        : "",
      medical_and_dental_expenses_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).medical_and_dental_expenses
        ? JSON.parse(localStorage.getItem("tax_array"))
            .medical_and_dental_expenses
        : "",

      state_local_generalsales_taxes: JSON.parse(
        localStorage.getItem("tax_array")
      ).state_local_generalsales_taxes
        ? JSON.parse(localStorage.getItem("tax_array"))
            .state_local_generalsales_taxes
        : "",
      state_local_generalsales_taxes_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).state_local_generalsales_taxes
        ? JSON.parse(localStorage.getItem("tax_array"))
            .state_local_generalsales_taxes
        : "",

      other_taxes: JSON.parse(localStorage.getItem("tax_array")).other_taxes
        ? JSON.parse(localStorage.getItem("tax_array")).other_taxes
        : "",
      other_taxes_number: JSON.parse(localStorage.getItem("tax_array"))
        .other_taxes
        ? JSON.parse(localStorage.getItem("tax_array")).other_taxes
        : "",

      tax_deductive_investment_interest: JSON.parse(
        localStorage.getItem("tax_array")
      ).tax_deductive_investment_interest
        ? JSON.parse(localStorage.getItem("tax_array"))
            .tax_deductive_investment_interest
        : "",

      tax_deductible_charitable_donations: JSON.parse(
        localStorage.getItem("tax_array")
      ).tax_deductible_charitable_donations
        ? JSON.parse(localStorage.getItem("tax_array"))
            .tax_deductible_charitable_donations
        : "",
      tax_deductible_charitable_donations_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).tax_deductible_charitable_donations
        ? JSON.parse(localStorage.getItem("tax_array"))
            .tax_deductible_charitable_donations
        : "",

      tax_deductible_casualty_and_theft_losses: JSON.parse(
        localStorage.getItem("tax_array")
      ).tax_deductible_casualty_and_theft_losses
        ? JSON.parse(localStorage.getItem("tax_array"))
            .tax_deductible_casualty_and_theft_losses
        : "",
      tax_deductible_casualty_and_theft_losses_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).tax_deductible_casualty_and_theft_losses
        ? JSON.parse(localStorage.getItem("tax_array"))
            .tax_deductible_casualty_and_theft_losses
        : "",

      showDetailedDeductionOption: false,
      showPreviousLoanBalanceButton: false,
    };

    this.Tax1YesValidators = Tax1YesValidator;
    this.Tax1NoValidators = Tax1NoValidator;
    resetValidators(this.Tax1YesValidators);
    resetValidators(this.Tax1NoValidators);
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty()
  }

  checkProperty() {
    console.log("ncbncbz");
    const propertyId = JSON.parse(localStorage.getItem("property_id"));
    if (propertyId) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0];
          this.setState({
            fedral_adjusted_gross_income:propertyDetail.taxes.fedral_adjusted_gross_income,
            fedral_adjusted_gross_income_number:propertyDetail.taxes.fedral_adjusted_gross_income,
            avg_loan_balance_for_grandfathered_debt:propertyDetail.taxes.avg_loan_balance_for_grandfathered_debt,  
            avg_loan_balance_for_grandfathered_debt_number:propertyDetail.taxes.avg_loan_balance_for_grandfathered_debt,   
            avg_loan_balance_for_home_acquisition_debt: propertyDetail.taxes.avg_loan_balance_for_home_acquisition_debt,
            avg_loan_balance_for_home_acquisition_debt_number: propertyDetail.taxes.avg_loan_balance_for_home_acquisition_debt,
            paid_mortgage_on_gf_ha_debt: propertyDetail.taxes.paid_mortgage_on_gf_ha_debt,
            paid_mortgage_on_gf_ha_debt_number: propertyDetail.taxes.paid_mortgage_on_gf_ha_debt,
            medical_and_dental_expenses:propertyDetail.taxes.medical_and_dental_expenses,
            medical_and_dental_expenses_number: propertyDetail.taxes.medical_and_dental_expenses,
            state_local_generalsales_taxes: propertyDetail.taxes.state_local_generalsales_taxes,
            state_local_generalsales_taxes_number: propertyDetail.taxes.state_local_generalsales_taxes,
            other_taxes: propertyDetail.taxes.other_taxes,
            other_taxes_number: propertyDetail.taxes.other_taxes,
            tax_deductive_investment_interest: propertyDetail.taxes.tax_deductive_investment_interest,
            tax_deductible_charitable_donations: propertyDetail.taxes.tax_deductible_charitable_donations,
            tax_deductible_charitable_donations_number: propertyDetail.taxes.tax_deductible_charitable_donations,
            tax_deductible_casualty_and_theft_losses: propertyDetail.taxes.tax_deductible_casualty_and_theft_losses,
            tax_deductible_casualty_and_theft_losses_number: propertyDetail.taxes.tax_deductible_casualty_and_theft_losses,
          });
          console.log(this.state)
          this.props.getData("tax1", this.state);
          
        })
        .catch((err) => {});
    }
  }





  componentDidMount() {}
  detailedExpenseChange = (event, value) => {
    this.setState({
      detailed_tax_expenses: value,
    });
    if (value === "Y") {
      this.setState({
        showDetailedDeductionOption: true,
      });
    } else if (value === "N") {
      this.setState({
        showDetailedDeductionOption: false,
      });
    }
  };
  previousBalanceChange = (event, value) => {
    this.setState({
      previous_balance: value,
    });
    if (value === "Y") {
      this.setState({
        showPreviousLoanBalanceButton: true,
      });
    } else if (value === "N") {
      this.setState({
        showPreviousLoanBalanceButton: false,
      });
    }
  };

  async handleChange(e) {
    const { name } = e.target;
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });

    if (this.state.detailed_tax_expenses === "Y") {
      if (
        name === "medical_and_dental_expenses" ||
        name === "state_local_generalsales_taxes" ||
        name === "other_taxes" ||
        name == "tax_deductive_investment_interest" ||
        name === "tax_deductible_charitable_donations" ||
        name === "tax_deductible_casualty_and_theft_losses"
      ) {
        updateValidators(this.Tax1YesValidators, e.target.name, e.target.value);
        const validationErrorLength = this.Tax1YesValidators[e.target.name]
          .errors.length;

        this.props.getValidationErrorTax1Yes(validationErrorLength);
      }
    }

    if (this.state.detailed_tax_expenses === "N") {
      if (name === "fedral_adjusted_gross_income") {
        updateValidators(this.Tax1NoValidators, e.target.name, e.target.value);
        const validationErrorLength = this.Tax1NoValidators[e.target.name]
          .errors.length;
        this.props.getValidationErrorTax1No(validationErrorLength);
      }
    }
    this.props.getData("tax1", this.state);
  }
  render() {
    const showGrossIncome = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Federal adjusted gross income
            </span>
            <br />
            {/* <Input
            className="input-class-mdb"
            name="fedral_adjusted_gross_income"
            value={this.state.fedral_adjusted_gross_income}
            onChange={this.handleChange}
            placeholder="Enter amount here"
          /> */}

            <NumberFormat
              className="input-class-mdb"
              name="fedral_adjusted_gross_income"
              value={this.state.fedral_adjusted_gross_income}
              onChange={this.handleChange}
              placeholder="Enter amount here"
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  fedral_adjusted_gross_income_number: formattedValue,
                });
                await this.setState({
                  fedral_adjusted_gross_income: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {/* {displayValidationErrors(this.Tax1NoValidators, "fedral_adjusted_gross_income")} */}
      </div>
    );

    const showDetailedDeductionRow = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Federal adjusted gross income
            </span>
            <br />
            {/* <Input
            className="input-class-mdb"
            name="fedral_adjusted_gross_income"
            value={this.state.fedral_adjusted_gross_income}
            onChange={this.handleChange}
            placeholder="Enter amount here"
          /> */}

            <NumberFormat
              className="input-class-mdb"
              name="fedral_adjusted_gross_income"
              value={this.state.fedral_adjusted_gross_income}
              onChange={this.handleChange}
              placeholder="Enter amount here"
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  fedral_adjusted_gross_income_number: formattedValue,
                });
                await this.setState({
                  fedral_adjusted_gross_income: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Eligible medical and dental expenses
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                If you itemize your deductions for a taxable year on Schedule A
                (Form 1040 or 1040-SR), Itemized Deductions PDF, you may be able
                to deduct expenses you paid that year for medical and dental
                care for yourself, your spouse, and your dependents. You may
                deduct only the amount of your total medical expenses that
                exceed 7.5% of your adjusted gross income. You figure the amount
                you're allowed to deduct on Schedule A (Form 1040 or 1040-SR).
                Source: IRS
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="medical_and_dental_expenses"
              value={this.state.medical_and_dental_expenses}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="medical_and_dental_expenses"
              value={this.state.medical_and_dental_expenses}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  medical_and_dental_expenses_number: formattedValue,
                });
                await this.setState({
                  medical_and_dental_expenses: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.Tax1YesValidators,
          "medical_and_dental_expenses"
        )}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Eligible state and local taxes or general sales taxes
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                If you itemize deductions on Schedule A, your total deduction
                for state and local income, sales and property taxes is limited
                to a combined, total deduction of $10,000 ($5,000 if married
                filing separately). You have the option of claiming either state
                and local income taxes or state and local sales taxes (you can’t
                claim both). Source: IRS{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="state_local_generalsales_taxes"
              value={this.state.state_local_generalsales_taxes}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="state_local_generalsales_taxes"
              value={this.state.state_local_generalsales_taxes}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  state_local_generalsales_taxes_number: formattedValue,
                });
                await this.setState({
                  state_local_generalsales_taxes: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.Tax1YesValidators,
          "state_local_generalsales_taxes"
        )}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Other state,local or personal taxes
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Deductible personal property taxes are those based only on the
                value of personal property such as a boat or car. The tax must
                be charged to you on a yearly basis, even if it's collected more
                than once a year or less than once a year. Refer to form 1040
                and Publication 17 for details. Source: IRS{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="other_taxes"
              value={this.state.other_taxes}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="other_taxes"
              value={this.state.other_taxes}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  other_taxes_number: formattedValue,
                });
                await this.setState({
                  other_taxes: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {/* {displayValidationErrors(this.Tax1YesValidators, "other_taxes")} */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Tax deductive investment interest
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Investment interest is interest paid on money you borrowed that
                is allocable to property held for investment. It doesn't include
                any interest allocable to passive activities or to securities
                that generate tax-exempt income. Source: IRS{" "}
              </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductive_investment_interest"
              value={this.state.tax_deductive_investment_interest}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.Tax1YesValidators,
          "tax_deductive_investment_interest"
        )}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Tax deductible charitable donations
            </span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_charitable_donations"
              value={this.state.tax_deductible_charitable_donations}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_charitable_donations"
              value={this.state.tax_deductible_charitable_donations}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  tax_deductible_charitable_donations_number: formattedValue,
                });
                await this.setState({
                  tax_deductible_charitable_donations: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.Tax1YesValidators,
          "tax_deductible_charitable_donations"
        )}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Tax deductible casualty and theft losses
            </span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_casualty_and_theft_losses"
              value={this.state.tax_deductible_casualty_and_theft_losses}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_casualty_and_theft_losses"
              value={this.state.tax_deductible_casualty_and_theft_losses}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  tax_deductible_casualty_and_theft_losses_number: formattedValue,
                });
                await this.setState({
                  tax_deductible_casualty_and_theft_losses: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {/* {displayValidationErrors(this.Tax1YesValidators, "tax_deductible_casualty_and_theft_losses")} */}

      </div>
    );

    return (
      <Fragment>
        <div>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12">
              <span className="get-started-label">
                Do you want to provide detailed itemized deduction?
              </span>
              <br />
              <ToggleButtonGroup
                name="select_your_filling_status"
                value={this.state.detailed_tax_expenses}
                exclusive
                onChange={this.detailedExpenseChange}
                aria-label="text alignment"
                size="large"
              >
                <ToggleButton value={"Y"}>Yes</ToggleButton>
                <ToggleButton value={"N"}>No</ToggleButton>
              </ToggleButtonGroup>
            </MDBCol>
          </MDBRow>
          {this.state.showDetailedDeductionOption
            ? showDetailedDeductionRow
            : showGrossIncome}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Tax1);
