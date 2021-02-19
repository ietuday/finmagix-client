import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import Axios from "axios";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Header from "../../common/header";
import "../../css/propertyFormWizard.css";

import { config } from '../config/default';
const { baseURL } = config;


export class Survey extends Component {
  constructor() {
    super();
    this.state = {
      when_buy_home: "",
      home_identified: false,
      lender_identified: false,
      realtor_identified: false,
      veteran_status: false,
      first_time_home_buyer: false,
      // property_obj : localStorage.getItem("property_id") && localStorage.getItem("property_id") !== "" ? localStorage.getItem("property_id") : "",
      goToNextPage: false,
      selectModulePage: false,
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
  goToProperty = () => {
    this.setState({
      selectModulePage: !this.state.selectModulePage,
    });
  };
  goToNextPage = async () => {
    localStorage.setItem('basic-info', JSON.stringify(this.state))
    Axios.post(`${baseURL}/survey/list_or_create`, this.state, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((surveyCreateResponse) => {
        this.setState({
          goToNextPage: !this.state.goToNextPage,
        });
      })
      .catch((err) => {
        this.setState({
          goToNextPage: !this.state.goToNextPage,
        });
      });


  };
  async onChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {}

  componentWillUpdate(nextProps, nextState) {}
  render() {
    if (this.state.goToNextPage) {
      return (
        <Redirect
          to={{
            pathname: "/property-form",
            surveyData: this.state,
          }}
        />
      );
    }
    if (this.state.selectModulePage) {
      return <Redirect to="/select-modules" />;
    }
    return (
      <Fragment>
        <Header type="Survey" className="header-row" />
        <MDBContainer className="property-form-container">
          <MDBRow className="margin50" center>
            <MDBCol md="10">
              <span className="get-started-label">
                When do you want to buy your home?
              </span>
              <br />
              <Select
                value={this.state.when_buy_home}
                name="when_buy_home"
                onChange={this.onChange}
                style={{ minWidth: "100%" }}
              >
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={9}>9 Months</MenuItem>
                <MenuItem value={12}>12 Months</MenuItem>
                <MenuItem value={"more than 12"}>12+ Months</MenuItem>
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
                checked={this.state.lender_identified}
                name="lender_identified"
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
          {Object.entries(
            JSON.parse(localStorage.getItem("personal_finance_array"))
          ).length === 0 ? (
            <MDBRow className="margin20">
              <MDBCol md="12">
                <div className="text-center">
                  <Button
                    variant="contained"
                    size="large"
                    className="button-inner-class"
                    onClick={this.goToNextPage}
                  >
                    {" "}
                    Next{" "}
                  </Button>
                </div>
              </MDBCol>
            </MDBRow>
          ) : (
            <MDBRow className="margin20">
              <MDBCol md="12">
                <div className="text-center">
                  <Button
                    variant="contained"
                    size="large"
                    className="button-inner-class"
                    onClick={this.goToProperty}
                  >
                    {" "}
                    Add Property{" "}
                  </Button>
                </div>
              </MDBCol>
            </MDBRow>
          )}
        </MDBContainer>
      </Fragment>
    );
  }
}

export default Survey;
