import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import Button from "@material-ui/core/Button";

import Axios from "axios";

import { Radio} from "antd";
import { withRouter, Redirect } from "react-router-dom";


import NumberFormat from "react-number-format";

import quss from "../../assets/images/que.png";

import { config } from '../config/default';
const { baseURL } = config;

import { connect } from "react-redux";
import { get_rent_vs_buy_data } from "../redux/actions/PropertyReport/rentvsBuy";

import quss from "../../assets/images/que.png";





export class RentvsBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_monthly_rent_payment:
        props.GetRentvsBuyResponse.current_monthly_rent_payment,
      annual_rent_insurance: props.GetRentvsBuyResponse.annual_rent_insurance,
      rate_of_investment: props.GetRentvsBuyResponse.rate_of_investment,
      openModal: true,
      radioValue: false,
      rentinflation: props.GetRentvsBuyResponse.rentinflation,
      current_monthly_rent_payment_number: props.GetRentvsBuyResponse.current_monthly_rent_payment,
      property_obj: localStorage.getItem("property_id"),
      rate_of_investment_percentage: props.GetRentvsBuyResponse.rate_of_investment,
      rentinflation_percentage: props.GetRentvsBuyResponse.rentinflation,
      annual_rent_insurance_number: props.GetRentvsBuyResponse.annual_rent_insurance,
      is_update:false,
      id: "",
      annual_rent_insuranceValidationError: ""
    };
    // this.validators = RentvsBuyValidator;
    // resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.checkProperty()

  }

  checkProperty() {
    
    const propertyId = JSON.parse(localStorage.getItem("property_id"));
    if (propertyId) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0];

          this.setState({
            current_monthly_rent_payment: propertyDetail.rent_vs_buy.current_monthly_rent_payment,
            current_monthly_rent_payment_number: propertyDetail.rent_vs_buy.current_monthly_rent_payment,
            annual_rent_insurance: propertyDetail.rent_vs_buy.annual_rent_insurance,
            rate_of_investment: propertyDetail.rent_vs_buy.rate_of_investment,
            rentinflation: propertyDetail.rent_vs_buy.rentinflation,
            rate_of_investment_percentage: Number(propertyDetail.rent_vs_buy.rate_of_investment)*100,
            rentinflation_percentage: Number(propertyDetail.rent_vs_buy.rentinflation)*100,
            annual_rent_insurance_number: propertyDetail.rent_vs_buy.annual_rent_insurance,
            is_update:true,
            id: propertyDetail.rent_vs_buy.id
          });
          
          this.props.getRentvsBuyData(this.state);
        })
        .catch((err) => {});
    }
  }

  async handleChange(e, value) {
    const {name} = e.target

    if (e.target.name == "annual_rent_insurance") {
      const annual_rent = Number(this.state.current_monthly_rent_payment)*12;
      if (parseInt(String(e.target.value).replace(/,/g, '')) > (parseFloat(String(annual_rent).replace(/,/g, '')) * 3) / 100) {

        this.setState({
          annual_rent_insuranceValidationError: "cannot exceed 3% of monthly rent"
        })
      } else {
        this.setState({
          annual_rent_insuranceValidationError: ""
        })
      }
    }

    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });

    // if (
    //   name === "current_monthly_rent_payment" ||
    //   name === "annual_rent_insurance" ||
    //   name === "rate_of_investment"
    // ) {
    //   updateValidators(this.validators, e.target.name, e.target.value);
    //   const validationErrorLength = this.validators[e.target.name].errors
    //     .length;
    //   this.props.getValidationError(validationErrorLength);
    // }
    this.props.getRentvsBuyData(this.state);
  }

  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  async onRadioChange(e) {
    await this.setState({
      radioValue: !this.state.radioValue,
    });
    if (this.state.radioValue) {
      this.props.showStep(2);
    }
  }
  goToTaxScreen = () => {
    this.props.showNext();
  };

  componentWillMount() {
    const { getRentvsBuyData } = this.props;
  }
  componentDidMount() {}
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
        {this.props.isRentvsBuyFilled &&
        this.props.isRentvsBuyFilled === true ? (
          <div>
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">
                  Current monthly rent payment
                </span>
                <br />
                <NumberFormat
                  className="input-class-mdb"
                  placeholder="Enter amount here"
                  name="current_monthly_rent_payment"
                  value={this.state.current_monthly_rent_payment}
                  onChange={this.handleChange}
                  thousandSeparator={true}
                  onValueChange={async (values) => {
                    const { formattedValue, value } = values;
                    await this.setState({
                      current_monthly_rent_payment_number: formattedValue,
                    });
                    await this.setState({
                      current_monthly_rent_payment: value,
                    });
                  }}
                />
              </MDBCol>
            </MDBRow>
            
            <MDBRow className="margin20">
              <MDBCol md="12">
                <span className="get-started-label">Annual rent insurance</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">This is the insurance that covers a rental property. Different landlords may
 require different levels of coverage from a tenant.</span>
</div>
                <br />
                <NumberFormat
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="annual_rent_insurance"
                value={this.state.annual_rent_insurance}
                onChange={this.handleChange}
                thousandSeparator={true}
                onValueChange={async (values) => {
                  const { formattedValue, value } = values;
                  await this.setState({
                    annual_rent_insurance_number: formattedValue,
                  });
                  await this.setState({
                    annual_rent_insurance: value,
                  });
                }}
              />
              {this.state. annual_rent_insuranceValidationError}
              </MDBCol>
            </MDBRow>
            <MDBRow className="margin20 marginbottom20">
              <MDBCol md="12">
                <span className="get-started-label">Rate of investment</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">This is your average annualized 'rate of return' on your investments. 
            This input is used in the 'rent vs. buy' comparison.</span>
            </div>
                <br />
                <NumberFormat
                className="input-class-mdb"
                placeholder="Enter amount here %"
                name="rate_of_investment"
                value={this.state.rate_of_investment}
                onChange={this.handleChange}
                
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
          
            <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12">
              <span className="get-started-label">Rent Rate Inflation</span>
              <div className="tooltip-img">
                <img src={quss} className="tool-img" alt="" />
                <span className="tooltip-img-text">
                Rate inflation is the estimated annual increase in your rent
                </span>
              </div>
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
          "You haven't opted for this field!!"
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GetRentvsBuyResponse: state.RentvsBuyGetData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetRentvsBuyData: (data) => dispatch(get_rent_vs_buy_data(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RentvsBuy)
);
