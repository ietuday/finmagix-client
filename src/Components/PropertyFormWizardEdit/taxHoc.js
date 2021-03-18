import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { tax_create, tax_update } from "../redux/actions/PropertyReport/taxes";

import { Radio} from "antd";
import { Button } from "@material-ui/core";
import { isFormValid } from "../../common/ValidatorFunction";
import Tax1 from "./tax1";
import Tax2 from "./tax2";

export class TaxHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false,
      openModal: true,
      radioValue: false,
      tax1: {},
      tax1YesValidationError: 0,
      tax1NoValidationError: 0,
      tax2ValidationError: 0,
      tax2: {},
      tax: {},
      isTaxFilled: false,
    };
  }
  tax1YesValidationError = (error, status) => {
     this.setState({
      tax1YesValidationError: error,
    });
  };
  tax1NoValidationError = (error, status) => {
    this.setState({
      tax1NoValidationError: error,
    });
  };
  tax2ValidationError = (error) => {
    this.setState({
      tax2ValidationError: error,
    });
  };
  goToNextPage = () => {
    if (this.state.tax.previous_balance === "Y") {
      this.saveApiData();
    } else {
      this.saveApiData();
    }
  };
  saveApiData = () => {
    
    if (
      this.state.tax.detailed_tax_expenses === "Y" &&
      this.state.tax.previous_balance === "N"
    ) {
      const showallData = {
        user_obj: localStorage.getItem("id"),
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        fedral_adjusted_gross_income: this.state.tax
        .fedral_adjusted_gross_income,
        previous_balance: this.state.tax.previous_balance,
        medical_and_dental_expenses: this.state.tax.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state.tax
          .state_local_generalsales_taxes,
        other_taxes: this.state.tax.other_taxes,
        tax_deductive_investment_interest: this.state.tax
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state.tax
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state.tax
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
        property_obj: localStorage.getItem("property_id"),
        id:
          Object.entries(JSON.parse(localStorage.getItem("tax_array")))
            .length !== 0
            ? JSON.parse(localStorage.getItem("tax_array")).id
            : null,
      };
      Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !== 0
        ? this.props.TaxesUpdate(showallData)
        : this.props.TaxesCreate(showallData);
    } else if (
      this.state.tax.detailed_tax_expenses === "N" &&
      this.state.tax.previous_balance === "N"
    ) {
      const showallData = {
        user_obj: localStorage.getItem("id"),
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        fedral_adjusted_gross_income: this.state.tax
        .fedral_adjusted_gross_income,
        previous_balance: this.state.tax.previous_balance,
        medical_and_dental_expenses: this.state.tax.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state.tax
          .state_local_generalsales_taxes,
        other_taxes: this.state.tax.other_taxes,
        tax_deductive_investment_interest: this.state.tax
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state.tax
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state.tax
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
        property_obj: localStorage.getItem("property_id"),
        id:
          Object.entries(JSON.parse(localStorage.getItem("tax_array")))
            .length !== 0
            ? JSON.parse(localStorage.getItem("tax_array")).id
            : null,
      };
      Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !== 0
        ? this.props.TaxesUpdate(showallData)
        : this.props.TaxesCreate(showallData);
    } else if (
      this.state.tax.detailed_tax_expenses === "N" &&
      this.state.tax.previous_balance === "Y"
    ) {
      const showallData = {
        user_obj: localStorage.getItem("id"),
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        fedral_adjusted_gross_income: this.state.tax
        .fedral_adjusted_gross_income,
        previous_balance: this.state.tax.previous_balance,
        medical_and_dental_expenses: this.state.tax.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state.tax
          .state_local_generalsales_taxes,
        other_taxes: this.state.tax.other_taxes,
        tax_deductive_investment_interest: this.state.tax
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state.tax
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state.tax
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
        property_obj: localStorage.getItem("property_id"),
        id:
          Object.entries(JSON.parse(localStorage.getItem("tax_array")))
            .length !== 0
            ? JSON.parse(localStorage.getItem("tax_array")).id
            : null,
      };
      Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !== 0
        ? this.props.TaxesUpdate(showallData)
        : this.props.TaxesCreate(showallData);
    } else if (
      this.state.tax.detailed_tax_expenses === "Y" &&
      this.state.tax.previous_balance === "Y"
    ) {

      const showallData = {
        user_obj: localStorage.getItem("id"),
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        fedral_adjusted_gross_income: this.state.tax
        .fedral_adjusted_gross_income,
        previous_balance: this.state.tax.previous_balance,
        medical_and_dental_expenses: this.state.tax.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state.tax
          .state_local_generalsales_taxes,
        other_taxes: this.state.tax.other_taxes,
        tax_deductive_investment_interest: this.state.tax
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state.tax
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state.tax
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
        property_obj: localStorage.getItem("property_id"),
        id:
          Object.entries(JSON.parse(localStorage.getItem("tax_array")))
            .length !== 0
            ? JSON.parse(localStorage.getItem("tax_array")).id
            : null,
      };
      Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !== 0
        ? this.props.TaxesUpdate(showallData)
        : this.props.TaxesCreate(showallData);
    }else{
      const showallData = {
        user_obj: localStorage.getItem("id"),
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        fedral_adjusted_gross_income: this.state.tax
        .fedral_adjusted_gross_income,
        previous_balance: this.state.tax.previous_balance,
        medical_and_dental_expenses: this.state.tax.medical_and_dental_expenses,
        state_local_generalsales_taxes: this.state.tax
          .state_local_generalsales_taxes,
        other_taxes: this.state.tax.other_taxes,
        tax_deductive_investment_interest: this.state.tax
          .tax_deductive_investment_interest,
        tax_deductible_charitable_donations: this.state.tax
          .tax_deductible_charitable_donations,
        tax_deductible_casualty_and_theft_losses: this.state.tax
          .tax_deductible_casualty_and_theft_losses,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
        property_obj: localStorage.getItem("property_id"),
        id:
          Object.entries(JSON.parse(localStorage.getItem("tax_array")))
            .length !== 0
            ? JSON.parse(localStorage.getItem("tax_array")).id
            : null,
      };
      
      Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !== 0
      ? this.props.TaxesUpdate(showallData)
      : this.props.TaxesCreate(showallData);
    }
    this.props.handleContinue();
  };
  handleNext = () => {
    (this.state.tax1YesValidationError === 0 && isFormValid("tax1Yes")) ||
    (this.state.tax1NoValidationError === 0 && isFormValid("tax1No"))
      ? this.setState({ onClick: !this.state.onClick })
      : this.setState({ onClick: this.state.onClick });
    (this.state.tax1YesValidationError === 0 && isFormValid("tax1Yes")) ||
    (this.state.tax1NoValidationError === 0 && isFormValid("tax1No"))
      ? this.setState({ onClick: !this.state.onClick })
      : this.setState({ onClick: !this.state.onClick })
  };
  getData = async (name, data) => {
    this.setState({
      [name]: { data },
    });
    await this.setState({
      tax: { ...this.state.tax1.data, ...this.state.tax2.data },
      isTaxFilled: true,
    });
    
    
    // this.props.getTaxFilledStataus(this.state.isTaxFilled);
  };
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
    if (this.state.radioValue) {
      this.props.showStep(3);
    }
  };
  goToReport = () => {
    this.props.handleContinue();
  };
  componentDidMount() {}

  render() {
    const showSelectTaxModule = (
      <MDBModal
        isOpen={this.state.openModal}
        toggle={this.toggle}
        backdrop={true}
        keyboard={false}
        disableBackdrop={true}
      >
        <MDBModalHeader toggle={this.toggle}>
        <div><h4>Rent Vs Buy</h4></div>
         
       
        </MDBModalHeader>
       
        
          <MDBModalBody>

          <p>
          You haven't opted for this module. <br></br>Do you still want to fill Rent vs
            Buy module? {" "}
          </p>
            <Radio.Group
              onChange={this.onRadioChange}
              value={this.state.radioValue}
              className="text-center"
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </MDBModalBody>

          <MDBModalFooter className="button-center">
          {!this.state.radioValue ? (
            <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.goToReport}>
              Continue
            </Button>
          ) : null}
        </MDBModalFooter>
      </MDBModal>
    );

    return (
      <Fragment>
        {localStorage.getItem("is_tax_selected") === "true" ||
        this.state.radioValue ||
        Object.entries(JSON.parse(localStorage.getItem("tax_array"))).length !==
          0 ? (
          <div>
            {!this.state.onClick ? (
              <Tax1
                getData={this.getData}
                getValidationErrorTax1Yes={this.tax1YesValidationError}
                getValidationErrorTax1No={this.tax1NoValidationError}
                {...this.props}
                {...this.state}
              />
            ) : (
              <Tax2
                getData={this.getData}
                getValidationError={this.tax2ValidationError}
                {...this.props}
                {...this.state}
              />
            )}
            <div>
              {!this.state.onClick ? (
                <MDBRow className="margin20 text-center">
                  <MDBCol md="12">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className="button-inner-class"
                      size="large"
                    >
                      Next
                    </Button>
                  </MDBCol>
                </MDBRow>
              ) : (
                <div>
                  <MDBRow className="margin20 text-center">
                    <MDBCol md="12">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.goToNextPage}
                        className="button-inner-class"
                        size="large"
                      >
                        Continue
                      </Button>
                    </MDBCol>
                  </MDBRow>
                </div>
              )}
            </div>
          </div>
        ) : (
          showSelectTaxModule
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    TaxCreateResponse: state.TaxCreateResponse,
    TaxUpdateResponse: state.TaxUpdateResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    TaxesCreate: (data) => dispatch(tax_create(data)),
    TaxesUpdate: (data) => dispatch(tax_update(data)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxHoc));
