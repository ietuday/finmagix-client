import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { withRouter, Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { get_single_property } from "../redux/actions/PropertyListing/index";
import { get_calculator } from "../redux/actions/Calculator/index";
import "../../css/reports.css";

export class NerdReport extends Component {
  constructor() {
    super();
    this.state = {
      homeScreen : false,
      cheatSheet : false,
      nerdReport : false,
      MortgageSummary:false,
      TaxSummary:false,
      HomeAffordability:false,
      RentBuySummary:false,
      EquityProjection:false,
      AmortizationTableFRM:false,        
      PropertyAndPersonalFinanceInfo:false,
      PostMortgagePurchaseProfile:false,
      singlePropertyResponse: {},
      CalculatorResponse: {}
    };
    
  }
  goToRentBuySummary = () => {
    this.setState({
      RentBuySummary : !this.state.RentBuySummary
    })
  }

  goToHomeAffordability = () => {
    this.setState({
      HomeAffordability : !this.state.HomeAffordability
    })
  }

  goToMortgageSummary = () => {
    this.setState({
      MortgageSummary : !this.state.MortgageSummary
    })
  }
  goToEquityProjection = () => {
    this.setState({
      EquityProjection : !this.state.EquityProjection
    })
  }
  
  goToTaxSummary = () => {
    this.setState({
      TaxSummary : !this.state.TaxSummary
    })
  }
  goToAmortizationTableFRM = () => {
    this.setState({
      AmortizationTableFRM : !this.state.AmortizationTableFRM
    })
  }
  goToPropertyAndPersonalFinanceInfo = () => {
    this.setState({
      PropertyAndPersonalFinanceInfo : !this.state.PropertyAndPersonalFinanceInfo
    })
  }

  goToPostMortgagePurchaseProfile = () => {
    this.setState({
      PostMortgagePurchaseProfile : !this.state.PostMortgagePurchaseProfile
    })
  }
  


  goToHomeScreen = () => {
    this.setState({
        homeScreen : !this.state.homeScreen
    })
  }
  goToCheatSheet = () => {
    this.setState({
      cheatSheet : !this.state.cheatSheet
  })
  }
  
  goToNerdReport = () =>{
    this.setState({
      nerdReport : !this.state.nerdReport
  })
  }
  componentDidMount() {
    this.setState({
      singlePropertyResponse: JSON.parse(localStorage.getItem('GetSinglePropertyResponse')),
      CalculatorResponse: JSON.parse(localStorage.getItem('calculatorResponse'))
    })
   
  }
  render() {
   
    

    
    if (this.state.homeScreen) {
        return <Redirect to="/show-detailed-reports" />;
      }

      if (this.state.HomeAffordability) {
        return <Redirect to="home-affordability" />;
      }

      if (this.state.RentBuySummary) {
        return <Redirect to="rentbuy-summary" />;
      }

      if (this.state.cheatSheet) {
        return <Redirect to="/property-finance-info" />;
      }
      if (this.state.MortgageSummary) {
        return (
          <Redirect
          to={{
            pathname: "/mortgage-summary",
            state: {
              singlePropertyResponse: this.state.singlePropertyResponse,
              CalculatorResponse: this.state.CalculatorResponse,
            },
          }}
          />
        );
      }
      if (this.state.TaxSummary) {
        return <Redirect to="tax-summary" />;
      }
      if (this.state.EquityProjection) {
        return <Redirect to="equity-projection" />;
      }
      if (this.state.AmortizationTableFRM) {
       
      
      return (
        <Redirect
        to={{
          pathname: "/amortization-table-frm",
          state: {
            singlePropertyResponse: this.state.singlePropertyResponse,
            CalculatorResponse: this.state.CalculatorResponse,
          },
        }}
        />
      );
         }
      if (this.state.PropertyAndPersonalFinanceInfo) {
        return <Redirect to="property-finance-info" />;
      }
      if (this.state.PostMortgagePurchaseProfile) {
        return <Redirect to="post-mortgage-profile" />;
      }

      if (this.state.nerdReport) {
        return <Redirect to="/nerd-report" />;
      }
    return (
      <Fragment>
        <Header type="Report" />
        <MDBContainer className="report-container">
        <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.goToHomeScreen}>
        Go To Report Screen
      </Button>
        <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow className="margin20">
                    <MDBCol md="9" size="10">
                      <div>
                        <Typography variant="h5" component="h2">
                          <MDBIcon icon="map-marker-alt" /> &nbsp;&nbsp; 
                          {this.state.singlePropertyResponse.house_address ? this.state.singlePropertyResponse.house_address : ""}
                        </Typography>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="margin20 pointer"
            onClick={this.goToPropertyAndPersonalFinanceInfo}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                      Property and Personal
                      </Typography>
                      <Typography variant="body2" component="p">
                      Property and Personal Finance Info
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          // onClick={this.goToPropertyAndPersonalFinanceInfo}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
          onClick={this.goToHomeAffordability}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Affordability
                      </Typography>
                      <Typography variant="body2" component="p">
                        Affordability range for different loan
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
           onClick={this.goToRentBuySummary}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Rent vs Buy
                      </Typography>
                      <Typography variant="body2" component="p">
                        Rent or buy based on his inputs...
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                         
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
          onClick={this.goToMortgageSummary}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Mortgage summary
                      </Typography>
                      <Typography variant="body2" component="p">
                        Details of the mortgage amount and type
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
          onClick={this.goToTaxSummary}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Tax summary
                      </Typography>
                      <Typography variant="body2" component="p">
                        Tax advantage to buying a home
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          // onClick={this.goToTaxSummary}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
          onClick={this.goToEquityProjection}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                       Equity projections
                      </Typography>
                      <Typography variant="body2" component="p">
                        Equility in the house or house price
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          
                          // onClick={this.goToEquityProjection}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer" 
          onClick={this.goToAmortizationTableFRM}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                       Amortization table
                      </Typography>
                      <Typography variant="body2" component="p">
                        Amortization table with year,interest,pay
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          // onClick={this.goToAmortizationTableFRM}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
   
          <MDBRow className="margin20 pointer"
          onClick={this.goToPostMortgagePurchaseProfile}
          >
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                      Post Mortgage
                      </Typography>
                      <Typography variant="body2" component="p">
                      Post Mortgage Purchase Profile
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          // onClick={this.goToPostMortgagePurchaseProfile}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
         
        </MDBContainer>
      </Fragment>
    );
  }
}

export default withRouter(NerdReport);
