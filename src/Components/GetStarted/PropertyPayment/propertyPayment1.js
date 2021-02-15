import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import RangeSlider from "../../../common/RangeSilder";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DetailedExpenseModal from "../../../common/detailedExpense";
import "react-rangeslider/lib/index.css";
import quss from "../../../assets/images/que.png";

export class PropertyPaymentInfo2 extends Component {
  constructor() {
    super();
    this.state = {
      annualGrossIncome: "",
      monthDebtPayment: "",
      annualHomeOwnerInsurance: "",
      monthNonHousingExpenses: "",
      mortgageTerm: 0,
      houseDuration: 3,
      ineterestOnlyFirstMortgage: "N",
      downPayment: "",
      Pmi: "",
      detailedExpense: 0,
      showPMI: false,
      openModal: false,
      showModal: false,
    };
    this.propertyMortgageInfo = "";
    this.showPMI = this.showPMI.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.downpaymentToggleButtonChange = this.downpaymentToggleButtonChange.bind(
      this
    );
    this.PmiToggleButtonChange = this.PmiToggleButtonChange.bind(this);
    this.mortgageTermChange = this.mortgageTermChange.bind(this);
    this.ineterestOnlyFirstMortgageChange = this.ineterestOnlyFirstMortgageChange.bind(
      this
    );
  }
  async handleChange(event, value) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  }
  calculateNonHousingExpense = (value) => {
    this.setState({
      detailedExpense: value,
    });
  };
  async downpaymentToggleButtonChange(event, value) {
    event.persist();
    await this.setState({
      downPayment: value,
    });
    if (value === "A") {
      await this.setState({
        showPMI: false,
        Pmi: "",
      });
    }
  }
  async PmiToggleButtonChange(event, value) {
    event.persist();
    await this.setState({
      Pmi: value,
    });
  }
  async mortgageTermChange(event, value) {
    event.persist();
    await this.setState({
      mortgageTerm: value,
    });
  }
  async ineterestOnlyFirstMortgageChange(event, value) {
    event.persist();
    await this.setState({
      ineterestOnlyFirstMortgage: value,
    });
  }
  toggle = () => {
    this.setState({
      openModal: !this.state.openModal,
      showModal: !this.state.showModal,
    });
  };
  componentDidMount() {
    this.propertyMortgageInfo = JSON.parse(
      localStorage.getItem("property-mortgage-info")
    );

    if (localStorage.getItem("property-mortgage-info")) {
      this.setState({
        annualGrossIncome: this.propertyMortgageInfo.annualGrossIncome,
        monthDebtPayment: this.propertyMortgageInfo.monthDebtPayment,
        houseDuration: Number(this.propertyMortgageInfo.houseDuration),
        annualHomeOwnerInsurance: this.propertyMortgageInfo
          .annualHomeOwnerInsurance,
        monthNonHousingExpenses: this.propertyMortgageInfo
          .monthNonHousingExpenses,
        mortgageTerm: this.propertyMortgageInfo.mortgageTerm,
        ineterestOnlyFirstMortgage: this.propertyMortgageInfo
          .ineterestOnlyFirstMortgage,
        downPayment: this.propertyMortgageInfo.downPayment,
        Pmi: this.propertyMortgageInfo.Pmi,
        detailedExpense: this.propertyMortgageInfo.detailedExpense,
      });
    } else {
      this.setState({
        annualGrossIncome: "",
        monthDebtPayment: "",
        annualHomeOwnerInsurance: "",
        monthNonHousingExpenses: "",
        houseDuration: 3,
        mortgageTerm: 0,
        ineterestOnlyFirstMortgage: "N",
        downPayment: "",
        Pmi: "",
        detailedExpense: 0,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("property-mortgage-info", JSON.stringify(nextState));
  }
  showPMI(type) {
    this.setState({
      showPMI: true,
    });
  }
  render() {
    const showPMIButton = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
            Do you want to pay Private Mortgage Insurance(PMI)?
          </span>
          <br />
          <ToggleButtonGroup
          className="css-box"
            name="Pmi"
            value={this.state.Pmi}
            exclusive
            onChange={this.PmiToggleButtonChange}
            aria-label="text alignment"
            size="large"
          >
            <ToggleButton value={"Y"}>Yes</ToggleButton>
            <ToggleButton value={"N"}>No</ToggleButton>
          </ToggleButtonGroup>
        </MDBCol>
      </MDBRow>
    );

    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              How long do you intend to stay in this house?
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Enter the number of years you intend to stay in this house,
 or the number of years after which you intend to refinance the mortgage on this house. </span>
</div>
            <br />
            <Select
              name="houseDuration"
              value={this.state.houseDuration}
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={3}>3 Years</MenuItem>
              <MenuItem value={6}>6 Years</MenuItem>
              <MenuItem value={9}>9 Years</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>
        {/* <MDBRow className="margin20">
          <MDBCol md="8"></MDBCol>
          <MDBCol md="4">
            <span className="link" onClick={this.toggle}>
              Enter Detail Expenses {`>`}
            </span>
          </MDBCol>
        </MDBRow> */}

        {this.state.showModal ? (
          <DetailedExpenseModal
            toggle={this.toggle}
            openModal={this.state.openModal}
            calculateNonHousingExpense={this.calculateNonHousingExpense}
          />
        ) : null}
        <MDBRow className="margin20">
          <MDBCol md="12" sm="12" xs="12" size="12">
            <span className="get-started-label">Choose your downpayment</span>
            <br />
            
            <ToggleButtonGroup
             className="css-box"
              name="downPayment"
              value={this.state.downPayment}
              exclusive
              onChange={this.downpaymentToggleButtonChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={"A"}>{`>`}20%</ToggleButton>

              <ToggleButton value={"B"} onClick={this.showPMI}>
                {`<`}20%
              </ToggleButton>
            </ToggleButtonGroup>
          
          </MDBCol>
        </MDBRow>
        {this.state.showPMI ? showPMIButton : null}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Enter the term of your mortgage
            </span>
            <br />
            <ToggleButtonGroup
            className="css-box"
              name="mortgageTerm"
              value={this.state.mortgageTerm}
              exclusive
              onChange={this.mortgageTermChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={15}>15 years</ToggleButton>
              <ToggleButton value={30}>30 years</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20 marginBottom20">
          <MDBCol md="12">
            <span className="get-started-label">
              Are you interested in an interest only option for your first
              mortgage?
            </span>
            <br />
            <ToggleButtonGroup
            className="css-box"
              name="mortgageTerm"
              value={this.state.ineterestOnlyFirstMortgage}
              exclusive
              onChange={this.ineterestOnlyFirstMortgageChange}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={"Y"}>Yes</ToggleButton>
              <ToggleButton value={"N"}>No</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}

export default PropertyPaymentInfo2;
