import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Axios from "axios";
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

import { config } from "../config/default";
const { baseURL } = config;

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
      no_of_bedrooms: localStorage.getItem("no_of_bedrooms")
        ? localStorage.getItem("no_of_bedrooms")
        : 0,
      no_of_bathrooms: localStorage.getItem("no_of_bathrooms")
        ? localStorage.getItem("no_of_bathrooms")
        : 0,
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
      downpayment: "",
      is_update: false,
      homepriceGrowthValidationError: "",
      downpaymentnewValidationError: "",
      annualPropertytaxValidationError: "",
      homeownerInsuranceValidationError: "",
    };
    this.validators = HouseInfoValidator;
    resetValidators(this.validators);
    this.houseInfo = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleBedroomRoomCount = this.handleBedroomRoomCount.bind(this);
    this.handleBathRoomCount = this.handleBathRoomCount.bind(this);
    this.checkProperty();
    console.log(localStorage);
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
            house_address: propertyDetail.house_address,
            house_state: propertyDetail.house_state,
            house_zip_code: propertyDetail.house_zip_code,
            property_price: propertyDetail.property_price,
            property_price_number: propertyDetail.property_price,
            downpayment_amount: propertyDetail.downpayment_amount,
            downpayment_amount_number: propertyDetail.downpayment_amount,
            stay_duration: propertyDetail.stay_duration,
            no_of_bedrooms: Number(propertyDetail.no_of_bedrooms),
            no_of_bathrooms: Number(propertyDetail.no_of_bathrooms),
            area_of_the_house: propertyDetail.area_of_the_house,
            area_of_the_house_number: propertyDetail.area_of_the_house,
            annual_property_tax: propertyDetail.annual_property_tax,
            annual_property_tax_number: propertyDetail.annual_property_tax,
            annual_home_owner_association_dues:
              propertyDetail.annual_home_owner_association_dues,
            annual_home_owner_association_dues_number:
              propertyDetail.annual_home_owner_association_dues,
            home_owner_insurance: propertyDetail.home_owner_insurance,
            home_owner_insurance_number: propertyDetail.home_owner_insurance,
            home_price_growth: propertyDetail.home_price_growth,
            home_price_growth_percentage:
              Number(propertyDetail.home_price_growth) * 100,
            is_update: true,
          });
          this.handleBedroomRoomCount(this.state.no_of_bedrooms);
          this.handleBathRoomCount(this.state.no_of_bathrooms);
          let downpayment;
          let twenty_percent_of_property_price =
            (this.state.property_price * 20) / 100;
          if (
            this.state.downpayment_amount < twenty_percent_of_property_price
          ) {
            downpayment = "lessthan20";
          } else {
            downpayment = "greaterthan20";
          }
          this.props.handleHouseInfo(downpayment, this.state);
        })
        .catch((err) => {});
    }
  }

  async handleChange(event) {
    const { name } = event.target;
    this.selectAddress(JSON.parse(localStorage.getItem("addressData")));
    event.persist();
    let downpayment;

    if (event.target.name == "home_price_growth_percentage") {
      if (parseInt(String(event.target.value).replace(/%/g, "")) > 20) {
        this.setState({
          homepriceGrowthValidationError: "Home Price growth cannot exceed 20%",
        });
      } else {
        this.setState({
          homepriceGrowthValidationError: "",
        });
      }
    }

    if (event.target.name == "downpayment_amount") {
      if (
        this.state.property_price <
        parseInt(String(event.target.value).replace(/,/g, ""))
      ) {
        this.setState({
          downpaymentnewValidationError:
            " Downpayment amount can never exceed home price",
        });
      } else {
        this.setState({
          downpaymentnewValidationError: "",
        });
      }
    }

    if (event.target.name == "annual_property_tax") {
      if (
        parseInt(String(event.target.value).replace(/,/g, "")) >
        (parseFloat(String(this.state.property_price).replace(/,/g, "")) * 10) /
          100
      ) {
        this.setState({
          annualPropertytaxValidationError:
            " Annual Property tax cannot exceed 10% of home price",
        });
      } else {
        this.setState({
          annualPropertytaxValidationError: "",
        });
      }
    }

    if (event.target.name == "home_owner_insurance") {
      if (
        parseInt(String(event.target.value).replace(/,/g, "")) >
        (parseFloat(String(this.state.property_price).replace(/,/g, "")) * 2) /
          100
      ) {
        this.setState({
          homeownerInsuranceValidationError:
            "Home Owner's insurance cannot exceed 2% of home price",
        });
      } else {
        this.setState({
          homeownerInsuranceValidationError: "",
        });
      }
    }

    await this.setState({
      [event.target.name]: event.target.value,
    });

    let twenty_percent_of_property_price =
      (this.state.property_price * 20) / 100;
    if (this.state.downpayment_amount < twenty_percent_of_property_price) {
      downpayment = "lessthan20";
    } else {
      downpayment = "greaterthan20";
    }

    if (
      name === "property_price" ||
      name === "downpayment_amount" ||
      name === "home_price_growth" ||
      name === "area_of_the_house" ||
      name == "annual_property_tax" ||
      name == "annual_home_owner_association_dues" ||
      name == "home_owner_insurance"
    ) {
      console.log(name);

      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;

      this.props.getValidationError(validationErrorLength);
    }

    this.props.handleHouseInfo(downpayment, this.state);
  }

  handleBedroomRoomCount(count) {
    this.setState({
      no_of_bedrooms: count,
    });
    console.log(this.state);
    localStorage.setItem("no_of_bedrooms", count);
  }
  handleBathRoomCount(count) {
    this.setState({
      no_of_bathrooms: count,
    });
    console.log(this.state);
    localStorage.setItem("no_of_bathrooms", count);
  }

  
  selectAddress = (data) => {
    this.setState({
      house_address: data.house_address,
      house_state: data.house_state,
      house_zip_code: data.house_zip_code,
    });
    localStorage.setItem("changeAddress", false);
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
        // localStorage.getItem("addressData") 
        // ? this.selectAddress(JSON.parse(localStorage.getItem("addressData")))
        // : null
        return city;
      }
    }
  };
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (addressArray[i].types[j] == "postal_code") {
            area = addressArray[i].long_name;
            // localStorage.getItem("addressData") 
            // ? this.selectAddress(JSON.parse(localStorage.getItem("addressData")))
            // : null
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
          // localStorage.getItem("addressData") 
          //   ? this.selectAddress(JSON.parse(localStorage.getItem("addressData")))
          //   : null
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br /> <br />
        <br /> <br /> <br />
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
          {/* {displayValidationErrors(this.validators, "property_price")} */}
        </MDBRow>
        {/* New field add */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Home Price Growth</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text">
                Enter the growth in the home price per year for the duration of
                stay.
              </span>
            </div>
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
            {this.state.homepriceGrowthValidationError}
          </MDBCol>
        </MDBRow>
        {/* End */}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the downpayment amount?
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img"></img>
              <span className="tooltip-img-text"> Enter your downpayment.</span>
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
            {this.state.downpaymentnewValidationError}
          </MDBCol>
        </MDBRow>
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
              count={this.state.no_of_bedrooms}
              onRoomCount={this.handleBedroomRoomCount}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bathrooms</span>
          </MDBCol>
          <MDBCol md="5" sm="6" xs="6" size="6">
            <NumberSpinner
              count={this.state.no_of_bathrooms}
              onRoomCount={this.handleBathRoomCount}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Area of House</span>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter Area in Sq.Ft"
              name="area_of_the_house"
              value={this.state.area_of_the_house}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter Area in Sq.Ft"
              name="area_of_the_house"
              value={this.state.area_of_the_house}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  area_of_the_house_number: formattedValue,
                });
                await this.setState({
                  area_of_the_house: value,
                });
              }}
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
              }}
            />
            {this.state.annualPropertytaxValidationError}
          </MDBCol>
        </MDBRow>
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
              }}
            />
          </MDBCol>
          {/* {displayValidationErrors(this.validators, "annual_home_owner_association_dues")} */}
        </MDBRow>
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
              }}
            />
            {this.state.homeownerInsuranceValidationError}
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}

export default GetStartedHouseInfo;
