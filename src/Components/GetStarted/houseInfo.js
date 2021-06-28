import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import MapContainer from "../../common/googleMap";
import NumberSpinner from "../../common/inputNumberSpinner";
import quss from "../../assets/images/que.png";
export class GetStartedHouseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyPrice: "",
      houseArea: "",
      annualPropertyTax: "",
      annualHomeOwnerInsurance: "",
      bedroomCount: "",
      bathrromCount: "",
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
    return (
      <Fragment>
        <MDBRow>
          <MDBCol>
            <MapContainer type="home" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              What is the price of the property?
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">Enter the price of the house requested by the seller or the current appraised value of the house.
             If both prices are available, please enter the appraised value of the house.</span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Please enter the price of the property"
              name="propertyPrice"
              value={this.state.propertyPrice}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bedroom</span>
          </MDBCol>
          <MDBCol md="5" sm="6" xs="6" size="6">
            <NumberSpinner onRoomCount={this.handleBedroomRoomCount} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="7" sm="6" xs="6" size="6">
            <span className="get-started-long-question">Bathroom</span>
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
            <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">Enter the annual property tax in number not %. 
            Typically these range between 1-2% of the home price. </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Please enter the annual property tax"
              name="annualPropertyTax"
              value={this.state.annualPropertyTax}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Annual Home Owner's Assoication dues(if applicable)
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
          <MDBCol>
            <MapContainer type="office" />
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}

export default GetStartedHouseInfo;
