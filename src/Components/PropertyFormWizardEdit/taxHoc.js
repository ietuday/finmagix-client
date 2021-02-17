import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { tax_update,get_tax_data } from "../redux/actions/PropertyReport/taxes";
import { Radio, Input } from "antd";
import { Button } from "@material-ui/core";
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
      tax2: {},
      tax: {},
    };
  }
  componentDidMount(){
  }
  goToNextPage = () => {
    if (
      this.state.tax.detailed_tax_expenses === "Y" &&
      this.state.tax.previous_balance === "N"
    ) {
      const showDetailedTax = {
        user_obj: localStorage.getItem("id"),
        id:JSON.parse(localStorage.getItem('tax_array')).id,
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
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
      };
      this.props.TaxesUpdate(showDetailedTax);
    } else if (
      this.state.tax.detailed_tax_expenses === "N" &&
      this.state.tax.previous_balance === "N"
    ) {
      const hidePreviousBal = {
        user_obj: localStorage.getItem("id"),
        id:JSON.parse(localStorage.getItem('tax_array')).id,
        fedral_adjusted_gross_income: this.state.tax
          .fedral_adjusted_gross_income,
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        previous_balance: this.state.tax.previous_balance,
      };
      this.props.TaxesUpdate(hidePreviousBal);
    } else if (
      this.state.tax.detailed_tax_expenses === "N" &&
      this.state.tax.previous_balance === "Y"
    ) {
      const showPreviousBal = {
        user_obj: localStorage.getItem("id"),
        id:JSON.parse(localStorage.getItem('tax_array')).id,
        fedral_adjusted_gross_income: this.state.tax
          .fedral_adjusted_gross_income,
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
        previous_balance: this.state.tax.previous_balance,
        avg_loan_balance_for_grandfathered_debt: this.state.tax
          .avg_loan_balance_for_grandfathered_debt,
        avg_loan_balance_for_home_acquisition_debt: this.state.tax
          .avg_loan_balance_for_home_acquisition_debt,
        paid_mortgage_on_gf_ha_debt: this.state.tax.paid_mortgage_on_gf_ha_debt,
      };
      this.props.TaxesUpdate(showPreviousBal);
    } else if (
      this.state.tax.detailed_tax_expenses === "Y" &&
      this.state.tax.previous_balance === "Y"
    ) {
      const showallData = {
        user_obj: localStorage.getItem("id"),
        id:JSON.parse(localStorage.getItem('tax_array')).id,
        detailed_tax_expenses: this.state.tax.detailed_tax_expenses,
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
      };
      this.props.TaxesUpdate(showallData);
    }else{
      this.props.TaxesUpdate(this.state.tax);
    }
    this.props.handleContinue();
  };
  handleNext = () => {
    this.setState({ onClick: !this.state.onClick });
  };
  getData = (name, data) => {
    this.setState({
      [name]: { data },
    });
    this.setState({
      tax: { ...this.state.tax1.data, ...this.state.tax2.data },
    });
  };
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = (e) => {
    this.setState({
      radioValue: !this.state.radioValue,
    });
    if (this.state.radioValue) {
      this.props.showStep(3);
    }
  };
  goToReport = () => {
    this.props.handleContinue();
  };
  componentWillMount() {
    const {TaxesGet} = this.props;
    TaxesGet();
  }
  componentDidMount(){
  }

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
          <Button size="medium"  className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.goToReport}>
            Continue
          </Button>
        ) : null}
       </MDBModalFooter>
      </MDBModal>
    );

    return (
      <Fragment>
        {this.props.isTaxFilled && this.props.isTaxFilled === true ? (
          <div>
            {!this.state.onClick ? (
              <Tax1 getData={this.getData} taxDataResponse={this.props.TaxGetResponse} {...this.props} {...this.state} />
            ) : (
              <Tax2 getData={this.getData} taxDataResponse={this.props.TaxGetResponse} {...this.props} {...this.state} />
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
          "You haven't opted for this field!"
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    TaxUpdateResponse: state.TaxUpdateResponse,
    TaxGetResponse : state.TaxGetResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    TaxesUpdate: (data) => dispatch(tax_update(data)),
    TaxesGet: (data) => dispatch(get_tax_data(data)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxHoc));
