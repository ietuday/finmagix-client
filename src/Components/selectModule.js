import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from "@material-ui/core";
import Header from "../common/header";
import { withRouter,Redirect } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";
import { saveSelectrentvsbuyStatus, saveSelecttaxStatus} from "../../src/routes/utils"
import "../css/signup-signin.css";

export class SelectModule extends Component {
  constructor() {
    super();
    this.state = {
      backButton: false,
      nextButton: false,
      rentvsbuychecked : false,
      taxchecked:false
    };
  }
  goToNextPage = async() => {
    saveSelectrentvsbuyStatus (this.state.rentvsbuychecked);
    saveSelecttaxStatus (this.state.taxchecked);
   await this.setState({
      nextButton: !this.state.nextButton,
    });
  };
  goToPreviousPage = () => {
    this.setState({
      backButton: !this.state.backButton,
    });
  };
  rentvsbuyChecked = async (e) => {
   await this.setState({
      rentvsbuychecked : !this.state.rentvsbuychecked
    })
    
  }
  taxChecked = async (e) => {
    await this.setState({
      taxchecked :  !this.state.taxchecked
    })
    
  }

  render() {
    if (this.state.nextButton && Object.entries(JSON.parse(localStorage.getItem('personal_finance_array'))).length !== 0) {
      return <Redirect
      to={{
        pathname: "/property-form",
      }}
    />;
    }
    if(this.state.nextButton && Object.entries(JSON.parse(localStorage.getItem('personal_finance_array'))).length === 0){
      return <Redirect
      to={{
        pathname: "/survey",
      }}
      />;
    }
    if (this.state.backButton) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Fragment>
        <Header type="Select Modules" />
        <MDBContainer className="select-module-container">
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <span
                className="sign-up-back-arrow"
                onClick={this.goToPreviousPage}
              >
                <IconButton>
                  <ArrowBackIosIcon />
                </IconButton>
              </span>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <h3 className="signup-signin-label">
                Customise your{" "}
                <span>
                  {" "}
                  <img
                    src={require("../assets/logo/finmagix-text.png")}
                    alt="finmagix"
                    // height={"60px"}
                    width={"150px"}
                  />
                </span>{" "}
                experience
              </h3>
              <p className="get-started-label">Modules included</p>
            </MDBCol>
          </MDBRow>
          <MDBRow className="space-top">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <img
                    className="img-pos" src={require("../assets/logo/information.png")}
                    alt="finmagix"
                    // height={"60px"}
               

                  />
              <div className="custom-control custom-checkbox">
              <div className="space-left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="HouseInfo"
                  name="houseInfo"
                  disabled={true}
                  checked={true}
                />
                <label
                  className="custom-control-label"
                  htmlFor="houseInfo"
                >
                 House and Property Information
                 <span >

              </span>
                </label>
              </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="space-top">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <img
                    className="img-pos" src={require("../assets/logo/finance.png")}
                    alt="finmagix"
                    // height={"60px"}
               

                  />
              <div className="custom-control custom-checkbox">
                <div className="space-left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="personalFinance"
                  name="personalFinance"
                  disabled={true}
                  checked={true}
                />
                <label
                  className="custom-control-label"
                  htmlFor="personalFinance"
                  
                >

                  <span>Personal Finance Summary</span>
                  <span >

              </span>

                </label>
              </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="space-top">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <img
                    className="img-pos5" src={require("../assets/logo/account.png")}
                    alt="finmagix"
                    // height={"60px"}
               

                  />
              <div className="custom-control custom-checkbox">
              <div className="space-left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="mortgageProgram"
                  disabled={true}
                  checked={true}
                />
                <label
                  className="custom-control-label"
                  htmlFor="mortgageProgram"
                >
                  Mortgage Summary
                  <span >

              </span>
                </label>
              </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="space-top">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <img
                    className="img-pos" src={require("../assets/logo/rent-buy.png")}
                    alt="finmagix"
                    // height={"60px"}
               

                  />
              <div className="custom-control custom-checkbox">
              <div className="space-left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="rentvsbuy"
                  defaultChecked={this.state.rentvsbuychecked}
                  onChange={this.rentvsbuyChecked}
                />
                <label className="custom-control-label" htmlFor="rentvsbuy">
                  Rent Vs Buy
                  <span >

              </span>
                </label>
              </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="space-top">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
            <img
                    className="img-pos" src={require("../assets/logo/tax.png")}
                    alt="finmagix"
                    // height={"60px"}
               

                  />
              <div className="custom-control custom-checkbox">
              <div className="space-left">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="taxmodule"
                  defaultChecked={this.state.taxchecked}
                  onChange={this.taxChecked}
                />
                <label className="custom-control-label" htmlFor="taxmodule">
                 Tax
                  <span >

              </span>
                </label>
              </div>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin50 marginbottom20">
            <MDBCol md="12" className="text-center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="button-inner-class"
                onClick={this.goToNextPage}
                fullWidth
              >
                Continue
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default withRouter(SelectModule);
