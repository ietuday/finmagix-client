import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MapContainer from "../../common/googleMap";
import NumberSpinner from "../../common/inputNumberSpinner";
import { get_property_info } from "../redux/actions/PropertyReport/propertyInfo";
import { connect } from "react-redux";
import HouseInfoValidator from "../validatorRules/HouseInfoValidator";
import { updateValidators } from "../../common/ValidatorFunction";
import {
  resetValidators,
  displayValidationErrors,
} from "../../common/ValidatorFunction";
import quss from "../../assets/images/que.png";


export class GetStartedHouseInfo extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      house_address: props.PropertyInfoGetDataResponse.house_address,
      house_state: props.PropertyInfoGetDataResponse.house_state,
      house_zip_code: props.PropertyInfoGetDataResponse.house_zip_code,
      property_price: props.PropertyInfoGetDataResponse.property_price,
      downpayment_amount: props.PropertyInfoGetDataResponse.downpayment_amount,
      stay_duration: props.PropertyInfoGetDataResponse.stay_duration,
      no_of_bedrooms: props.PropertyInfoGetDataResponse.no_of_bedrooms,
      no_of_bathrooms: props.PropertyInfoGetDataResponse.no_of_bathrooms,
      area_of_the_house: props.PropertyInfoGetDataResponse.area_of_the_house,
      annual_property_tax: props.PropertyInfoGetDataResponse.annual_property_tax,
      annual_home_owner_association_dues: props.PropertyInfoGetDataResponse.annual_home_owner_association_dues,
      home_owner_insurance: props.PropertyInfoGetDataResponse.home_owner_insurance,
      home_price_growth:props.PropertyInfoGetDataResponse.home_price_growth
    };
    this.validators = HouseInfoValidator;
    resetValidators(this.validators);
    this.houseInfo = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleBedroomRoomCount = this.handleBedroomRoomCount.bind(this);
    this.handleBathRoomCount = this.handleBathRoomCount.bind(this);
  }
  async handleChange(event) {
    const{name} = event.target
    if(name=="home_price_growth"){
      let data = Number(event.target.value)/100
      event.target.value = String(data)
    }
    event.persist();
    let downpayment;
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
      name === "area_of_the_house" ||
      name == "annual_property_tax" ||
      name=="annual_home_owner_association_dues"||
      name=="home_owner_insurance" || 
      name=="home_price_growth"
    ) {
      updateValidators(this.validators, event.target.name, event.target.value);
      const validationErrorLength = this.validators[event.target.name].errors
        .length;
      this.props.getValidationError(validationErrorLength);
    }
    
    this.props.handleHouseInfo(downpayment, this.state,this.props.getId);
  }
  componentDidMount(){
    this.props.PropertyInfoGetData(this.props.getId);
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
      house_address: data.address,
      house_state: data.state,
      house_zip_code: data.area,
    });
  };
  handleBack = () => {
    this.props.history.push("/select-modules");
  };

  componentWillUpdate(nextProps, nextState) {}
  render() {
    const {PropertyInfoGetDataResponse} = this.props;
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol>
            <MapContainer addresData={PropertyInfoGetDataResponse} type="home" onSelectAddress={this.selectAddress} />
          </MDBCol>
        </MDBRow>

      <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the price of the property?
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Enter the price of the house requested by the seller or the current appraised value of the house.
             If both prices are available, please enter the appraised value of the house.</span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="property_price"
              value={this.state.property_price}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "property_price")}

        <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
          Home Price Growth
          </span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="home_price_growth"
            value={this.state.home_price_growth}
            onChange={this.handleChange}
          />
        </MDBCol>
        {displayValidationErrors(this.validators, "home_price_growth")}
      </MDBRow>

      
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the downpayment amount? 
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text"> Enter the amount (Money) you intend to pay i.e. 
            difference between the purchase price and loan amount.</span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="downpayment_amount"
              value={this.state.downpayment_amount}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "downpayment_amount")}
        <MDBRow className="margin20" center>
          <MDBCol md="12">
            <span className="get-started-label">
              How long do you intend to stay in this house?
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Enter the number of years you intend to stay in this house,
 or the number of years after which you intend to refinance the mortgage on this house. </span>
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
            <NumberSpinner count={PropertyInfoGetDataResponse.no_of_bedrooms} onRoomCount={this.handleBedroomRoomCount} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bathrooms</span>
          </MDBCol>
          <MDBCol md="5" sm="6" xs="6" size="6">
            <NumberSpinner  count={PropertyInfoGetDataResponse.no_of_bathrooms} onRoomCount={this.handleBathRoomCount} />
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
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Enter the annual property tax in number not %. 
            Typically these range between 1-2% of the home price. </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_property_tax"
              value={this.state.annual_property_tax}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "annual_property_tax")}
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Monthly Home Owner's Assoication dues(if applicable)
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="annual_home_owner_association_dues"
              value={this.state.annual_home_owner_association_dues}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "annual_home_owner_association_dues")}
        <MDBRow className="margin20 marginbottom20">
          <MDBCol md="12">
            <span className="get-started-label">Home Owner's Insurance</span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="home_owner_insurance"
              value={this.state.home_owner_insurance}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        {displayValidationErrors(this.validators, "home_owner_insurance")}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PropertyInfoGetDataResponse : state.getPropertyinfoData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    PropertyInfoGetData: (id) => dispatch(get_property_info(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetStartedHouseInfo);
