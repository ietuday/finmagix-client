import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import RangeSlider from "../../common/RangeSilder";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import "react-rangeslider/lib/index.css";
import PersonaLFinanceValidator from "../validatorRules/PersonalFinanceValidatorRules";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import DetailedExpenseModal from "../../common/detailedExpense";
import { connect } from "react-redux";
import { get_personal_finance_data,update_detail_expense } from "../redux/actions/PropertyReport/personalFinance";
import quss from "../../assets/images/que.png";

export class PersonalFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fico_score_range : props.PersonalFinanaceGetResponse.fico_score_range,
      marginal_tax_rate: props.PersonalFinanaceGetResponse.marginal_tax_rate,
      annual_gross_income: props.PersonalFinanaceGetResponse.annual_gross_income,
      monthly_debt_payments: props.PersonalFinanaceGetResponse.monthly_debt_payments,
      monthly_non_housing_expenses: props.PersonalFinanaceGetResponse.monthly_non_housing_expenses,
      filling_status: props.PersonalFinanaceGetResponse.filling_status,
      detail_non_housing_expenses :{},
      openModal: false,
      showModal: false,
      federal_income:   props.PersonalFinanaceGetResponse.federal_income,
      total_non_housing:  props.PersonalFinanaceGetResponse.total_non_housing,
    };
    this.validators = PersonaLFinanceValidator;
    resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
  }
  handleRangeData = (data) => {
    this.setState({
      fico_score_range : data,
    });
    this.props.getPersonalFinanceData(this.state);
  };
  calculateNonHousingExpense = async(data) =>{
    await this.setState((prevState) => {
      let detail_non_housing_expenses = Object.assign({}, prevState.detail_non_housing_expenses);
      detail_non_housing_expenses = data;
      detail_non_housing_expenses.id = this.props.PersonalFinanaceGetResponse.detail_non_housing_expenses.id
      return { detail_non_housing_expenses };
    });
    this.props.updateDetailExpense(this.state.detail_non_housing_expenses)
  }
  componentDidMount(){
    this.props.PersonalFinanceGet(this.props.getId);
  }
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });
    this.setState({
      fico_score_range : this.state.fico_score_range
    })
    updateValidators(this.validators, event.target.name , event.target.value);
    const validationErrorLength = this.validators[event.target.name].errors.length;
    this.props.getPersonalFinanceData(this.state,this.props.PersonalFinanaceGetResponse.id);
    this.props.getValidationError(validationErrorLength);
  }
  toggle = () => {
    this.setState({
      openModal: !this.state.openModal,
      showModal: !this.state.showModal,
    });
  };
  // setCurrency = (num) => {
  //   var num_parts = num.toString().split(".");
  //   num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return num_parts.join(".");
  // };
  componentWillMount() {
    const{PersonalFinanceGet} = this.props;
    PersonalFinanceGet();
  }
  render() {
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Select your FICO score range
            </span>
            <br />
            <RangeSlider apiRangeData={this.props.PersonalFinanaceGetResponse} getRangeData={this.handleRangeData} />
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
              type="text"
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
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Monthly debt payments are all your NON-HOUSING 
            debt payments such as credit cards, car loans etc. </span>
            </div>
            <br />

            <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_debt_payments"
              value={this.state.monthly_debt_payments}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "monthly_debt_payments")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Monthly non-housing expenses
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">
            These are all of the non-housing expenses except Taxes such as Food,
             Utilities, Entertainment etc. This input is used to calculate your 
             'post home purchase' spend profile
            </span>
            </div>
            <br />
            <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="monthly_non_housing_expenses"
              value={this.state.monthly_non_housing_expenses}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Marginal tax rate</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Note that we have to build a check here that the
             interest only period cannot be equal to the loan term or greater 
             than the loan term. </span>
            </div>
            <br />
            <Input
              type="number"
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="marginal_tax_rate"
              value={this.state.marginal_tax_rate}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
          Federal Income
          </span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="federal_income"
            value={this.state.federal_income}
            onChange={this.handleChange}
          />
        </MDBCol>
        {displayValidationErrors(this.validators, "federal_income")}
      </MDBRow>


      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
          Total Nonhousing
          </span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="total_non_housing"
            value={this.state.total_non_housing}
            onChange={this.handleChange}
          />
        </MDBCol>
        {displayValidationErrors(this.validators, "total_non_housing")}
      </MDBRow>

        {displayValidationErrors(
          this.validators,
          "monthly_non_housing_expenses"
        )}

        {
         this.props.PersonalFinanaceGetResponse && Object.entries(this.props.PersonalFinanaceGetResponse.detail_non_housing_expenses).length !== 0 ?
        <MDBRow className="margin20">
          <MDBCol md="8"></MDBCol>
          <MDBCol md="4">
            <span className="link" onClick={this.toggle}>
              Enter Detailed Expenses {`>`}
            </span>
          </MDBCol>
        </MDBRow>
         : null }  
        {this.state.showModal ? (
          <DetailedExpenseModal
            toggle={this.toggle}
            openModal={this.state.openModal}
            apiResponse = {this.props.PersonalFinanaceGetResponse.detail_non_housing_expenses}
            calculateNonHousingExpense={this.calculateNonHousingExpense}
          />
        ) : null}
        
        <br />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PersonalFinanaceGetResponse : state.getPersonalFinanceData,
    UpdateDetailExpenseResponse : state.UpdateDetailExpenseResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PersonalFinanceGet: (data) => dispatch(get_personal_finance_data(data)),
    updateDetailExpense:(data) => dispatch(update_detail_expense(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalFinance);
