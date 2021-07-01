import React, { Component, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Axios from "axios";

import GetStartedHouseInfo from "../PropertyFormWizard/houseInfo";
import PersonalFinance from "../PropertyFormWizard/personalFinance";
import RentvsBuy from "../PropertyFormWizard/rentvsBuy";
import Summary from "../PropertyFormWizard/summary";
import { log_out } from "../redux/actions/signinSignup.js";
import { logout } from "../../routes/utils";
import { Redirect, withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
import "../../css/signup-signin.css";
import PropertyMortgageHOC from "./propertyMortgageHoc";
import TaxHoc from "./taxHoc";
import Tax1 from "./tax1";
import Tax2 from "./tax2";
import {
  personal_finance_create,
  personal_finance_update,
  detail_expense_create,
  update_detail_expense,
} from "../redux/actions/PropertyReport/personalFinance";
import { rent_vs_buy_create, rent_vs_buy_update } from "../redux/actions/PropertyReport/rentvsBuy";
import {
  property_info_create,
  property_info_update,
  survey_create,
} from "../redux/actions/PropertyReport/propertyInfo";

import { connect } from "react-redux";

import FirstLoanScenario from "./firstLoanScenario";
import SecondLoanScenario from "./secondLoanScenario";
import { NotificationManager } from "react-notifications";
import { savePropertyId } from "../../../src/routes/utils";
import { config } from '../config/default';

const { baseURL } = config;

export class StepperComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: "",
      saveButtonforPersonalFinance: false,
      propertyInfo: {},
      personalFinance: {
        property_obj: "",
      },
      personalFinanceUpdate: {
        property_obj: "",
        id: "",
      },
      RentvsBuy: {},
      isRentvsBuyFilled: false,
      isTaxFilled: false,
      Taxes: {},
      personalFinanceValidationErros: 0,
      houseInofValidationErrors: 0,
      rentvsBuyValidationErrors: 0,
      isselectloanScenarionModalOpen: true,
      selectLoanScenarioOption: "",

      isOpen: false,
      modal: false,
      logout: false,
      backButton: false,
      previousForFirstPage: false,
      radioValue: "",
      downpayment: "",
      goToSurvey: false,
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
    this.cleanPreviousPropertyDetail()
  }

  cleanPreviousPropertyDetail() {
    if (localStorage.getItem('addressData')) localStorage.removeItem('addressData')
    if (localStorage.getItem('GetSinglePropertyResponse')) localStorage.removeItem('GetSinglePropertyResponse')
    if (localStorage.getItem('calculatorResponse')) localStorage.removeItem('calculatorResponse')

  }
  UNSAFE_componentWillMount() {
    if (this.props.location.returnBackFromreviewEdit === true) {
      this.setState({
        activeStep: 5,
      });
    }
  }
  goToSurvey = () => {
    this.setState({
      goToSurvey: !this.state.goToSurvey,
    });
  };
  componentDidMount() { }
  goToTaxfromRentvsBuyModal = async () => {
    await this.setState({
      activeStep: 4,
    });
  };
  onSuccessHouseInfo = async (data) => {
    savePropertyId(data.id);
    if (
      localStorage.getItem("property_id") &&
      localStorage.getItem("basic-info")
    ) {
      // const property = { property_obj: localStorage.getItem("property_id") };
      // const basicInfo = JSON.parse(localStorage.getItem("basic-info"));
      // const SurveyData = { ...property, ...basicInfo };
      // this.props.SurveyCreate(SurveyData);
    }
  };
  onFailureHouseInfo = () => {
    // NotificationManager.error("Invalid Credentials", "error");
  };
  getTaxFilledStataus = (getTaxFillStatus) => {
    this.setState({
      isTaxFilled: getTaxFillStatus,
    });
  };
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
  handlePreviousForFirstpage = () => {
    this.setState({
      previousForFirstPage: !this.state.previousForFirstPage,
    });
  };
  handleHouseInfo = async (downpayment, data) => {
    await this.setState((prevState) => {
      let propertyInfo = Object.assign({}, prevState.propertyInfo);
      propertyInfo = data;

      return { propertyInfo };
    });
    this.setState({
      downpayment: downpayment,
    });
    await this.setState({
      is_rent_vs_buy_selected: this.state.propertyInfo.is_rent_vs_buy_selected,
      is_tax_selected: this.state.propertyInfo.is_tax_selected
    })
  };
  handleSaveforPersonalFinance = () => {
    const { PersonalFinanceUpdate, PersonalFinanceCreate } = this.props;
    if (Object.entries(JSON.parse(localStorage.getItem("personal_finance_array"))).length !== 0) {
      if (
        JSON.parse(localStorage.getItem("personal_finance_array")).federal_income &&
        JSON.parse(localStorage.getItem("personal_finance_array")).fico_score_range &&
        JSON.parse(localStorage.getItem("personal_finance_array")).filling_status &&
        !isNaN(JSON.parse(localStorage.getItem("personal_finance_array")).marginal_tax_rate) &&
        JSON.parse(localStorage.getItem("personal_finance_array")).monthly_debt_payments &&
        JSON.parse(localStorage.getItem("personal_finance_array")).monthly_non_housing_expenses
      ) {
        if (
          this.state.personalFinanceUpdate.monthlydebtPaymentValidationError ||
          this.state.personalFinanceUpdate.monthlynonhousingExpensesValidationError ||
          this.state.personalFinanceUpdate.marginal_tax_rate_ValidationError

        ) {
          return NotificationManager.error('Error', 'Please correct your input', 3000)
        }
        else {
          this.setState({
            saveButtonforPersonalFinance: !this.state.saveButtonforPersonalFinance,
          });


          JSON.parse(localStorage.getItem("personal_finance_array")) && JSON.parse(localStorage.getItem("personal_finance_array")).id

            ? PersonalFinanceUpdate(JSON.parse(localStorage.getItem("personal_finance_array")))
            : PersonalFinanceCreate(JSON.parse(localStorage.getItem("personal_finance_array")));

          if (
            Object.entries(JSON.parse(localStorage.getItem("personal_finance_array")))
              .length !== 0
          ) {
            this.handleNext();
          }
        }
      } else {
        return NotificationManager.error('Error', 'Please correct your input', 3000)
      }

    } else {
      return NotificationManager.error('Error', 'Please correct your input', 3000)
    }


  };
  saveDetailExpenses = (data) => {
    const { DetailExpenseCreate } = this.props;
    DetailExpenseCreate(data);
  };
  updateDetailExpenses = (data) => {
    const { DetailExpenseUpdate } = this.props;
    DetailExpenseUpdate(data);
  };
  handlePersonalFinance = (data) => {
    console.log(data)
    const propertyId = JSON.parse(localStorage.getItem("property_id"));
    if (propertyId) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then(async (propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0];
          //  await this.setState({
          //     propertyId: propertyDetail.id,
          //     loading: false
          //   });

          Object.entries(JSON.parse(localStorage.getItem("personal_finance_array")))
            .length !== 0
            ? this.setState((prevState) => {
              let personalFinanceUpdate = Object.assign(
                {},
                prevState.personalFinanceUpdate
              );
              personalFinanceUpdate = data;
              personalFinanceUpdate.property_obj = propertyDetail.id
              personalFinanceUpdate.id = propertyDetail.personal_finances.id
              localStorage.setItem("personal_finance_array", JSON.stringify(personalFinanceUpdate));
              return { personalFinanceUpdate };
            })
            : this.setState((prevState) => {
              let personalFinance = Object.assign({}, prevState.personalFinance);
              personalFinance = data;
              personalFinance.property_obj = propertyDetail.id;
              let personalFinanceUpdate = Object.assign(
                {},
                prevState.personalFinanceUpdate
              );
              personalFinanceUpdate = data;
              personalFinanceUpdate.property_obj = propertyDetail.id;
              localStorage.setItem("personal_finance_array", JSON.stringify(personalFinanceUpdate));
              return { personalFinance, personalFinanceUpdate };
            });

        })
        .catch((err) => { });
    }

  };
  handleRentvsBuyData(data) {
    this.setState((prevState) => {
      let RentvsBuy = Object.assign({}, prevState.RentvsBuy);
      RentvsBuy = data;
      return { RentvsBuy };
    });
  }
  taxRadioValue = async (data) => {
    await this.setState({
      is_tax_selected: data
    })
  }
  getRentvsBuyFilledStatus = async (status) => {
    await this.setState({
      isRentvsBuyFilled: status,
    });
  };
  selectLoanScenario = (statusOfLoanScenario) => {
    this.setState({
      selectLoanScenarioOption: statusOfLoanScenario,
    });
  };
  getPersonalFinanceValidationError = (error) => {
    this.setState({
      personalFinanceValidationErros: error,
    });
  };
  getHouseInfoValidationError = (error) => {
    this.setState({
      houseInofValidationErrors: error,
    });
  };
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
        return (
          <GetStartedHouseInfo
            handleHouseInfo={this.handleHouseInfo}
            getValidationError={this.getHouseInfoValidationError}
          />
        );
      case 1:
        return (
          <PersonalFinance
            getPersonalFinanceData={this.handlePersonalFinance}
            getValidationError={this.getPersonalFinanceValidationError}
            handleContinue={this.handleNext}
            saveButtonforPersonalFinance={
              this.state.saveButtonforPersonalFinance
            }
            saveDetailExpenses={this.saveDetailExpenses}
            updateDetailExpenses={this.updateDetailExpenses}
            personalFinanceApiResponse={
              this.props.PersonalFinanceCreateResponse
            }
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
            selectLoanScenario={this.selectLoanScenario}
          >
            <FirstLoanScenario />
            <SecondLoanScenario />
          </PropertyMortgageHOC>
        );
      case 3:
        return (
          <RentvsBuy
            getRentvsBuyData={this.handleRentvsBuyData}
            getRentvsBuyFilledStatus={this.getRentvsBuyFilledStatus}
            goToTaxfromRentvsBuyModal={this.goToTaxfromRentvsBuyModal}
            showStep={(step) => {
              this.handleStep(step);
            }}
            getValidationError={this.getRentvsBuyValidationError}
            is_rent_vs_buy_selected={this.state.is_rent_vs_buy_selected}
          />
        );
      case 4:
        return (
          <TaxHoc
            handleContinue={this.handleNext}
            getTaxFilledStataus={(getTaxFillStatus) =>
              this.getTaxFilledStataus(getTaxFillStatus)
            }
            showStep={(step) => {
              this.handleStep(step);
            }}
            is_tax_selected={this.state.is_tax_selected}
            taxRadioValue={this.taxRadioValue}
          >
            <Tax1 />
            <Tax2 />
          </TaxHoc>
        );
      case 5:
        return (
          <Summary
            isRentvsBuyFilled={this.state.isRentvsBuyFilled}
            isTaxFilled={this.state.isTaxFilled}
            PropertyInfoCreateResponse={this.props.PropertyInfoCreateResponse}
            RentvsBuyCreateResponse={this.props.RentvsBuyCreateResponse}
          />
        );
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

  async handleNext() {

    const {
      // PersonalFinanceUpdate,
      RentvsBuyCreate,
      RentvsBuyUpdate,
      PropertyInfoCreate,
      PropertyInfoUpdate,
      // SurveyCreate,
      // PersonalFinanceCreate,
    } = this.props;
    const newActiveStep =
      this.isLastStep && !this.allStepsCompleted
        ? this.steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1;

    if (this.state.activeStep === 0) {

      if (this.state.propertyInfo.homepriceGrowthValidationError ||
        this.state.propertyInfo.downpaymentnewValidationError ||
        this.state.propertyInfo.annualPropertytaxValidationError ||
        this.state.propertyInfo.homeownerInsuranceValidationError
      ) {
        return NotificationManager.error("Error", "Please correct your input", 3000);
      } else {
        // debugger
        if (!this.state.propertyInfo.property_price) {
          return NotificationManager.error('Please enter the price of the property', 3000)
        } 
       
        if (!this.state.propertyInfo.annual_property_tax) {
          return NotificationManager.error('Please enter the annual property tax', 3000)
        } 
        if(!this.state.propertyInfo.home_owner_insurance)
        {
          return NotificationManager.error('Please enter the annual home owner insurance', 3000)
        }
        if(!this.state.propertyInfo.house_address){
          return NotificationManager.error('Please enter your property address', 3000)
        }
        if(!this.state.propertyInfo.home_price_growth){
          return NotificationManager.error('Please enter the projected home price growth per year', 3000) 
        }
        if(!this.state.propertyInfo.stay_duration){
          return NotificationManager.error('Please enter the duration of your stay in this house', 3000)
        }
        if (!this.state.propertyInfo.downpayment_amount) {
          return NotificationManager.error('Please enter the downpayment amount', 3000)
        }
        {

          if (localStorage.getItem('addressData')) {

            const addressData = JSON.parse(localStorage.getItem('addressData'))
            if (!addressData.searchTouched && !this.state.propertyInfo.is_update) {
              return NotificationManager.error("Please input your property address", 3000);
            } else {
              this.setState({
                activeStep: newActiveStep,
              });
              this.state.propertyInfo["home_price_growth"] = String(parseInt(String(this.state.propertyInfo["home_price_growth_percentage"]).replace(/%/g, "")) / 100)
              await this.setState((prevState) => {
                let propertyInfo = Object.assign({}, prevState.propertyInfo);
                propertyInfo.house_address = addressData.house_address;
                propertyInfo.house_state = addressData.house_state;
                propertyInfo.house_zip_code = addressData.house_zip_code;
                return { propertyInfo }
              })
              let newaddressData = {
                house_address: this.state.propertyInfo.house_address,
                house_state: this.state.propertyInfo.house_state,
                house_zip_code: this.state.propertyInfo.house_zip_code,
                searchTouched: false
              };
              localStorage.setItem("addressData", JSON.stringify(newaddressData));

              if (this.state.propertyInfo.is_update) {
                this.state.propertyInfo["id"] = JSON.parse(
                  localStorage.getItem("property_id")
                );
                // localStorage.setItem('no_of_bathrooms', this.state.propertyInfo.no_of_bathrooms)
                // localStorage.setItem('no_of_bedrooms', this.state.propertyInfo.no_of_bedrooms)
                PropertyInfoUpdate(
                  this.state.propertyInfo,
                  this.onSuccessHouseInfo,
                  this.onFailureHouseInfo
                );
              } else {
                // localStorage.setItem('no_of_bathrooms', this.state.propertyInfo.no_of_bathrooms)
                // localStorage.setItem('no_of_bedrooms', this.state.propertyInfo.no_of_bedrooms)
                PropertyInfoCreate(
                  this.state.propertyInfo,
                  this.onSuccessHouseInfo,
                  this.onFailureHouseInfo
                );
              }

              if (this.props.location.surveyData) {
                this.props.location.surveyData.property_obj = localStorage.getItem(
                  "property_id"
                );
              }
            }

          }


        }
      }

    } else if (this.state.activeStep === 1) {
      if
       (this.state.personalFinanceUpdate &&
         !this.state.personalFinanceUpdate.federal_income &&
          !this.state.personalFinanceUpdate.marginal_tax_rate && 
          !this.state.personalFinanceUpdate.monthly_debt_payments && 
          !this.state.personalFinanceUpdate.monthly_non_housing_expenses && 
          !this.state.personalFinanceUpdate.fico_score_range && 
          !this.state.personalFinanceUpdate.filling_status) 
          {
        const personal_finance_data = JSON.parse(
          localStorage.getItem("personal_finance_array")
        );
        personal_finance_data.marginal_tax_rate = String(
          Number(personal_finance_data.marginal_tax_rate)
        );
        localStorage.setItem(
          "personal_finance_array",
          JSON.stringify(personal_finance_data)
        );
        this.setState({
          activeStep: newActiveStep,
        });
      } else if (this.state.personalFinanceUpdate && this.state.personalFinanceUpdate.federal_income && this.state.personalFinanceUpdate.marginal_tax_rate && this.state.personalFinanceUpdate.monthly_debt_payments && this.state.personalFinanceUpdate.monthly_non_housing_expenses && this.state.personalFinanceUpdate.fico_score_range && this.state.personalFinanceUpdate.filling_status) {
        const personal_finance_data = JSON.parse(
          localStorage.getItem("personal_finance_array")
        );
        personal_finance_data.marginal_tax_rate = String(
          Number(personal_finance_data.marginal_tax_rate)
        );
        localStorage.setItem(
          "personal_finance_array",
          JSON.stringify(personal_finance_data)
        );
        this.setState({
          activeStep: newActiveStep,
        });

      } else {
        return NotificationManager.error('Please correct your inputy', 'Please fill required fields', 3000)
      }


    } else if (this.state.activeStep === 2) {
      this.setState({
        activeStep: newActiveStep,
      });
    } else if (this.state.activeStep === 3) {
      // console.log(this.state.RentvsBuy, 'rentvsbuy index')
      if (this.state.RentvsBuy.current_monthly_rent_payment && this.state.RentvsBuy.annual_rent_insurance && this.state.RentvsBuy.rate_of_investment && this.state.RentvsBuy.rentinflation) {
        this.setState({
          activeStep: newActiveStep,
        });
        this.state.RentvsBuy["rate_of_investment"] = String(
          parseFloat(
            String(this.state.RentvsBuy["rate_of_investment_percentage"]).replace(
              /,/g,
              ""
            )
          ) / 100
        );
        this.state.RentvsBuy["rentinflation"] = String(
          parseFloat(
            String(this.state.RentvsBuy["rentinflation_percentage"]).replace(
              /,/g,
              ""
            )
          ) / 100
        );
        if (this.state.RentvsBuy.is_update && this.state.RentvsBuy.id) {
          RentvsBuyUpdate(this.state.RentvsBuy)
        } else {
          RentvsBuyCreate(this.state.RentvsBuy);
          const data = {
            is_rent_vs_buy_selected: this.state.RentvsBuy.is_rent_vs_buy_selected,
            id: JSON.parse(localStorage.getItem("property_id"))
          }
          PropertyInfoUpdate(data)
        }
      } else {
        return NotificationManager.error('Please correct your input', 'Please fill required fields', 3000)
      }
    } else if (this.state.activeStep === 4) {
      this.setState({
        activeStep: newActiveStep,
      });
      const data = {
        is_tax_selected: this.state.is_tax_selected,
        id: JSON.parse(localStorage.getItem("property_id"))
      }
      PropertyInfoUpdate(data)
    } else if (this.state.activeStep === 5) {
      this.setState({
        activeStep: newActiveStep,
      });
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
    if (this.state.previousForFirstPage) {
      return <Redirect to="/select-modules" />;
    }
    if (this.state.goToSurvey) {
      return <Redirect to="/survey" />;
    }
    return (
      <Fragment>
        <MDBRow className="header-row">
          <MDBCol md="4"></MDBCol>
          <MDBCol md="4" size="11">
            <div className="text-center">
              <br />
              <span className="header-label">
                {activeStep === 0 ? (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/13.png")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Property Information
                  </span>
                ) : activeStep === 1 ? (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/34.png")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Personal Finance
                  </span>
                ) : activeStep === 2 ? (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/45.png")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Mortgage Programs
                  </span>
                ) : activeStep === 3 ? (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/56.png")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Rent vs Buy
                  </span>
                ) : activeStep === 4 ? (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/85.png")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Taxes
                  </span>
                ) : (
                  <span>
                    <img
                      className="img-header"
                      src={require("../../assets/logo/report.svg")}
                      alt="finmagix"
                    // height={"60px"}
                    />
                    Summary
                  </span>
                )}
              </span>
              <br />
              <Stepper
                className="stepper-class"
                activeStep={this.state.activeStep}
              >
                {this.steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}
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
              {Object.entries(
                JSON.parse(localStorage.getItem("personal_finance_array"))
              ).length !== 0 ? (
                <div className="row">
                  <span className="modal-text" onClick={this.goToSurvey}>
                    Survey
                  </span>
                </div>
              ) : null}
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
            {activeStep === 0 ? (
              <Button
                className="back-arrow"
                size="large"
                onClick={this.handlePreviousForFirstpage}
              >

                <ArrowBackIosIcon />

              </Button>
            ) : (
              <Button
                className="back-arrow"
                size="large"
                onClick={this.handleBack}
              >
                {`<`}&nbsp;
                {activeStep === 1
                  ? "Property Information"
                  : activeStep === 2
                    ? "Personal Finance"
                    : activeStep === 3
                      ? "Mortgage Programs"
                      : activeStep === 4
                        ? "rent vs buy"
                        : "Back"}
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
                  ) : activeStep === 1 &&
                    JSON.parse(
                      localStorage.getItem("personal_finance_array")
                    ) &&
                    Object.entries(
                      JSON.parse(localStorage.getItem("personal_finance_array"))
                    ).length === 0 ? (
                    this.state.saveButtonforPersonalFinance === false ? (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className="button-inner-class"
                          onClick={this.handleSaveforPersonalFinance}
                        >
                          {" "}
                          Save
                        </Button>
                        <br />
                        <br />
                        <br />
                      </div>
                    ) : null
                  ) : activeStep === 1 &&
                    JSON.parse(
                      localStorage.getItem("personal_finance_array")
                    ) &&
                    Object.entries(
                      JSON.parse(localStorage.getItem("personal_finance_array"))
                    ).length !== 0 ? (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="button-inner-class"
                        onClick={this.handleSaveforPersonalFinance}
                      >
                        {" "}
                        Update
                      </Button>
                      <br />
                      <br />
                      <br />
                    </div>
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
    PersonalFinanceCreateResponse: state.PersonalFinanceCreateResponse,
    RentvsBuyCreateResponse: state.RentvsBuyCreateResponse,
    RentvsBuyUpdateResponse: state.RentvsBuyUpdateResponse,
    PropertyInfoCreateResponse: state.PropertyInfoCreateResponse,
    PropertyInfoUpdateResponse: state.PropertyInfoUpdateResponse,
    PerosnalFinanceUpdateResponse: state.PersonalFinanceUpdateResponse,
    DetailExpenseCreateResponse: state.DetailExpenseCreateResponse,
    DetailExpenseUpdateResponse: state.DetailExpenseUpdateResponse,
    SurveyCreateResponse: state.SurveyCreateResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PersonalFinanceCreate: (data) => dispatch(personal_finance_create(data)),
    RentvsBuyCreate: (data) => dispatch(rent_vs_buy_create(data)),
    RentvsBuyUpdate: (data) => dispatch(rent_vs_buy_update(data)),
    PropertyInfoCreate: (data, onSuccessHouseInfo, onFailureHouseInfo) =>
      dispatch(
        property_info_create(data, onSuccessHouseInfo, onFailureHouseInfo)
      ),

    PropertyInfoUpdate: (data, onSuccessHouseInfo, onFailureHouseInfo) =>
      dispatch(
        property_info_update(data, onSuccessHouseInfo, onFailureHouseInfo)
      ),
    PersonalFinanceUpdate: (data) => dispatch(personal_finance_update(data)),
    DetailExpenseCreate: (data) => dispatch(detail_expense_create(data)),
    DetailExpenseUpdate: (data) => dispatch(update_detail_expense(data)),
    SurveyCreate: (data) => dispatch(survey_create(data)),
    LogOut: () => dispatch(log_out()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StepperComponent)
);
