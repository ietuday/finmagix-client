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
import { isFormValid } from "../../common/ValidatorFunction";

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

  componentWillMount() {
    const {
      FRMMortgageGetFirst,
      ARMMortgageGetFirst,
      FRMMortgageGetSecond,
      ARMMortgageGetSecond,
    } = this.props;
    if (this.props.FrmMortgageFirstEditId !== undefined) {
      FRMMortgageGetFirst(this.props.FrmMortgageFirstEditId);
    }
    if (this.props.ArmMortgageFirstEditId !== undefined) {
      ARMMortgageGetFirst(this.props.ArmMortgageFirstEditId);
    }
    if (this.props.FrmMortgageSecondEditId !== undefined) {
      FRMMortgageGetSecond(this.props.FrmMortgageSecondEditId);
    }
    if (this.props.ArmMortgageSecondEditId !== undefined) {
      ARMMortgageGetSecond(this.props.ArmMortgageSecondEditId);
    }
  }
  handleFirstloanMortgageInfo = async (data) => {
    await this.setState((prevState) => {
      let firstLoanScenario = Object.assign({}, prevState.firstLoanScenario);
      firstLoanScenario = data;
      return { firstLoanScenario };
    });
  };
  handleSecondloanMortgageInfo = async (data) => {
    await this.setState((prevState) => {
      let secondLoanScenario = Object.assign({}, prevState.secondLoanScenario);
      secondLoanScenario = data;
      return { secondLoanScenario };
    });
  };
handleNext = () => {
    const { FRMMortgageCreateFirst, ARMMortgageCreateFirst,FRMMortgageUpdateFirst,
      ARMMortgageUpdateFirst  } = this.props;
    if (
      this.state.firstLoanScenario.firstloanarmvalidationerror === 0 ||
      this.state.FirstloanscenarioValidationErrors === 0
    ) {
      if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {
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

        if(this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id){
          FRMMortgageUpdateFirst(this.state.firstLoanScenario,this.state.firstLoanScenario.id )
        }else{
          FRMMortgageCreateFirst(this.state.firstLoanScenario);
        }
        // FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {
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

        if(this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id){
          ARMMortgageUpdateFirst(this.state.firstLoanScenario,this.state.firstLoanScenario.id )
        }else{
          ARMMortgageCreateFirst(this.state.firstLoanScenario);
        }

        // ARMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {
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
        if(this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id){
          FRMMortgageUpdateFirst(this.state.firstLoanScenario,this.state.firstLoanScenario.id )
        }else{
          FRMMortgageCreateFirst(this.state.firstLoanScenario);
        }
        // FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {
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

        if(this.state.firstLoanScenario.is_update && this.state.firstLoanScenario.id){
          ARMMortgageUpdateFirst(this.state.firstLoanScenario,this.state.firstLoanScenario.id )
        }else{
          ARMMortgageCreateFirst(this.state.firstLoanScenario);
        }
        // ARMMortgageCreateFirst(this.state.firstLoanScenario);
      }
      this.setState({ onClick: !this.state.onClick });
    } else {
      NotificationManager.error("Please Validate Fields", "Error");
    }
  };
  goToNextPage = () => {
    const {FRMMortgageUpdateFirst,ARMMortgageUpdateFirst,FRMMortgageUpdateSecond,ARMMortgageUpdateSecond} = this.props;
    if(this.state.firstLoanScenario && this.state.firstLoanScenario.mortgage_program_type === 1){
      FRMMortgageUpdateFirst(this.state.firstLoanScenario,this.props.FrmMortgageFirstEditId)
    }
    if(this.state.firstLoanScenario && this.state.firstLoanScenario.mortgage_program_type === 2){
      ARMMortgageUpdateFirst(this.state.firstLoanScenario,this.props.ArmMortgageFirstEditId)
    }
    if(this.state.secondLoanScenario && this.state.secondLoanScenario.mortgage_program_type === 1){
      FRMMortgageUpdateSecond(this.state.secondLoanScenario,this.props.FrmMortgageSecondEditId)
    }
    if(this.state.secondLoanScenario && this.state.secondLoanScenario.mortgage_program_type === 2){
      ARMMortgageUpdateSecond(this.state.secondLoanScenario,this.props.ArmMortgageSecondEditId)
    }
    this.props.handleContinue();

    const {
      FRMMortgageCreateFirst,
      ARMMortgageCreateFirst,
      FRMMortgageCreateSecond,
      ARMMortgageCreateSecond,
      FRMMortgageUpdateFirst,
      ARMMortgageUpdateFirst,
      FRMMortgageUpdateSecond,
      ARMMortgageUpdateSecond,

    } = this.props;
    if (
      this.state.secondLoanScenario.secondloanarmvalidationerror === 0 ||
      this.state.SecondloanscenarioValidationErrors === 0
    ) {
      if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 1
      ) {
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
       
        if(this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id){
          FRMMortgageUpdateSecond(this.state.secondLoanScenario,this.state.secondLoanScenario.id )
        }else{
          FRMMortgageCreateSecond(this.state.secondLoanScenario);
        }

        // FRMMortgageCreateSecond(this.state.secondLoanScenario);

      } else if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 2
      ) {
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
        if(this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id){
          ARMMortgageUpdateSecond(this.state.secondLoanScenario,this.state.secondLoanScenario.id )
        }else{
          ARMMortgageCreateSecond(this.state.secondLoanScenario);
        }


        // ARMMortgageCreateSecond(this.state.secondLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {
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
        if(this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id){
          FRMMortgageUpdateFirst(this.state.secondLoanScenario,this.state.secondLoanScenario.id )
        }else{
          FRMMortgageCreateFirst(this.state.secondLoanScenario);
        }
        // FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {
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
        if(this.state.secondLoanScenario.is_update && this.state.secondLoanScenario.id){
          ARMMortgageUpdateFirst(this.state.secondLoanScenario,this.state.secondLoanScenario.id )
        }else{
          ARMMortgageCreateFirst(this.state.secondLoanScenario);
        }


        // ARMMortgageCreateFirst(this.state.firstLoanScenario);
      }
      this.props.handleContinue();
    } else {
      NotificationManager.error("Please Validate Fields", "Error");
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
  componentDidMount() {
  }
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
          <h4>Select Loan Choices</h4>
  
          </MDBModalHeader>
          <hr />
          <MDBModalBody>
          <p>You have the option to model two loan scenarios. This allows you to<br></br>
            compare different loan Programs you may be evaluating.</p>
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
            <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.remainOnSamePage}>
              Continue
            </Button>
          ) : null}
           </MDBModalFooter>
        </MDBModal>
      </div>
    );

    return (
      <Fragment>
        {this.props.FrmMortgageFirstEditId !== undefined ? (
          <FirstLoanScenario
            downpayment={this.props.downpayment}
            handleFirstloanMortgageInfo={this.handleFirstloanMortgageInfo}
            Frm="true"
            armDisabled={true}
            FrmGetResponse={
              this.props.FRMMortgageGetResponseFirst
                ? this.props.FRMMortgageGetResponseFirst
                : null
            }
            {...this.props}
            {...this.state}
          />
        ) : this.props.ArmMortgageFirstEditId !== undefined ? (
          <FirstLoanScenario
            downpayment={this.props.downpayment}
            handleFirstloanMortgageInfo={this.handleFirstloanMortgageInfo}
            Arm="true"
            frmDisabled={true}
            ArmGetResponse={
              this.props.ARMMortgageGetResponseFirst
                ? this.props.ARMMortgageGetResponseFirst
                : null
            }
            {...this.props}
            {...this.state}
          />
        ) : this.props.FrmMortgageSecondEditId !== undefined ? (
          <SecondLoanScenario
            downpayment={this.props.downpayment}
            handleSecondloanMortgageInfo={this.handleSecondloanMortgageInfo}
            Frm="true"
            armDisabled={true}
            FrmGetResponse={
              this.props.FRMMortgageGetResponseSecond
                ? this.props.FRMMortgageGetResponseSecond
                : null
            }
            {...this.props}
            {...this.state}
          />
        ) : this.props.ArmMortgageSecondEditId !== undefined ? (
          <SecondLoanScenario
            downpayment={this.props.downpayment}
            handleSecondloanMortgageInfo={this.handleSecondloanMortgageInfo}
            Arm="true"
            frmDisabled={true}
            ArmGetResponse={
              this.props.ARMMortgageGetResponseSecond
                ? this.props.ARMMortgageGetResponseSecond
                : null
            }
            {...this.props}
            {...this.state}
          />
        ) : null}

        <MDBRow className="margin20 text-center">
          <MDBCol md="12">
            <Button
              variant="contained"
              color="primary"
              onClick={this.goToNextPage}
              className="button-inner-class"
              size="large"
            >
              Update
            </Button>
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FRMMortgageUpdateResponseFirst: state.FRMMortgageUpdateResponseFirst,
    ARMMortgageUpdateResponseFirst: state.ARMMortgageUpdateResponseFirst,
    FRMMortgageUpdateResponseSecond: state.FRMMortgageUpdateResponseSecond,
    ARMMortgageUpdateResponseSecond: state.ARMMortgageUpdateResponseSecond,
    FRMMortgageGetResponseFirst: state.FRMMortgageGetResponseFirst,
    ARMMortgageGetResponseFirst: state.ARMMortgageGetResponseFirst,
    FRMMortgageGetResponseSecond: state.FRMMortgageGetResponseSecond,
    ARMMortgageGetResponseSecond: state.ARMMortgageGetResponseSecond,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FRMMortgageUpdateFirst: (data,id) => dispatch(frm_mortgage_update_first(data,id)),
    ARMMortgageUpdateFirst: (data,id) => dispatch(arm_mortgage_update_first(data,id)),
    FRMMortgageUpdateSecond: (data,id) =>
      dispatch(frm_mortgage_update_second(data,id)),
    ARMMortgageUpdateSecond: (data,id) =>
      dispatch(arm_mortgage_update_second(data,id)),
    FRMMortgageGetFirst: (id) => dispatch(frm_mortgage_get_first(id)),
    ARMMortgageGetFirst: (id) => dispatch(arm_mortgage_get_first(id)),
    FRMMortgageGetSecond: (id) => dispatch(frm_mortgage_get_second(id)),
    ARMMortgageGetSecond: (id) => dispatch(arm_mortgage_get_second(id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PropertyMortgageHOC)
);
