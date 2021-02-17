import React, { Component, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import { Radio, Input } from "antd";
import GetStartedHouseInfo from "../PropertyFormWizardEdit/houseInfo";
import PersonalFinance from "../PropertyFormWizardEdit/personalFinance";
import RentvsBuy from "../PropertyFormWizardEdit/rentvsBuy";
import Summary from "../PropertyFormWizardEdit/summary";
import { log_out } from "../redux/actions/signinSignup.js";
import { logout } from "../../routes/utils";
import { Redirect,withRouter } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
} from "mdbreact";
import "../../css/propertyFormWizard.css";
import PropertyMortgageHOC from "./propertyMortgageHoc";
import TaxHoc from "./taxHoc";
import Tax1 from "./tax1";
import Tax2 from "./tax2";
import { personal_finance_update } from "../redux/actions/PropertyReport/personalFinance";
import { rent_vs_buy_update } from "../redux/actions/PropertyReport/rentvsBuy";
import { property_info_update } from "../redux/actions/PropertyReport/propertyInfo";
import { isFormValid } from "../../common/ValidatorFunction";
import { connect } from "react-redux";
import Header from "../../common/header";
import FirstLoanScenario from "./firstLoanScenario";
import SecondLoanScenario from "./secondLoanScenario";
import { NotificationManager } from "react-notifications";

export class StepperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: "",
      propertyInfo: {id:""},
      personalFinance: {id:""},
      RentvsBuy: {id:""},
      Taxes: {},
      personalFinanceValidationErros: 0,
      rentvsBuyValidationErrors: 0,
      houseInfoValidationErrors : 0,
      isselectloanScenarionModalOpen: true,
      isOpen: false,
      modal: false,
      logout: false,
      backButton: false,
      radioValue: "",
      downpayment: "",
    };
    this.handleRentvsBuyData = this.handleRentvsBuyData.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.showTaxData = this.showTaxData.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.steps = [
      "Property Information",
      "Personal Finance",
      "MortgagePrograms",
      "RentvsBuy",
      "Taxes",
      "Summary",
    ];
  }
  componentDidMount(){
  }
  componentWillMount(){
    if(this.props.location.state.property_id === 0){
      this.setState({
        activeStep :0
      })
    }else if(this.props.location.state.property_id === 1){
      this.setState({
        activeStep :1
      })
    }else if(this.props.location.state.property_id === 2){
      this.setState({
        activeStep :2
      })
    }else if(this.props.location.state.property_id === 3){
      this.setState({
        activeStep :3
      })
    }else if(this.props.location.state.property_id === 4){
      this.setState({
        activeStep :4
      })
    }
  }
  totalSteps = () => {
    return this.steps.length;
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  selectLoanScenarioToggle = () => {
    this.setState({
      isselectloanScenarionModalOpen: !this.state
        .isselectloanScenarionModalOpen,
    });
  };
  goToLogOut = () => {
    const { LogOut } = this.props;
    localStorage.clear();
    LogOut();
    logout();
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  handleHouseInfo = async (downpayment, data,id) => {
    await this.setState((prevState) => {
      let propertyInfo = Object.assign({}, prevState.propertyInfo);
      propertyInfo = data;
      propertyInfo.id = id;
      return { propertyInfo };
    });
    this.setState({
      downpayment: downpayment,
    });
  };
  handlePersonalFinance = (data,id) => {
    this.setState((prevState) => {
      let personalFinance = Object.assign({}, prevState.personalFinance);
      personalFinance = data;
      personalFinance.id = JSON.parse(localStorage.getItem("personal_finance_array")).id;
      return { personalFinance };
    });
  };
  async handleRentvsBuyData(data) {
    await this.setState((prevState) => {
      let RentvsBuy = Object.assign({}, prevState.RentvsBuy);
      RentvsBuy = data;
      RentvsBuy.id = this.props.location.state.rent_vs_buy_edit_id;
      return { RentvsBuy };
    });
  }
  getPersonalFinanceValidationError = (error) => {
    this.setState({
      personalFinanceValidationErros: error,
    });
  };
  getHouseInfoValidationError = (error) =>{
    this.setState({
      houseInfoValidationErrors : error,
    });
  }
  getRentvsBuyValidationError = (error) => {
    this.setState({
      rentvsBuyValidationErrors: error,
    });
  };
  async showTaxData(data) {
    await this.setState((prevState) => {
      let Taxes = Object.assign({}, prevState.Taxes);
      Taxes = data;

      return { Taxes };
    });
  }
  async onRadioChange() {
    await this.setState({
      radioValue: !this.state.radioValue,
    });
  }
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GetStartedHouseInfo getValidationError = {this.getHouseInfoValidationError}
         getId={this.props.location.state.property_info_edit_id} handleHouseInfo={this.handleHouseInfo} />;
      case 1:
        return (
          <PersonalFinance
            getPersonalFinanceData={this.handlePersonalFinance}
            getValidationError={this.getPersonalFinanceValidationError}
            getId={this.props.location.state.personal_finance_edit_id}
          />
        );
      case 2:
        return (
          <PropertyMortgageHOC
            handleContinue={this.handleNext}
            showStep={(step) => {
            this.handleStep(step);
            }}
            downpayment={this.state.downpayment}
            FrmMortgageFirstEditId = {this.props.location.state.frm_first_edit_id}
            ArmMortgageFirstEditId = {this.props.location.state.arm_first_edit_id}
            FrmMortgageSecondEditId = {this.props.location.state.frm_second_edit_id}
            ArmMortgageSecondEditId = {this.props.location.state.arm_second_edit_id}
            
          >
            <FirstLoanScenario />
            <SecondLoanScenario />
          </PropertyMortgageHOC>
        );
      case 3:
        return (
          <RentvsBuy
            getRentvsBuyData={this.handleRentvsBuyData}
            showNext={this.handleNext}
            showStep={(step) => {
            this.handleStep(step);
            }}
            getId={this.props.location.state.rent_vs_buy_edit_id}
            isRentvsBuyFilled = {true}
            getValidationError={this.getRentvsBuyValidationError}
          />
        );
      case 4:
        return (
          <TaxHoc handleContinue={this.handleNext}  getId={this.props.location.state.tax_edit_id} isTaxFilled = {true}>
            <Tax1 />
            <Tax2 />
          </TaxHoc>
        );
      case 5:
        return <Summary />;
      default:
        return (
          <PersonalFinance
            getPersonalFinanceData={this.handlePersonalFinance}
            getValidationError={this.getPersonalFinanceValidationError}
          />
        );
    }
  };

  completedSteps = () => {
    this.setState({
      completed: Object.keys(this.state.completed).length,
    });
    return this.state.completed;
  };

  isLastStep = () => {
    this.setState({
      activeStep: this.totalSteps - 1,
    });
    return this.state.activeStep;
  };

  allStepsCompleted = () => {
    return this.completedSteps === this.totalSteps;
  };

  handleNext() {
    const {
      PersonalFinanceUpdate,
      RentvsBuyUpdate,
      PropertyInfoUpdate,
    } = this.props;
    const newActiveStep =
      this.isLastStep && !this.allStepsCompleted
        ? this.steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1;

    if (this.state.activeStep === 0) {
      
    if(this.state.houseInfoValidationErrors !== 0 &&
      !isFormValid("house_info")){
       this.setState({
         activeStep: this.state.activeStep,
       });
       NotificationManager.error("Please Validate Fields", "Error");
       }else{
        PropertyInfoUpdate(this.state.propertyInfo);
         this.props.history.push({pathname: '/property-form',
       returnBackFromreviewEdit : true})
       }
       

    } else if (this.state.activeStep === 1) {
      
      if(this.state.personalFinanceValidationErros !== 0 &&
       !isFormValid("personal_finance")){
        this.setState({
          activeStep: this.state.activeStep,
        });
        NotificationManager.error("Please Validate Fields", "Error");
        }else{
          this.props.history.push({pathname: '/property-form',
        returnBackFromreviewEdit : true})
        }
      PersonalFinanceUpdate(this.state.personalFinance);
    

    } else if (this.state.activeStep === 2) {
      this.props.history.push({pathname: '/property-form',
      returnBackFromreviewEdit : true})
    } else if (this.state.activeStep === 3) {

      if(this.state.rentvsBuyValidationErrors !== 0 &&
      !isFormValid("rent_vs_buy")){
        this.setState({
          activeStep: this.state.activeStep,
        });
        NotificationManager.error("Please Validate Fields", "Error");
        }else{
          this.state.RentvsBuy['rate_of_investment'] = String(
            Number(this.state.RentvsBuy["rate_of_investment"]) / 100
          );
          this.state.RentvsBuy['rentinflation'] = String(
            Number(this.state.RentvsBuy["rentinflation"]) / 100
          );
          RentvsBuyUpdate(this.state.RentvsBuy);
          this.props.history.push({pathname: '/property-form',
        returnBackFromreviewEdit : true})
        }



    } else if (this.state.activeStep === 4) {
      this.props.history.push({pathname: '/property-form',
      returnBackFromreviewEdit : true})
    } else if (this.state.activeStep === 5) {
      this.props.history.push({pathname: '/property-form',
      returnBackFromreviewEdit : true})
    }
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleStep = (step) => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const newCompleted = this.state.completed;
    newCompleted[this.state.activeStep] = true;
    this.setState({
      completed: newCompleted,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };
  render() {
    const { activeStep } = this.state;
    if (this.state.backButton) {
      return <Redirect to="/signin" />;
    }
    return (
      <Fragment>
        <MDBRow className="header-row">
          <MDBCol md="4"></MDBCol>
          <MDBCol md="4" size="11">
            <div className="text-center">
              <br />
              <span className="header-label">
                {activeStep === 0
                  ? "Property Information"
                  : activeStep === 1
                  ? "Personal Finance"
                  : activeStep === 2
                  ? "Mortgage Programs"
                  : activeStep === 3
                  ? "Rent vs Buy"
                  : activeStep === 4
                  ? "Taxes"
                  : "Summary"}
              </span>
              <br />
              <Stepper
                className="stepper-class"
                activeStep={this.state.activeStep}
              >
                {this.steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      completed={this.state.completed[index]}
                    ></StepButton>
                  </Step>
                ))}
              </Stepper>
            </div>
          </MDBCol>
          <MDBCol md="4" size="1">
            <MDBIcon
              className="header-icon"
              icon="user"
              size="large"
              onClick={this.toggle}
            />
          </MDBCol>
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            side
            position="top-right"
            backdrop={false}
            className="modal-side modal-top-right"
          >
            <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <span className="modal-text">Help</span>
              </div>
              <hr />
              <div className="row">
                <span className="modal-text" onClick={this.goToLogOut}>
                  Logout
                </span>
              </div>
            </MDBModalBody>
          </MDBModal>
        </MDBRow>
        <MDBContainer className="property-form-container">
          <div className="margin20">
            {activeStep === 5 ? (
              ""
            ) : activeStep === 0 ? (
              <Button
                className="back-arrow"
                size="large"
                onClick={() =>
                  this.props.history.push("/property-information-review-edit")
                }
              >
                Back
              </Button>
            ) : activeStep === 1 ? (
              <Button
                className="back-arrow"
                size="large"
                onClick={() =>
                  this.props.history.push("/personalfinance-review-edit")
                }
              >
                Back
              </Button>
            ) : activeStep === 2 ? (
              <Button
                className="back-arrow"
                size="large"
                onClick={() =>
                  this.props.history.push("/mortgage-programs-review-edit")
                }
              >
                Back
              </Button>
            ) : activeStep === 3 ? (
              <Button
                className="back-arrow"
                size="large"
                onClick={() =>
                  this.props.history.push("/rent-vs-buy-review-edit")
                }
              >
                Back
              </Button>
            ) : (
              <Button
                className="back-arrow"
                size="large"
                onClick={() => this.props.history.push("/taxes-review-edit")}
              >
                Back
              </Button>
            )}

            <br />
            {this.allStepsCompleted() ? (
              <div>
                All steps completed - you&apos;re finished
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                {this.getStepContent(activeStep)}
                <div className="text-center">
                  {activeStep === 2 || activeStep === 4 || activeStep === 5 ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className="button-inner-class"
                      onClick={this.handleNext}
                    >
                      {" "}
                      Continue
                    </Button>
                  )}
                </div>
                <br />
              </div>
            )}
          </div>
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PersonalFinanceUpdateResponse: state.PersonalFinanceUpdateResponse,
    RentvsBuyUpdateResponse: state.RentvsBuyUpdateResponse,
    PropertyInfoUpdateResponse: state.PropertyInfoUpdateResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PersonalFinanceUpdate: (data) => dispatch(personal_finance_update(data)),
    RentvsBuyUpdate: (data) => dispatch(rent_vs_buy_update(data)),
    PropertyInfoUpdate: (data) => dispatch(property_info_update(data)),
    LogOut: () => dispatch(log_out()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StepperComponent));
