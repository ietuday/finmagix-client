import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Switch from "@material-ui/core/Switch";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import "../../css/getStarted.css";

export class GetStartedBasicInfo extends Component {
  constructor() {
    super();
    this.state = {
      when_buy_home: "",
      home_identified: false,
      lender_identified: false,
      realtor_identified: false,
      veteran_status: false,
      first_time_home_buyer: false,
    };
    this.basicInfo = "";
    this.onToggleChange = this.onToggleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async onToggleChange(event) {
    await this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
    });
  }
  async onChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    this.basicInfo = JSON.parse(localStorage.getItem("basic-info"));

    if (localStorage.getItem("basic-info")) {
      this.setState({
        when_buy_home: this.basicInfo.when_buy_home,
        home_identified: this.basicInfo.home_identified,
        lender_identified: this.basicInfo.lender_identified,
        realtor_identified: this.basicInfo.realtor_identified,
        veteran_status: this.basicInfo.veteran_status,
        first_time_home_buyer: this.basicInfo.first_time_home_buyer,
      });
    } else {
      this.setState({
        when_buy_home: "",
        home_identified: false,
        lender_identified: false,
        realtor_identified: false,
        veteran_status: false,
        first_time_home_buyer: false,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("basic-info", JSON.stringify(nextState));
  }
  render() {
    return (
      <Fragment>
        <MDBRow className="margin50" center>
          <MDBCol md="10">
            <span className="get-started-label">
              When do you want to buy your home?#############################
            </span>
            <br />
            <Select
               value={this.state.when_buy_home}
               name="when_buy_home"
               onChange={this.onChange}
               style={{minWidth: '100%'}}
            >
              <MenuItem value={3}>3 Months</MenuItem>
              <MenuItem value={6}>6 Months</MenuItem>
              <MenuItem value={9}>9 Months</MenuItem>
              <MenuItem value={12}>12 Months</MenuItem>
              <MenuItem value={'more than 12'}>12+ Months</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>
        <br></br>
<hr></hr>
        <MDBRow className="d-flex justify-content-start margin20 ">
        <MDBCol md="1"></MDBCol>
     
          <MDBCol md="8" size="8">
            <span className="get-started-long-question">
              Have you identified your home ?
            </span>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="1" size="1">
            <Switch
              checked={this.state.home_identified}
              name="home_identified"
              onChange={this.onToggleChange}
              color="primary"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
          
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="1"></MDBCol>
          <MDBCol md="8" size="8">
            <span className="get-started-long-question">
              Do you have a lender?
            </span>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="1" size="1">
            <Switch
              checked={this.state.Lenderidentified}
              name="Lenderidentified"
              onChange={this.onToggleChange}
              color="primary"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="1"></MDBCol>
          <MDBCol md="8" size="8">
            <span className="get-started-long-question">
              Do you have a realtor?
            </span>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="1" size="1">
            <Switch
              checked={this.state.realtor_identified}
              name="realtor_identified"
              onChange={this.onToggleChange}
              color="primary"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="1"></MDBCol>
          <MDBCol md="8" size="8">
            <span className="get-started-long-question">
              Are you a veteran?
            </span>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="1" size="1">
            <Switch
              checked={this.state.veteran_status}
              name="veteran_status"
              onChange={this.onToggleChange}
              color="primary"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="1"></MDBCol>
          <MDBCol md="8" size="8">
            <span className="get-started-long-question">
              Are you a first time homeowner?
            </span>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="1" size="1">
            <Switch
              checked={this.state.first_time_home_buyer}
              name="first_time_home_buyer"
              onChange={this.onToggleChange}
              color="primary"
            />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}

export default GetStartedBasicInfo;
