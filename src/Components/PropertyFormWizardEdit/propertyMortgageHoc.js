import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  frm_mortgage_update_first,
  arm_mortgage_update_first,
  frm_mortgage_get_first,
  arm_mortgage_get_first,
  frm_mortgage_update_second,
  arm_mortgage_update_second,
  frm_mortgage_get_second,
  arm_mortgage_get_second,
} from "../redux/actions/PropertyReport/propertyMortgage";
import { Radio } from "antd";
import { Button } from "@material-ui/core";
import SecondLoanScenario from "./secondLoanScenario";
import FirstLoanScenario from "./firstLoanScenario";

export class PropertyMortgageHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false,
      openModal: true,
      radioValue: false,
      firstLoanScenario: {},
      secondLoanScenario: {},
    };
  }
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
    this.setState({ onClick: !this.state.onClick });
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

  };
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = async (e) => {
    await this.setState({
      radioValue: !this.state.radioValue,
      openModal: !this.state.openModal,
    });
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
