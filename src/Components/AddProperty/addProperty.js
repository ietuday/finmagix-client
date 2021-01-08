import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../../common/header";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import "../../css/addProperty.css";
import { Input } from "antd";
import MapContainer from "../../common/googleMap";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberSpinner from "../../common/inputNumberSpinner";
import quss from "../../assets/images/que.png";

export class AddProperty extends Component {
  constructor() {
    super();
    this.state = {
      propertyPrice: "",
      houseArea: "",
      annualPropertyTax: "",
      annualHomeOwnerInsurance: "",
      bedroomCount: "",
      bathrromCount: "",
      nextButton: false,
    };
    this.houseInfo = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleBedroomRoomCount = this.handleBedroomRoomCount.bind(this);
    this.handleBathRoomCount = this.handleBathRoomCount.bind(this);
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleNext = () => {
      this.setState({
          nextButton : !this.state.nextButton
      })
  }
  handleBedroomRoomCount(count) {
    this.setState({
      bedroomCount: count,
    });
  }
  handleBathRoomCount(count) {
    this.setState({
      bathrromCount: count,
    });
  }
  componentDidMount() {
    this.houseInfo = JSON.parse(localStorage.getItem("house-info"));

    if (localStorage.getItem("house-info")) {
      this.setState({
        propertyPrice: this.houseInfo.propertyPrice,
        houseArea: this.houseInfo.houseArea,
        annualPropertyTax: this.houseInfo.annualPropertyTax,
        annualHomeOwnerInsurance: this.houseInfo.annualHomeOwnerInsurance,
        bedroomCount: this.houseInfo.bedroomCount,
        bathrromCount: this.houseInfo.bathrromCount,
      });
    } else {
      this.setState({
        propertyPrice: "",
        houseArea: "",
        annualPropertyTax: "",
        annualHomeOwnerInsurance: "",
        bedroomCount: "",
        bathrromCount: "",
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("house-info", JSON.stringify(nextState));
  }
  render() {
      if(this.state.nextButton){
          return <Redirect to = "/select-modules" />
      }
    return (
      <Fragment>
        <CssBaseline />
        <Header type="dashboard" />
        <MDBContainer className="add-property-container">
          <MDBRow className="margin20">
            <MDBCol>
              <MapContainer type="home" />
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
                name="propertyPrice"
                value={this.state.propertyPrice}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12">
              <span className="get-started-label">DownPayment Amount</span>
              <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text"> Enter the amount (Money) you intend to pay i.e. 
            difference between the purchase price and loan amount.</span>
            </div>
              <br />
              <Input
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="downPaymentAmount"
                value={this.state.downPaymentAmount}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
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
              <NumberSpinner onRoomCount={this.handleBedroomRoomCount} />
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="7" sm="6" xs="6" size="6">
              <span className="get-started-long-question">Bathrooms</span>
            </MDBCol>
            <MDBCol md="5" sm="6" xs="6" size="6">
              <NumberSpinner onRoomCount={this.handleBathRoomCount} />
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12">
              <span className="get-started-label">Area of House</span>
              <br />
              <Input
                className="input-class-mdb"
                placeholder="Enter Area in Sq.Ft"
                name="houseArea"
                value={this.state.houseArea}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
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
                name="annualPropertyTax"
                value={this.state.annualPropertyTax}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12">
              <span className="get-started-label">
              Monthly Home Owner’s Insurance
              </span>
              <br />
              <Input
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="annualHomeOwnerInsurance"
                value={this.state.annualHomeOwnerInsurance}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
         
          <MDBRow className="margin20">
            <MDBCol md="12">
              <span className="get-started-label">
              Monthly Home Owner's Association dues (if applicable)
              </span>
              <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Enter the monthly association dues that you expect to pay the home owner's association of your residential complex. 
            These dues are levied for the services or amenities provided by the HOA. </span>
            </div>
              <br />
              <Input
                className="input-class-mdb"
                placeholder="Enter amount here"
                name="annualHomeOwnerInsurance"
                value={this.state.annualHomeOwnerInsurance}
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12" className="text-center">
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
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default AddProperty;
