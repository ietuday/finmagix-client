import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import { Radio, Input } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import quss from "../../assets/images/que.png";

import NumberFormat from "react-number-format";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";

import Tax1YesValidator from "../validatorRules/Tax1YesValidator";

export class Taxes extends Component {
  constructor() {
    super();
    this.state = {
      filling_status: "",
      detailed_tax_expenses: "N",
      previous_balance: "N",
      showDetailedDeductionOption: false,
      showPreviousLoanBalanceButton: false,
      openModal: true,
      radioValue: false,
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

      tax_deductive_investment_interest_number: JSON.parse(
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
        : ""

      // pub936_line_13a:JSON.parse(localStorage.getItem('tax_array')).pub936_line_13a ? JSON.parse(localStorage.getItem('tax_array')).pub936_line_13a : "",
    };
    
    this.Tax1YesValidators = Tax1YesValidator;
    resetValidators(this.Tax1YesValidators);
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty()
  }

  checkProperty() {
    
    const propertyId = JSON.parse(localStorage.getItem("property_id"));
    if (propertyId && JSON.parse(localStorage.getItem("tax_array")) && JSON.parse(localStorage.getItem("tax_array")).id) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0];
          if(propertyDetail.taxes.id){
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
          }
          this.props.getData("tax1", this.state);
         
          
        })
        .catch((err) => {});
    }
  }






  componentDidMount() {}
  async onChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  }
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
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  };
  async handleChange(e) {
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });
    if (
      this.state.detailed_tax_expenses === "Y" &&
      this.state.previous_balance === "N"
    ) {
      const showDetailedTax = {
        filling_status: this.state.filling_status,
        detailed_tax_expenses: this.state.detailed_tax_expenses,
        previous_balance: this.state.previous_balance,
        medical_and_dental_expenses: this.state.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state
          .state_local_generalsales_taxes,
        other_taxes: this.state.other_taxes,
        tax_deductive_investment_interest: this.state
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state
          .tax_deductible_casualty_and_theft_losses,
      };
      this.props.getTaxData(showDetailedTax);
    } else if (
      this.state.detailed_tax_expenses === "N" &&
      this.state.previous_balance === "N"
    ) {
      const hidePreviousBal = {
        filling_status: this.state.filling_status,
        fedral_adjusted_gross_income: this.state.fedral_adjusted_gross_income,
        detailed_tax_expenses: this.state.detailed_tax_expenses,
        previous_balance: this.state.previous_balance,
      };
      this.props.getTaxData(hidePreviousBal);
    } else if (
      this.state.detailed_tax_expenses === "N" &&
      this.state.previous_balance === "Y"
    ) {
      const showPreviousBal = {
        filling_status: this.state.filling_status,
        fedral_adjusted_gross_income: this.state.fedral_adjusted_gross_income,
        detailed_tax_expenses: this.state.detailed_tax_expenses,
        previous_balance: this.state.previous_balance,
        avg_loan_balance_for_grandfathered_debt: this.state
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.paid_mortgage_on_gf_ha_debt,
      };
      this.props.getTaxData(showPreviousBal);
    } else if (
      this.state.detailed_tax_expenses === "Y" &&
      this.state.previous_balance === "Y"
    ) {
      const showallData = {
        filling_status: this.state.filling_status,
        detailed_tax_expenses: this.state.detailed_tax_expenses,
        previous_balance: this.state.previous_balance,
        medical_and_dental_expenses: this.state.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state
          .state_local_generalsales_taxes,
        other_taxes: this.state.other_taxes,
        tax_deductive_investment_interest: this.state
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.paid_mortgage_on_gf_ha_debt,
      };
      this.props.getTaxData(showallData);
    }
  }
  render() {
    const showGrossIncome = (
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
    );
    const showSelectTaxModule = (
      <MDBModal
        isOpen={this.state.openModal}
        toggle={this.toggle}
        backdrop={true}
      >
        <MDBModalHeader toggle={this.toggle}>
          <div className="popupstyle">
            You haven't opted for this module.Do you still want to fill Tax
            module?
          </div>
        </MDBModalHeader>
        <div className="popupra">
          <MDBModalBody>
            <Radio.Group
              onChange={this.onRadioChange}
              value={this.state.radioValue}
              className="text-center"
            >
              <Radio value={"y"}>Yes</Radio>
              <Radio value={"n"}>No</Radio>
            </Radio.Group>
          </MDBModalBody>
        </div>
      </MDBModal>
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
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductive_investment_interest"
              value={this.state.tax_deductive_investment_interest}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductive_investment_interest"
              value={this.state.tax_deductive_investment_interest}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  tax_deductive_investment_interest: value,
                });
                await this.setState({
                  tax_deductive_investment_interest_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
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
      </div>
    );

    const showPreviousBalanceRow = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for grandfathered debt
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                If you took out a mortgage on your home before October 14, 1987,
                or you refinanced such a mortgage, it may qualify as
                grandfathered debt. Grandfathered debt isn't limited. All of the
                interest you paid on grandfathered debt is fully deductible home
                mortgage interest. However, the amount of your grandfathered
                debt reduces the limit for home acquisition debt. Source: IRS
                Publication 936{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_grandfathered_debt"
              value={this.state.avg_loan_balance_for_grandfathered_debt}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_grandfathered_debt"
              value={this.state.avg_loan_balance_for_grandfathered_debt}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  avg_loan_balance_for_grandfathered_debt_number: formattedValue,
                });
                await this.setState({
                  avg_loan_balance_for_grandfathered_debt: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for home acquisition debt
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Home acquisition debt is a mortgage you took out after October
                13, 1987, to buy, build, or substantially improve a qualified
                home (your main or second home). It must also be secured by that
                home. Source: IRS publication 936{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_home_acquisition_debt"
              value={this.state.avg_loan_balance_for_home_acquisition_debt}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_home_acquisition_debt"
              value={this.state.avg_loan_balance_for_home_acquisition_debt}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  avg_loan_balance_for_home_acquisition_debt_number: formattedValue,
                });
                await this.setState({
                  avg_loan_balance_for_home_acquisition_debt: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20 marginbottom20">
          <MDBCol md="12">
            <span className="get-started-label">
              Mortgage interest you paid on your grandfathered debt and home
              acquisition debt
            </span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="paid_mortgage_on_gf_ha_debt"
              value={this.state.paid_mortgage_on_gf_ha_debt}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here "
              name="paid_mortgage_on_gf_ha_debt"
              value={this.state.paid_mortgage_on_gf_ha_debt}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  paid_mortgage_on_gf_ha_debt_number: formattedValue,
                });
                await this.setState({
                  paid_mortgage_on_gf_ha_debt: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.Tax1YesValidators,
          "paid_mortgage_on_gf_ha_debt"
        )}
      </div>
    );

    return (
      <Fragment>
        {this.props.location.state.istaxChecked ? (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">
                  Select your filling status?
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
            <MDBRow className="margin20 marginbottom20">
              <MDBCol md="12">
                <span className="get-started-label">
                  Do you have any balances from previous loan?
                </span>
                <br />
                <ToggleButtonGroup
                  name="previous_balance"
                  value={this.state.previous_balance}
                  exclusive
                  onChange={this.previousBalanceChange}
                  aria-label="text alignment"
                  size="large"
                >
                  <ToggleButton value={"Y"}>Yes</ToggleButton>
                  <ToggleButton value={"N"}>No</ToggleButton>
                </ToggleButtonGroup>
              </MDBCol>
            </MDBRow>
            {this.state.showPreviousLoanBalanceButton
              ? showPreviousBalanceRow
              : null}
          </div>
        ) : (
          showSelectTaxModule
        )}
      </Fragment>
    );
  }
}

export default withRouter(Taxes);
