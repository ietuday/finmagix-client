import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from "react-number-format";

import MapContainer from "../../common/googleMap";
import MapWithASearchBox from "../../common/geocode";
import NumberSpinner from "../../common/inputNumberSpinner";
import { updateValidators } from "../../common/ValidatorFunction";
import quss from "../../assets/images/que.png";
import "../../css/addProperty.css";

import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import HouseInfoValidator from "../validatorRules/HouseInfoValidator";

export class GetStartedHouseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house_address: "",
      house_state: "",
      house_zip_code: "",
      property_price: "",
      property_price_number: "",
      downpayment_amount: "",
      downpayment_amount_number: "",
      stay_duration: "",
      no_of_bedrooms: "",
      no_of_bathrooms: "",
      area_of_the_house: "",
      annual_property_tax: "",
      annual_property_tax_number: "",
      annual_home_owner_association_dues: "",
      annual_home_owner_association_dues_number: "",
      home_owner_insurance: "",
      home_owner_insurance_number: "",
      home_price_growth: "",
      home_price_growth_percentage: "",
      address: localStorage.getItem("address")
        ? JSON.parse(localStorage.getItem("address"))
        : "",
    };
    this.validators = HouseInfoValidator;
    resetValidators(this.validators);
    this.houseInfo = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleBedroomRoomCount = this.handleBedroomRoomCount.bind(this);
    this.handleBathRoomCount = this.handleBathRoomCount.bind(this);
  }
  async handleChange(event) {
    const { name } = event.target;
    this.selectAddress(JSON.parse(localStorage.getItem("addressData")));
    event.persist();
    let downpayment;
    await this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.home_price_growth);
    let twenty_percent_of_property_price =
      (this.state.property_price * 20) / 100;
    if (this.state.downpayment_amount < twenty_percent_of_property_price) {
      downpayment = "lessthan20";
    } else {
      downpayment = "greaterthan20";
    }
    console.log("this.state.property_price", this.state.property_price_number);

    console.log(
      "twenty_percent_of_property_price",
      twenty_percent_of_property_price
    );
    if (
      name === "property_price" ||
      name === "downpayment_amount" ||
      name === "area_of_the_house" ||
      name == "annual_property_tax" ||
      name == "annual_home_owner_association_dues" ||
      name == "home_owner_insurance"
    ) {
      console.log(this.state.home_price_growth);
      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;
      console.log(this.validators[event.target.name]);
      this.props.getValidationError(validationErrorLength);
      console.log(this.state.home_price_growth);
    }
    console.log(this.state);
    this.props.handleHouseInfo(downpayment, this.state);
  }
  handleBedroomRoomCount(count) {
    this.setState({
      no_of_bedrooms: count,
    });
  }
  handleBathRoomCount(count) {
    this.setState({
      no_of_bathrooms: count,
    });
  }
  selectAddress = (data) => {
    this.setState({
      house_address: data.house_address,
      house_state: data.house_state,
      house_zip_code: data.house_zip_code,
    });
    localStorage.setItem("changeAddress", false);
    console.log(this.state);
  };
  handleBack = () => {
    this.props.history.push("/select-modules");
  };

  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        console.log(city);
        return city;
      }
    }
  };
  getArea = (addressArray) => {
    console.log(addressArray);
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (addressArray[i].types[j] == "postal_code") {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {}
  render() {
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol>
            {/* <MapContainer type="home" onSelectAddress={this.selectAddress} /> */}
            <MapWithASearchBox />
          </MDBCol>
        </MDBRow>
        <br /><br /><br /><br /><br /><br /><br /> <br /> <br /><br /> <br /> <br />
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the price of the property?
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Enter the price of the house requested by the seller or the
                current appraised value of the house. If both prices are
                available, please enter the appraised value of the house.
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="property_price"
              value={this.state.property_price}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="property_price"
              value={this.state.property_price}
              onChange={this.handleChange}
              thousandSeparator={true}
              // suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  property_price_number: formattedValue,
                });
                await this.setState({
                  property_price: value,
                });
              }}
            />
          </MDBCol>
          {displayValidationErrors(this.validators, "property_price")}
        </MDBRow>
        {/* New field add */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Home Price Growth</span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount in Percentage"
              name="home_price_growth"
              value={this.state.home_price_growth}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount in Percentage"
              name="home_price_growth_percentage"
              value={this.state.home_price_growth_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  home_price_growth: value,
                });
                await this.setState({
                  home_price_growth_percentage: formattedValue,
                });
              }}
            />
          </MDBCol>
          {/* {displayValidationErrors(this.validators, "home_price_growth")} */}
        </MDBRow>
        {/* End */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the downpayment amount?
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                {" "}
                Enter the amount (Money) you intend to pay i.e. difference
                between the purchase price and loan amount.
              </span>
            </div>
            <br />
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="downpayment_amount"
              value={this.state.downpayment_amount}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  downpayment_amount_number: formattedValue,
                });
                await this.setState({
                  downpayment_amount: value,
                });
              }}
            />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="downpayment_amount"
              value={this.state.downpayment_amount}
              onChange={this.handleChange}
            /> */}
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "downpayment_amount")}
        <MDBRow className="margin20" center>
          <MDBCol md="12">
            <span className="get-started-label">
              How long do you intend to stay in this house?
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Enter the number of years you intend to stay in this house, or
                the number of years after which you intend to refinance the
                mortgage on this house.{" "}
              </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Duration of stay"
              value={this.state.stay_duration}
              name="stay_duration"
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bedrooms</span>
          </MDBCol>
          <MDBCol md="5" sm="6" xs="6" size="6">
            <NumberSpinner
              count={0}
              onRoomCount={this.handleBedroomRoomCount}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bathrooms</span>
          </MDBCol>
          <MDBCol md="5" sm="6" xs="6" size="6">
            <NumberSpinner count={0} onRoomCount={this.handleBathRoomCount} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Area of House</span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter Area in Sq.Ft"
              name="area_of_the_house"
              value={this.state.area_of_the_house}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "area_of_the_house")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Annual Property Tax</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Enter the annual property tax in number not %. Typically these
                range between 1-2% of the home price.{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_property_tax"
              value={this.state.annual_property_tax}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_property_tax"
              value={this.state.annual_property_tax}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  annual_property_tax_number: formattedValue,
                });
                await this.setState({
                  annual_property_tax: value,
                });
                console.log(this.state);
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "annual_property_tax")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Monthly Home Owner's Association dues (if applicable)
              <div className="tooltip-img">
                <img src={quss} className="tool-img"></img>
                <span className="tooltip-img-text">
                  Enter the monthly association dues that you expect to pay the
                  home owner's association of your residential complex. These
                  dues are levied for the services or amenities provided by the
                  HOA.{" "}
                </span>
              </div>
            </span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_home_owner_association_dues"
              value={this.state.annual_home_owner_association_dues}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_home_owner_association_dues"
              value={this.state.annual_home_owner_association_dues}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  annual_home_owner_association_dues_number: formattedValue,
                });
                await this.setState({
                  annual_home_owner_association_dues: value,
                });
                console.log("nnual_home_owner_association_dues", this.state);
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(
          this.validators,
          "annual_home_owner_association_dues"
        )}
        <MDBRow className="margin20 marginbottom20">
          <MDBCol md="12">
            <span className="get-started-label">Home Owner's Insurance</span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="home_owner_insurance"
              value={this.state.home_owner_insurance}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="home_owner_insurance"
              value={this.state.home_owner_insurance}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  home_owner_insurance_number: formattedValue,
                });
                await this.setState({
                  home_owner_insurance: value,
                });
                console.log("home_owner_insurance", this.state);
              }}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "home_owner_insurance")}
      </Fragment>
    );
  }
}

export default GetStartedHouseInfo;
