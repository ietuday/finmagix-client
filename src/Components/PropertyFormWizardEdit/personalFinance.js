import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";

import RangeSlider from "../../common/RangeSilder";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import NumberFormat from "react-number-format";
import "react-rangeslider/lib/index.css";

import quss from "../../assets/images/que.png";

export class PersonalFinance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fico_score_range: props.PersonalFinanaceGetResponse.fico_score_range,
      marginal_tax_rate: props.PersonalFinanaceGetResponse.marginal_tax_rate,
      marginal_tax_rate_percentage: props.PersonalFinanaceGetResponse.marginal_tax_rate,
      annual_gross_income:
        props.PersonalFinanaceGetResponse.annual_gross_income,
      monthly_debt_payments:
        props.PersonalFinanaceGetResponse.monthly_debt_payments,
      monthly_non_housing_expenses:
        props.PersonalFinanaceGetResponse.monthly_non_housing_expenses,
      filling_status: props.PersonalFinanaceGetResponse.filling_status,
      detail_non_housing_expenses: {},
      openModal: false,
      showModal: false,
      federal_income: props.PersonalFinanaceGetResponse.federal_income,
      total_non_housing: props.PersonalFinanaceGetResponse.total_non_housing,
      monthlydebtPaymentValidationError:"",
      monthlynonhousingExpensesValidationError:"",
      marginal_tax_rate_ValidationError: ""
    };
    // this.validators = PersonaLFinanceValidator;
    // resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
  }
  handleRangeData = (data) => {
    this.setState({
      fico_score_range: data,
    });
    this.props.getPersonalFinanceData(this.state);
  };

  goToNextPage = () => {
    localStorage.setItem("personal_finance_array", JSON.stringify(this.state));

    this.props.handleContinue();
  };

  calculateNonHousingExpense = async (data) => {
    this.setState((prevState) => {
      let detail_non_housing_expenses = Object.assign(
        {},
        prevState.detail_non_housing_expenses
      );
      detail_non_housing_expenses = data;
      return { detail_non_housing_expenses };
    });
    JSON.parse(localStorage.getItem("personal_finance_array"))
      .detail_non_housing_expenses &&
    Object.entries(
      JSON.parse(localStorage.getItem("personal_finance_array"))
        .detail_non_housing_expenses
    ).length !== 0
      ? this.props.updateDetailExpenses(this.state.detail_non_housing_expenses)
      : this.props.saveDetailExpenses(this.state.detail_non_housing_expenses);
  };
  
  componentDidMount() {
    this.props.PersonalFinanceGet(this.props.getId);
  }
  async handleChange(event) {
    const { name } = event.target;
    event.persist();
    if(event.target.name == "monthly_debt_payments"){
      if(this.state.federal_income < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          monthlydebtPaymentValidationError: " Cannot exceed Adjusted Gross Income"
        }) 
      }else{
        this.setState({
          monthlydebtPaymentValidationError: ""
        }) 
      }
    }
    
    

    if(event.target.name == "monthly_non_housing_expenses"){
      if(this.state.federal_income < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          monthlynonhousingExpensesValidationError: " 'Cannot exceed Adjusted Gross Income"
        }) 
      }else{
        this.setState({
          monthlynonhousingExpensesValidationError: ""
        }) 
      }
    }
    
    if (event.target.name == "marginal_tax_rate_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, '')) > 37) {
        this.setState({
          marginal_tax_rate_ValidationError: "Cannot exceed 37%"
        })
      } else {
        this.setState({
          marginal_tax_rate_ValidationError: ""
        })
      }

    }
    
    await this.setState({
      [event.target.name]: event.target.value,
    });
    
    this.props.getPersonalFinanceData(this.state);
  }
  toggle = () => {
    this.setState({
      openModal: !this.state.openModal,
      showModal: !this.state.showModal,
    });
  };
  setCurrency = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };
  componentWillMount() {
    const { PersonalFinanceGet } = this.props;
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
            <RangeSlider
              apiRangeData={
                Object.entries(
                  JSON.parse(localStorage.getItem("personal_finance_array"))
                ).length !== 0
                  ? JSON.parse(localStorage.getItem("personal_finance_array"))
                  : ""
              }
              getRangeData={this.handleRangeData}
            />
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
      
     
      <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Adjusted Gross Income</span>
            <div className="tooltip-img">
            <img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            AGI calculation is equal to the total income you report that's subject to income tax—such as earnings from your job, self-employment, dividends and interest —minus specific deductions, or “adjustments” that you're eligible to take. This refers to line 11 from 1040 tax form.{" "}
            </span>
          </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="federal_income"
              value={this.state.federal_income}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="federal_income"
              value={this.state.federal_income}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  federal_income_number: formattedValue,
                });
                await this.setState({
                  federal_income: value,
                });
              }}
            />
          </MDBCol>
          {/* {displayValidationErrors(this.validators, "federal_income")} */}
        </MDBRow>

    <MDBRow className="margin20">
      <MDBCol md="12">
        <span className="get-started-label">Monthly debt payments</span>
        <div className="tooltip-img">
          <img src={quss} className="tool-img" alt="" />
          <span className="tooltip-img-text">
            Monthly debt payments are all your NON-HOUSING debt payments
            such as credit cards, car loans etc.{" "}
          </span>
        </div>
        <br />
        {/* <Input
          type="number"
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="monthly_debt_payments"
          value={this.state.monthly_debt_payments}
          onChange={this.handleChange}
        /> */}

        <NumberFormat
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="monthly_debt_payments"
          value={this.state.monthly_debt_payments}
          onChange={this.handleChange}
          thousandSeparator={true}
          onValueChange={async (values) => {
            const { formattedValue, value } = values;
            await this.setState({
              monthly_debt_payments_number: formattedValue,
            });
            await this.setState({
              monthly_debt_payments: value,
            });
          }}
        />
      {this.state.monthlydebtPaymentValidationError}
      </MDBCol>
     
    </MDBRow>
  

    <MDBRow className="margin20">
      <MDBCol md="12">
        <span className="get-started-label">
          Monthly non-housing expenses
        </span>
        <div className="tooltip-img">
          <img src={quss} className="tool-img" alt="" />
          <span className="tooltip-img-text">
            These are all of the non-housing expenses except Taxes such as
            Food, Utilities, Entertainment etc. This input is used to
            calculate your 'post home purchase' spend profile
          </span>
        </div>
        <br />
        {/* <Input
          type="number"
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="monthly_non_housing_expenses"
          value={this.state.monthly_non_housing_expenses}
          onChange={this.handleChange}
        /> */}

        <NumberFormat
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="monthly_non_housing_expenses"
          value={this.state.monthly_non_housing_expenses}
          onChange={this.handleChange}
          thousandSeparator={true}
          onValueChange={async (values) => {
            const { formattedValue, value } = values;
            await this.setState({
              monthly_non_housing_expenses_number: formattedValue,
            });
            await this.setState({
              monthly_non_housing_expenses: value,
            });
          }}
        />
      {this.state.monthlynonhousingExpensesValidationError}
      </MDBCol>
     
    </MDBRow>

    <MDBRow className="margin20">
      <MDBCol md="12">
        <span className="get-started-label">Marginal tax rate</span>
        <div className="tooltip-img">
          <img src={quss} className="tool-img" alt="" />
          <span className="tooltip-img-text">
            Note that we have to build a check here that the interest only
            period cannot be equal to the loan term or greater than the loan
            term.{" "}
          </span>
        </div>
        <br />
        {/* <Input
          type="number"
          className="input-class-mdb"
          placeholder="Enter amount here %"
          name="marginal_tax_rate_percentage"
          value={this.state.marginal_tax_rate_percentage}
          onChange={this.handleChange}
        /> */}

        <NumberFormat
          className="input-class-mdb"
          placeholder="Enter amount here %"
          name="marginal_tax_rate_percentage"
          value={this.state.marginal_tax_rate_percentage}
          onChange={this.handleChange}
          // thousandSeparator={true}
          suffix={"%"}
          onValueChange={async (values) => {
            const { formattedValue, value } = values;
            await this.setState({
              marginal_tax_rate: value,
            });
            await this.setState({
              marginal_tax_rate_percentage: formattedValue,
            });
          }}
        />
        {this.state.marginal_tax_rate_ValidationError}
      </MDBCol>
    </MDBRow>

        <br />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PersonalFinanaceGetResponse: state.getPersonalFinanceData,
    UpdateDetailExpenseResponse: state.UpdateDetailExpenseResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PersonalFinanceGet: (data) => dispatch(get_personal_finance_data(data)),
    updateDetailExpense: (data) => dispatch(update_detail_expense(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalFinance);
