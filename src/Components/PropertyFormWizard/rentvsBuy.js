import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import Button from "@material-ui/core/Button";
import { Radio, Input } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import RentvsBuyValidator from "../validatorRules/RentvsBuyValidatorRules";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import { setRentvsBuyFilledStatus } from "../../routes/utils";
import NumberFormat from "react-number-format";

import quss from "../../assets/images/que.png";

export class RentvsBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_monthly_rent_payment: "",
      annual_rent_insurance: "",
      rate_of_investment: "",
      openModal: true,
      property_obj : localStorage.getItem("property_id"),
      radioValue:  false,
      rentinflation: "",
      rate_of_investment_percentage: 0,
      rentinflation_percentage: 0
    };
    this.validators = RentvsBuyValidator;
    resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }
  async handleChange(e, value) {
    const {name} = e.target
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });
    if (name === "current_monthly_rent_payment" ||
      name === "annual_rent_insurance" 
    ) {
    updateValidators(this.validators, e.target.name, e.target.value);
    const validationErrorLength = this.validators[e.target.name].errors.length;
    this.props.getValidationError(validationErrorLength);
    }
    this.props.getRentvsBuyData(this.state);
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  async onRadioChange(e) {
    await this.setState({
      radioValue: e.target.value,
    });
    if (this.state.radioValue) {
      this.props.showStep(2);
    }
    setRentvsBuyFilledStatus(this.state.radioValue)
  }
  goToTaxScreen = () => {
    this.props.goToTaxfromRentvsBuyModal();
  };

  componentDidMount() {
  }
  render() {
    const showSelectRentvsbuyModule = (
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
            <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.goToTaxScreen}>
              Continue
            </Button>
          ) : null}
       </MDBModalFooter>
      </MDBModal>
    );
    return (
      <Fragment>
        {(localStorage.getItem("is_rent_vs_buy_selected") === "true") ||
        this.state.radioValue ? (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">
                  Current monthly rent payment
                </span>
                <br />
                {/* <Input
                  type="text"
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="current_monthly_rent_payment"
                  value={this.state.current_monthly_rent_payment}
                  onChange={this.handleChange}
                /> */}
            <NumberFormat
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="current_monthly_rent_payment"
                  value={this.state.current_monthly_rent_payment}
                  onChange={this.handleChange}
                  thousandSeparator={true}
            />



              </MDBCol>
            </MDBRow>
            {displayValidationErrors(
          this.validators,
          "current_monthly_rent_payment"
        )}
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Annual rent insurance</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">This is the insurance that covers a rental property. Different landlords may
 require different levels of coverage from a tenant.</span>
</div>
                <br />
                <Input
                  type="text"
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="annual_rent_insurance"
                  valuen={this.state.annual_rent_insurance}
                  onChange={this.handleChange}
                />
              </MDBCol>
            </MDBRow>
            {displayValidationErrors(this.validators, "annual_rent_insurance")}
            <MDBRow className="margin20 marginbottom20">
              <MDBCol md="12">
                <span className="get-started-label">Rate of investment</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">This is your average annualized 'rate of return' on your investments. 
            This input is used in the 'rent vs. buy' comparison.</span>
            </div> 
                <br />
                {/* <Input
                  type="text"
                  className="input-class-mdb"
                  placeholder="Enter amount here %"
                  name="rate_of_investment"
                  value={this.state.rate_of_investment}
                  onChange={this.handleChange}
                /> */}


            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="rate_of_investment_percentage"
              value={this.state.rate_of_investment_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  rate_of_investment: value,
                });
                await this.setState({
                  rate_of_investment_percentage: formattedValue,
                });
              }}
            />
              </MDBCol>
            </MDBRow>
            {/* {displayValidationErrors(this.validators, "rate_of_investment")} */}

            <MDBRow className="margin20 marginbottom20">
              <MDBCol md="12">
                <span className="get-started-label">Rate Inflation</span>
                <br />
                {/* <Input
                  type="text"
                  className="input-class-mdb"
                  placeholder="Enter amount here %"
                  name="rentinflation"
                  value={this.state.rentinflation}
                  onChange={this.handleChange}
                /> */}


            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here %"
              name="rentinflation_percentage"
              value={this.state.rentinflation_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  rentinflation: value,
                });
                await this.setState({
                  rentinflation_percentage: formattedValue,
                });
              }}
            />

              </MDBCol>
              {/* {displayValidationErrors(this.validators, "rentinflation")} */}
            </MDBRow>
          </div>
        ) : (
          showSelectRentvsbuyModule
        )}
      </Fragment>
    );
  }
}

export default withRouter(RentvsBuy);
