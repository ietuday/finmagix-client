import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  arm_mortgage_create_first,
  arm_mortgage_create_second,
  frm_mortgage_create_first,
  frm_mortgage_create_second,

  arm_mortgage_update_first,
  arm_mortgage_update_second,
  frm_mortgage_update_first,
  frm_mortgage_update_second

} from "../redux/actions/PropertyReport/propertyMortgage";
import { Radio } from "antd";
import { Button } from "@material-ui/core";
import SecondLoanScenario from "./secondLoanScenario";
import FirstLoanScenario from "./firstLoanScenario";
import { NotificationManager } from "react-notifications";


export class PropertyMortgageHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false,
      openModal: true,
      radioValue: false,
      firstLoanScenario: {
        firstloanarmvalidationerror: 0,
      },
      secondLoanScenario: {
        secondloanarmvalidationerror: 0,
      },
      FirstloanscenarioValidationErrors: 0,
      SecondloanscenarioValidationErrors: 0,
    };
  }
  getFirstloanScenarioValidationError = (error) => {
    this.setState({
      FirstloanscenarioValidationErrors: error,
    });
  };
  getSecondloanScenarioValidationError = (error) => {
    this.setState({
      SecondloanscenarioValidationErrors: error,
    });
  };
  handleFirstloanMortgageInfo = async (data, armvalidationerror) => {
    await this.setState((prevState) => {
      let firstLoanScenario = Object.assign({}, prevState.firstLoanScenario);
      firstLoanScenario = data;
      firstLoanScenario.firstloanarmvalidationerror = armvalidationerror;
      return { firstLoanScenario };
    });
  };
  handleSecondloanMortgageInfo = async (data, armvalidationerror) => {
    await this.setState((prevState) => {
      let secondLoanScenario = Object.assign({}, prevState.secondLoanScenario);
      secondLoanScenario = data;
      secondLoanScenario.secondloanarmvalidationerror = armvalidationerror;
      return { secondLoanScenario };
    });
  };
  handleNext = async () => {
    const { FRMMortgageCreateFirst, ARMMortgageCreateFirst, FRMMortgageUpdateFirst,
      ARMMortgageUpdateFirst } = this.props;
    if (
      this.state.firstLoanScenario.firstloanarmvalidationerror === 0 ||
      this.state.FirstloanscenarioValidationErrors === 0
    ) {
      if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {

        if (
          this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
          this.state.firstLoanScenario.loan_amount_validation_error
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {

          if (
            
            this.state.firstLoanScenario['loan_amount']
          ) {
            if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }
            if (this.state.firstLoanScenario["interest"]) {
              await this.setState((prevState) => {
                let firstLoanScenario = Object.assign({}, prevState.firstLoanScenario);
                firstLoanScenario.interest = String(
                  Number(this.state.firstLoanScenario["interest"]) / 100
                );
                return { firstLoanScenario };
              });
              // this.setState({
              //   firstLoanScenario.interest: String(
              //     Number(this.state.firstLoanScenario["interest"]) / 100
              //   );
              // })
              
            }
            if (this.state.firstLoanScenario["second_mortgage_interest"]) {
              this.state.firstLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                100
              );
            }
            if (this.state.firstLoanScenario["points"]) {
              this.state.firstLoanScenario["points"] = String(
                Number(this.state.firstLoanScenario["points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_points"]) {
              this.state.firstLoanScenario["second_mortgage_points"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
              );
            }

            if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
              FRMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
            } else {
              FRMMortgageCreateFirst(this.state.firstLoanScenario);
            }

          }
          else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }
      } else if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {


        if (
          this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
          this.state.firstLoanScenario.loan_amount_validation_error ||
          this.state.firstLoanScenario.rateAdjustmentCapValidationError ||
          this.state.firstLoanScenario.floorinterestrateValidationError ||
          this.state.firstLoanScenario.periodCapValidationError 
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {
            
          if (
            this.state.firstLoanScenario['first_interest_rate_adj_cap'] &&
            this.state.firstLoanScenario['loan_amount'] &&
            this.state.firstLoanScenario['floor_interest_rate'] &&
            this.state.firstLoanScenario['ceiling_interest_rate'] 
          ) {
            if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }

            if (this.state.firstLoanScenario["ARM1rate"]) {
              this.state.firstLoanScenario["ARM1rate"] = String(
                Number(this.state.firstLoanScenario["ARM1rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["first_interest_rate_adj_cap"]) {
              this.state.firstLoanScenario["first_interest_rate_adj_cap"] = String(
                Number(
                  this.state.firstLoanScenario["first_interest_rate_adj_cap"]
                ) / 100
              );
            }
            if (this.state.firstLoanScenario["floor_interest_rate"]) {
              this.state.firstLoanScenario["floor_interest_rate"] = String(
                Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["ceiling_interest_rate"]) {
              this.state.firstLoanScenario["ceiling_interest_rate"] = String(
                Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["period_cap"]) {
              this.state.firstLoanScenario["period_cap"] = String(
                Number(this.state.firstLoanScenario["period_cap"]) / 100
              );
            }
            if (this.state.firstLoanScenario["rate_add"]) {
              this.state.firstLoanScenario["rate_add"] = String(
                Number(this.state.firstLoanScenario["rate_add"]) / 100
              );
            }

            if (this.state.firstLoanScenario["points"]) {
              this.state.firstLoanScenario["points"] = String(
                Number(this.state.firstLoanScenario["points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_interest"]) {
              this.state.firstLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_points"]) {
              this.state.firstLoanScenario["second_mortgage_points"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["initial_interest_rate"]) {
              this.state.firstLoanScenario["initial_interest_rate"] = String(
                Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
              );
            }

            if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
              ARMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
            } else {
              ARMMortgageCreateFirst(this.state.firstLoanScenario);
            }

          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }



        // ARMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {

        if (
          this.state.firstLoanScenario.interestOnlyPeriodValidationError ||

          this.state.firstLoanScenario.loan_amount_validation_error

        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {
          if (
            this.state.firstLoanScenario['loan_amount']
          ) {
            if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }
            if (this.state.firstLoanScenario["interest"]) {
              this.state.firstLoanScenario["interest"] = String(
                Number(this.state.firstLoanScenario["interest"]) / 100
              );
            }
            if (this.state.firstLoanScenario["second_mortgage_interest"]) {
              this.state.firstLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                100
              );
            }
            if (this.state.firstLoanScenario["points"]) {
              this.state.firstLoanScenario["points"] = String(
                Number(this.state.firstLoanScenario["points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_points"]) {
              this.state.firstLoanScenario["second_mortgage_points"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
              );
            }

            if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
              FRMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
            } else {
              FRMMortgageCreateFirst(this.state.firstLoanScenario);
            }

          }
          else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }

        // FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {

        if (
          this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
          this.state.firstLoanScenario.loan_amount_validation_error ||
          this.state.firstLoanScenario.rateAdjustmentCapValidationError ||
          this.state.firstLoanScenario.floorinterestrateValidationError ||
          this.state.firstLoanScenario.periodCapValidationError
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {

          if (
            this.state.firstLoanScenario['first_interest_rate_adj_cap'] &&
            this.state.firstLoanScenario['loan_amount'] &&
            this.state.firstLoanScenario['floor_interest_rate'] &&
            this.state.firstLoanScenario['ceiling_interest_rate'] 
          ) {
            if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }

            if (this.state.firstLoanScenario["ARM1rate"]) {
              this.state.firstLoanScenario["ARM1rate"] = String(
                Number(this.state.firstLoanScenario["ARM1rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["first_interest_rate_adj_cap"]) {
              this.state.firstLoanScenario["first_interest_rate_adj_cap"] = String(
                Number(
                  this.state.firstLoanScenario["first_interest_rate_adj_cap"]
                ) / 100
              );
            }
            if (this.state.firstLoanScenario["floor_interest_rate"]) {
              this.state.firstLoanScenario["floor_interest_rate"] = String(
                Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["ceiling_interest_rate"]) {
              this.state.firstLoanScenario["ceiling_interest_rate"] = String(
                Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
              );
            }
            if (this.state.firstLoanScenario["period_cap"]) {
              this.state.firstLoanScenario["period_cap"] = String(
                Number(this.state.firstLoanScenario["period_cap"]) / 100
              );
            }
            if (this.state.firstLoanScenario["rate_add"]) {
              this.state.firstLoanScenario["rate_add"] = String(
                Number(this.state.firstLoanScenario["rate_add"]) / 100
              );
            }

            if (this.state.firstLoanScenario["points"]) {
              this.state.firstLoanScenario["points"] = String(
                Number(this.state.firstLoanScenario["points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_interest"]) {
              this.state.firstLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                100
              );
            }

            if (this.state.firstLoanScenario["second_mortgage_points"]) {
              this.state.firstLoanScenario["second_mortgage_points"] = String(
                Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
              );
            }

            if (this.state.firstLoanScenario["initial_interest_rate"]) {
              this.state.firstLoanScenario["initial_interest_rate"] = String(
                Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
              );
            }

            if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
              ARMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
            } else {
              ARMMortgageCreateFirst(this.state.firstLoanScenario);
            }

          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }
      }
      this.setState({ onClick: !this.state.onClick });
    } else {
      return NotificationManager.error("Please Validate Fields", "Error");
    }
  };
  handleSubmit = async () => {
    const {

      FRMMortgageCreateSecond,
      ARMMortgageCreateSecond,
      FRMMortgageUpdateSecond,
      ARMMortgageUpdateSecond,
      FRMMortgageCreateFirst, 
      ARMMortgageCreateFirst, 
      FRMMortgageUpdateFirst,
      ARMMortgageUpdateFirst

    } = this.props;
    if (
      this.state.secondLoanScenario.secondloanarmvalidationerror === 0 ||
      this.state.SecondloanscenarioValidationErrors === 0
    ) {
      if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 1
      ) {

        if (
          this.state.secondLoanScenario.interestOnlyPeriodValidationError ||
          this.state.secondLoanScenario.loan_amount_validation_error
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {
          if (
             
            this.state.secondLoanScenario['loan_amount']
          ) {
            if (Number(this.state.secondLoanScenario.loanamountsecond2)) {
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment) + Number(this.state.secondLoanScenario.loanamountsecond2);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }
            if (this.state.secondLoanScenario["interest"]) {
              this.state.secondLoanScenario["interest"] = String(
                Number(this.state.secondLoanScenario["interest"]) / 100
              );
            }
            if (this.state.secondLoanScenario["second_mortgage_interest"]) {
              this.state.secondLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_interest"]) /
                100
              );
            }
            if (this.state.secondLoanScenario["points"]) {
              this.state.secondLoanScenario["points"] = String(
                Number(this.state.secondLoanScenario["points"]) / 100
              );
            }

            if (this.state.secondLoanScenario["second_mortgage_points"]) {
              this.state.secondLoanScenario["second_mortgage_points"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_points"]) /
                100
              );
            }

            if (this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id) {
              FRMMortgageUpdateSecond(this.state.secondLoanScenario, this.state.secondLoanScenario.id)
            } else {
              FRMMortgageCreateSecond(this.state.secondLoanScenario);
            }
          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }
      } else if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 2
      ) {

        if (

          this.state.secondLoanScenario.interestOnlyPeriodValidationError ||
          this.state.secondLoanScenario.loan_amount_validation_error ||
          this.state.secondLoanScenario.rateAdjustmentCapValidationError ||
          this.state.secondLoanScenario.floorinterestrateValidationError ||
          this.state.secondLoanScenario.periodCapValidationError
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {

          if (
            this.state.secondLoanScenario['first_interest_rate_adj_cap'] &&
            this.state.secondLoanScenario['loan_amount'] &&
            this.state.secondLoanScenario['floor_interest_rate'] &&
            this.state.secondLoanScenario['ceiling_interest_rate'] 
          ) {
            if (Number(this.state.secondLoanScenario.loanamountsecond2)) {
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment) + Number(this.state.secondLoanScenario.loanamountsecond2);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }

            if (this.state.secondLoanScenario["ARM2rate"]) {
              this.state.secondLoanScenario["ARM2rate"] = String(
                Number(this.state.secondLoanScenario["ARM2rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["first_interest_rate_adj_cap"]) {
              this.state.secondLoanScenario["first_interest_rate_adj_cap"] = String(
                Number(
                  this.state.secondLoanScenario["first_interest_rate_adj_cap"]
                ) / 100
              );
            }
            if (this.state.secondLoanScenario["floor_interest_rate"]) {
              this.state.secondLoanScenario["floor_interest_rate"] = String(
                Number(this.state.secondLoanScenario["floor_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["ceiling_interest_rate"]) {
              this.state.secondLoanScenario["ceiling_interest_rate"] = String(
                Number(this.state.secondLoanScenario["ceiling_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["period_cap"]) {
              this.state.secondLoanScenario["period_cap"] = String(
                Number(this.state.secondLoanScenario["period_cap"]) / 100
              );
            }
            if (this.state.secondLoanScenario["rate_add"]) {
              this.state.secondLoanScenario["rate_add"] = String(
                Number(this.state.secondLoanScenario["rate_add"]) / 100
              );
            }

            if (this.state.secondLoanScenario["points"]) {
              this.state.secondLoanScenario["points"] = String(
                Number(this.state.secondLoanScenario["points"]) / 100
              );
            }

            if (this.state.secondLoanScenario["second_mortgage_interest"]) {
              this.state.secondLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_interest"]) /
                100
              );
            }

            if (this.state.secondLoanScenario["second_mortgage_points"]) {
              this.state.secondLoanScenario["second_mortgage_points"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_points"]) /
                100
              );
            }

            if (this.state.secondLoanScenario["initial_interest_rate"]) {
              this.state.secondLoanScenario["initial_interest_rate"] = String(
                Number(this.state.secondLoanScenario["initial_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id) {
              ARMMortgageUpdateSecond(this.state.secondLoanScenario, this.state.secondLoanScenario.id)
            } else {
              ARMMortgageCreateSecond(this.state.secondLoanScenario);
            }
          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }

        }
      } else if (
        !this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 1
      ) {

        if (
          this.state.secondLoanScenario.interestOnlyPeriodValidationError ||
          this.state.secondLoanScenario.loan_amount_validation_error
        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {


            if (
              
              this.state.secondLoanScenario['loan_amount']
            ) {
              if (Number(this.state.secondLoanScenario.loanamountsecond2)) {
                const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment) + Number(this.state.secondLoanScenario.loanamountsecond2);
                if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                  return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

                }
              }else{
                const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment);
                if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                  return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
  
                }
              }
              if (this.state.secondLoanScenario["interest"]) {
                this.state.secondLoanScenario["interest"] = String(
                  Number(this.state.secondLoanScenario["interest"]) / 100
                );
              }
              if (this.state.secondLoanScenario["second_mortgage_interest"]) {
                this.state.secondLoanScenario["second_mortgage_interest"] = String(
                  Number(this.state.secondLoanScenario["second_mortgage_interest"]) /
                  100
                );
              }
              if (this.state.secondLoanScenario["points"]) {
                this.state.secondLoanScenario["points"] = String(
                  Number(this.state.secondLoanScenario["points"]) / 100
                );
              }

              if (this.state.secondLoanScenario["second_mortgage_points"]) {
                this.state.secondLoanScenario["second_mortgage_points"] = String(
                  Number(this.state.secondLoanScenario["second_mortgage_points"]) /
                  100
                );
              }

              if (this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id) {
                FRMMortgageUpdateSecond(this.state.secondLoanScenario, this.state.secondLoanScenario.id)
              } else {
                FRMMortgageCreateSecond(this.state.secondLoanScenario);
              }
            
          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }
      } else if (
        !this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 2
      ) {


        if (
          this.state.secondLoanScenario.interestOnlyPeriodValidationError ||
          this.state.secondLoanScenario.loan_amount_validation_error ||
          this.state.secondLoanScenario.rateAdjustmentCapValidationError ||
          this.state.secondLoanScenario.floorinterestrateValidationError ||
          this.state.secondLoanScenario.periodCapValidationError

        ) {
          return NotificationManager.error('error', 'Validation Error')
        } else {
          if (
            this.state.secondLoanScenario['first_interest_rate_adj_cap'] &&
            this.state.secondLoanScenario['loan_amount'] &&
            this.state.secondLoanScenario['floor_interest_rate'] &&
            this.state.secondLoanScenario['ceiling_interest_rate']
          ) {
            if (Number(this.state.secondLoanScenario.loanamountsecond2)) {
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment) + Number(this.state.secondLoanScenario.loanamountsecond2);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }else{
              const checkSum = Number(this.state.secondLoanScenario.loan_amount) + Number(this.state.secondLoanScenario.property_downpayment);
              if (checkSum !== Number(this.state.secondLoanScenario.property_price)) {
                return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')

              }
            }

            if (this.state.secondLoanScenario["ARM2rate"]) {
              this.state.secondLoanScenario["ARM2rate"] = String(
                Number(this.state.secondLoanScenario["ARM2rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["first_interest_rate_adj_cap"]) {
              this.state.secondLoanScenario["first_interest_rate_adj_cap"] = String(
                Number(
                  this.state.secondLoanScenario["first_interest_rate_adj_cap"]
                ) / 100
              );
            }
            if (this.state.secondLoanScenario["floor_interest_rate"]) {
              this.state.secondLoanScenario["floor_interest_rate"] = String(
                Number(this.state.secondLoanScenario["floor_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["ceiling_interest_rate"]) {
              this.state.secondLoanScenario["ceiling_interest_rate"] = String(
                Number(this.state.secondLoanScenario["ceiling_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario["period_cap"]) {
              this.state.secondLoanScenario["period_cap"] = String(
                Number(this.state.secondLoanScenario["period_cap"]) / 100
              );
            }
            if (this.state.secondLoanScenario["rate_add"]) {
              this.state.secondLoanScenario["rate_add"] = String(
                Number(this.state.secondLoanScenario["rate_add"]) / 100
              );
            }

            if (this.state.secondLoanScenario["points"]) {
              this.state.secondLoanScenario["points"] = String(
                Number(this.state.secondLoanScenario["points"]) / 100
              );
            }

            if (this.state.secondLoanScenario["second_mortgage_interest"]) {
              this.state.secondLoanScenario["second_mortgage_interest"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_interest"]) /
                100
              );
            }

            if (this.state.secondLoanScenario["second_mortgage_points"]) {
              this.state.secondLoanScenario["second_mortgage_points"] = String(
                Number(this.state.secondLoanScenario["second_mortgage_points"]) /
                100
              );
            }

            if (this.state.secondLoanScenario["initial_interest_rate"]) {
              this.state.secondLoanScenario["initial_interest_rate"] = String(
                Number(this.state.secondLoanScenario["initial_interest_rate"]) / 100
              );
            }
            if (this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id) {
              ARMMortgageUpdateSecond(this.state.secondLoanScenario, this.state.secondLoanScenario.id)
            } else {
              ARMMortgageCreateSecond(this.state.secondLoanScenario);
            }

          } else {
            return NotificationManager.error('Validation error', 'Please fill required fields')
          }
        }
      } else {
        // return NotificationManager.error("Please Validate Fields", "Error");
        if (
          this.state.firstLoanScenario.firstloanarmvalidationerror === 0 ||
          this.state.FirstloanscenarioValidationErrors === 0
        ) {
          if (
            this.state.radioValue &&
            this.state.firstLoanScenario.mortgage_program_type_value === 1
          ) {
    
            if (
              this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
              this.state.firstLoanScenario.loan_amount_validation_error
            ) {
              return NotificationManager.error('error', 'Validation Error')
            } else {
    
              if (
                
                this.state.firstLoanScenario['loan_amount']
              ) {
                if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }else{
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }
                if (this.state.firstLoanScenario["interest"]) {
                  await this.setState((prevState) => {
                    let firstLoanScenario = Object.assign({}, prevState.firstLoanScenario);
                    firstLoanScenario.interest = String(
                      Number(this.state.firstLoanScenario["interest"]) / 100
                    );
                    return { firstLoanScenario };
                  });
                  // this.setState({
                  //   firstLoanScenario.interest: String(
                  //     Number(this.state.firstLoanScenario["interest"]) / 100
                  //   );
                  // })
                  
                }
                if (this.state.firstLoanScenario["second_mortgage_interest"]) {
                  this.state.firstLoanScenario["second_mortgage_interest"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                    100
                  );
                }
                if (this.state.firstLoanScenario["points"]) {
                  this.state.firstLoanScenario["points"] = String(
                    Number(this.state.firstLoanScenario["points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_points"]) {
                  this.state.firstLoanScenario["second_mortgage_points"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
                  FRMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
                } else {
                  FRMMortgageCreateFirst(this.state.firstLoanScenario);
                }
    
              }
              else {
                return NotificationManager.error('Validation error', 'Please fill required fields')
              }
            }
          } else if (
            this.state.radioValue &&
            this.state.firstLoanScenario.mortgage_program_type_value === 2
          ) {
    
            if (
              this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
              this.state.firstLoanScenario.loan_amount_validation_error ||
              this.state.firstLoanScenario.rateAdjustmentCapValidationError ||
              this.state.firstLoanScenario.floorinterestrateValidationError ||
              this.state.firstLoanScenario.periodCapValidationError
            ) {
              return NotificationManager.error('error', 'Validation Error')
            } else {
              
              if (
                this.state.firstLoanScenario['first_interest_rate_adj_cap'] &&
                this.state.firstLoanScenario['loan_amount'] &&
                this.state.firstLoanScenario['floor_interest_rate'] &&
                this.state.firstLoanScenario['ceiling_interest_rate']
              ) {
                if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }else{
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }
    
                if (this.state.firstLoanScenario["ARM1rate"]) {
                  this.state.firstLoanScenario["ARM1rate"] = String(
                    Number(this.state.firstLoanScenario["ARM1rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["first_interest_rate_adj_cap"]) {
                  this.state.firstLoanScenario["first_interest_rate_adj_cap"] = String(
                    Number(
                      this.state.firstLoanScenario["first_interest_rate_adj_cap"]
                    ) / 100
                  );
                }
                if (this.state.firstLoanScenario["floor_interest_rate"]) {
                  this.state.firstLoanScenario["floor_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["ceiling_interest_rate"]) {
                  this.state.firstLoanScenario["ceiling_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["period_cap"]) {
                  this.state.firstLoanScenario["period_cap"] = String(
                    Number(this.state.firstLoanScenario["period_cap"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["rate_add"]) {
                  this.state.firstLoanScenario["rate_add"] = String(
                    Number(this.state.firstLoanScenario["rate_add"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["points"]) {
                  this.state.firstLoanScenario["points"] = String(
                    Number(this.state.firstLoanScenario["points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_interest"]) {
                  this.state.firstLoanScenario["second_mortgage_interest"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                    100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_points"]) {
                  this.state.firstLoanScenario["second_mortgage_points"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["initial_interest_rate"]) {
                  this.state.firstLoanScenario["initial_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
                  ARMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
                } else {
                  ARMMortgageCreateFirst(this.state.firstLoanScenario);
                }
    
              } else {
                return NotificationManager.error('Validation error', 'Please fill required fields')
              }
            }
    
    
    
            // ARMMortgageCreateFirst(this.state.firstLoanScenario);
          } else if (
            !this.state.radioValue &&
            this.state.firstLoanScenario.mortgage_program_type_value === 1
          ) {
    
            if (
              this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
    
              this.state.firstLoanScenario.loan_amount_validation_error
    
            ) {
              return NotificationManager.error('error', 'Validation Error')
            } else {
              if (
                
                this.state.firstLoanScenario['loan_amount']
              ) {
                if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }else{
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }
                if (this.state.firstLoanScenario["interest"]) {
                  this.state.firstLoanScenario["interest"] = String(
                    Number(this.state.firstLoanScenario["interest"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["second_mortgage_interest"]) {
                  this.state.firstLoanScenario["second_mortgage_interest"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                    100
                  );
                }
                if (this.state.firstLoanScenario["points"]) {
                  this.state.firstLoanScenario["points"] = String(
                    Number(this.state.firstLoanScenario["points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_points"]) {
                  this.state.firstLoanScenario["second_mortgage_points"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
                  FRMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
                } else {
                  FRMMortgageCreateFirst(this.state.firstLoanScenario);
                }
    
              }
              else {
                return NotificationManager.error('Validation error', 'Please fill required fields')
              }
            }
    
            // FRMMortgageCreateFirst(this.state.firstLoanScenario);
          } else if (
            !this.state.radioValue &&
            this.state.firstLoanScenario.mortgage_program_type_value === 2
          ) {
            
            if (
              this.state.firstLoanScenario.interestOnlyPeriodValidationError ||
              this.state.firstLoanScenario.loan_amount_validation_error ||
              this.state.firstLoanScenario.rateAdjustmentCapValidationError ||
              this.state.firstLoanScenario.floorinterestrateValidationError ||
              this.state.firstLoanScenario.periodCapValidationError
            ) {
              return NotificationManager.error('error', 'Validation Error')
            } else {
              
              if (
                this.state.firstLoanScenario['first_interest_rate_adj_cap'] &&
                this.state.firstLoanScenario['loan_amount'] &&
                this.state.firstLoanScenario['floor_interest_rate'] &&
                this.state.firstLoanScenario['ceiling_interest_rate'] 
              ) {
                if (Number(this.state.firstLoanScenario.loanamountsecond1)) {
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment) + Number(this.state.firstLoanScenario.loanamountsecond1);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + second loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }else{
                  const checkSum = Number(this.state.firstLoanScenario.loan_amount) + Number(this.state.firstLoanScenario.property_downpayment);
                  if (checkSum !== Number(this.state.firstLoanScenario.property_price)) {
                    return NotificationManager.error('error', 'First loan amount + downpayment should be equal to Property Price.Tip: you may model first loan = 80% of home price if you have a second mortgage')
    
                  }
                }
    
                if (this.state.firstLoanScenario["ARM1rate"]) {
                  this.state.firstLoanScenario["ARM1rate"] = String(
                    Number(this.state.firstLoanScenario["ARM1rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["first_interest_rate_adj_cap"]) {
                  this.state.firstLoanScenario["first_interest_rate_adj_cap"] = String(
                    Number(
                      this.state.firstLoanScenario["first_interest_rate_adj_cap"]
                    ) / 100
                  );
                }
                if (this.state.firstLoanScenario["floor_interest_rate"]) {
                  this.state.firstLoanScenario["floor_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["ceiling_interest_rate"]) {
                  this.state.firstLoanScenario["ceiling_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["period_cap"]) {
                  this.state.firstLoanScenario["period_cap"] = String(
                    Number(this.state.firstLoanScenario["period_cap"]) / 100
                  );
                }
                if (this.state.firstLoanScenario["rate_add"]) {
                  this.state.firstLoanScenario["rate_add"] = String(
                    Number(this.state.firstLoanScenario["rate_add"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["points"]) {
                  this.state.firstLoanScenario["points"] = String(
                    Number(this.state.firstLoanScenario["points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_interest"]) {
                  this.state.firstLoanScenario["second_mortgage_interest"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_interest"]) /
                    100
                  );
                }
    
                if (this.state.firstLoanScenario["second_mortgage_points"]) {
                  this.state.firstLoanScenario["second_mortgage_points"] = String(
                    Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario["initial_interest_rate"]) {
                  this.state.firstLoanScenario["initial_interest_rate"] = String(
                    Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
                  );
                }
    
                if (this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id) {
                  ARMMortgageUpdateFirst(this.state.firstLoanScenario, this.state.firstLoanScenario.id)
                } else {
                  ARMMortgageCreateFirst(this.state.firstLoanScenario);
                }
    
              } else {
                return NotificationManager.error('Validation error', 'Please fill required fields')
              }
            }
          }
          
        } else {
          return NotificationManager.error("Please Validate Fields", "Error");
        }
      }
      this.props.handleContinue();
    }else {
      return NotificationManager.error("Please Validate Fields", "Error");
    }
  };
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = async (e) => {
    await this.setState({
      radioValue: !this.state.radioValue,
      openModal: !this.state.openModal,
    });
    this.props.selectLoanScenario(this.state.radioValue);
  };
  remainOnSamePage = () => {
    this.setState({
      radioValue: false,
      onClick: false,
      openModal: false,
    });
  };
  componentDidMount() { }
  render() {
    const showSelectLoanScenarioModule = (
      <div>
        <MDBModal
          isOpen={this.state.openModal}
          toggle={this.toggle}
          backdrop={true}
          keyboard={false}
          disableBackdrop={true}
          size="small"
          centered
        >
          <MDBModalHeader toggle={this.toggle}>
            <div>
              <h4>Select Loan Choices</h4>
            </div>
          </MDBModalHeader>

          <MDBModalBody>
            <p>
              You have the option to model two loan scenarios. This allows you
              to<br></br>
              compare different loan Programs you may be evaluating.
            </p>
            <p className="">Do you want to model two loan scenarios?</p>

            <Radio.Group
              defaultValue={false}
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
              <Button
                size="medium"
                className="btn btn-primary btn-sm waves-effect waves-light"
                onClick={this.remainOnSamePage}
              >
                Continue
              </Button>
            ) : null}
          </MDBModalFooter>
        </MDBModal>
      </div>
    );

    return (
      <Fragment>
        {this.state.openModal ? (
          showSelectLoanScenarioModule
        ) : (
            <div>
              {!this.state.onClick ? (
                <FirstLoanScenario
                  downpayment={this.props.downpayment}
                  handleFirstloanMortgageInfo={this.handleFirstloanMortgageInfo}
                  getValidationError={this.getFirstloanScenarioValidationError}
                  {...this.props}
                  {...this.state}
                />
              ) : (
                  <SecondLoanScenario
                    downpayment={this.props.downpayment}
                    handleSecondloanMortgageInfo={this.handleSecondloanMortgageInfo}
                    getValidationError={this.getSecondloanScenarioValidationError}
                    {...this.props}
                    {...this.state}
                  />
                )}

              {!this.state.onClick && this.state.radioValue === true ? (
                <MDBRow className="margin20 text-center">
                  <MDBCol md="12">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className="button-inner-class"
                      size="large"
                    >
                      Second Loan Scenario
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
                          onClick={this.handleSubmit}
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
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FRMMortgageCreateResponseFirst: state.FRMMortgageCreateResponseFirst,
    FRMMortgageCreateResponseSecond: state.FRMMortgageCreateResponseSecond,
    ARMMortgageCreateResponseFirst: state.ARMMortgageCreateResponseFirst,
    ARMMortgageCreateResponseSecond: state.ARMMortgageCreateResponseSecond,

    FRMMortgageUpdateResponseFirst: state.FRMMortgageUpdateResponseFirst,
    FRMMortgageUpdateResponseSecond: state.FRMMortgageUpdateResponseSecond,
    ARMMortgageUpdateResponseFirst: state.ARMMortgageUpdateResponseFirst,
    ARMMortgageUpdateResponseSecond: state.ARMMortgageUpdateResponseSecond,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FRMMortgageCreateFirst: (data) => dispatch(frm_mortgage_create_first(data)),
    ARMMortgageCreateFirst: (data) => dispatch(arm_mortgage_create_first(data)),
    FRMMortgageCreateSecond: (data) =>
      dispatch(frm_mortgage_create_second(data)),
    ARMMortgageCreateSecond: (data) =>
      dispatch(arm_mortgage_create_second(data)),

    FRMMortgageUpdateFirst: (data, id) => dispatch(frm_mortgage_update_first(data, id)),
    ARMMortgageUpdateFirst: (data, id) => dispatch(arm_mortgage_update_first(data, id)),
    FRMMortgageUpdateSecond: (data, id) =>
      dispatch(frm_mortgage_update_second(data, id)),
    ARMMortgageUpdateSecond: (data, id) =>
      dispatch(arm_mortgage_update_second(data, id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PropertyMortgageHOC)
);
