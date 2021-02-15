import React, { Component, Fragment } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdbreact";
import NumberFormat from "react-number-format";

import Header from "../../common/header";
import "./nerdReportDetails.css";
import { Button } from "@material-ui/core";

export class PropertyAndPersonalFinanceInfo extends Component {
  constructor() {
    super();
    this.state = {
      CalculatorResponse: JSON.parse(
        localStorage.getItem("calculatorResponse")
      ),
      singlePropertyResponse: JSON.parse(
        localStorage.getItem("GetSinglePropertyResponse")
      ),
      personalFinanace: JSON.parse(
        localStorage.getItem("personal_finance_array")
      ),
      marginal_tax_rate:"",
      A: "620 - 639",
      B: "640 - 659",
      C: "660 - 679",
      D: "680 - 699",
      E: "700 - 719",
      F: "720 - 739",
      G: "740 - 759",
      H: "Greater than 760",
    };
  }

  componentDidMount() {
    this.state.CalculatorResponse = JSON.parse(
      localStorage.getItem("calculatorResponse")
    );
    this.state.singlePropertyResponse = JSON.parse(
      localStorage.getItem("GetSinglePropertyResponse")
    );

    if(this.state.CalculatorResponse){
      const data = parseInt(String(Number(this.state.personalFinanace.marginal_tax_rate)*100))
      
      this.setState({marginal_tax_rate: parseInt(String(Number(this.state.personalFinanace.marginal_tax_rate)*100))})
    }
    
  }
  render() {
    return (
      <Fragment>
        <Header
          type="Property And Personal Finance Info"
          className="header-row"
        />
        <MDBContainer>
          <Button
            size="medium"
            className="btn btn-primary btn-sm waves-effect waves-light"
          >
            <Link to="/nerd-report">Go to Nerd Report</Link>
          </Button>
 
          <MDBCol className="margin10">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className="CardTitle">
                  Property Detail
                </MDBCardTitle>
                <MDBCardText>
                  <MDBRow className="margin20">
                    <MDBCol md="12">
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/home.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                          {(this.state.singlePropertyResponse && this.state.singlePropertyResponse.id)
                            ? this.state.singlePropertyResponse['house_address']
                            : "Not Available"}
                        </div>
                      </div><br></br>
                      <MDBRow>
                        <MDBCol md="6">
                          <div className="property-finance-get-started-label">
                            <img
                              src={require("../../assets/logo/bed.png")}
                              alt="finmagix"
                              className="property-finance-logo"
                            />
                            <div>
                              {this.state.singlePropertyResponse
                                ? this.state.singlePropertyResponse
                                    .no_of_bedrooms
                                : 0}{" "}
                              Bedrooms
                            </div>
                          </div>
                        </MDBCol>

                        <MDBCol md="6">
                          <div className="property-finance-get-started-label">
                            <img
                              src={require("../../assets/logo/bathtub.png")}
                              alt="finmagix"
                              className="property-finance-logo"
                            />
                            <div>
                              {this.state.singlePropertyResponse
                                ? this.state.singlePropertyResponse
                                    .no_of_bathrooms
                                : 0}{" "}
                              Bathrooms
                            </div>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>House Price</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.singlePropertyResponse ? this.state.singlePropertyResponse.property_price : 0} displayType={'text'} thousandSeparator={true} />
                          
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="6">
                      <h6>Down payment Amount</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                          
                        <NumberFormat value={this.state.singlePropertyResponse
                            ? this.state.singlePropertyResponse.downpayment_amount
                            : 0} displayType={'text'} thousandSeparator={true} />
                          
                           </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                  
                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>Of Years you plan to stay in the house</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/calendar.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>{this.state.singlePropertyResponse
                            ? this.state.singlePropertyResponse.stay_duration
                            : 0}</div>
                      </div>
                    </MDBCol>
                    <MDBCol md="6">
                      <h6>Annual Property Tax</h6>

                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.singlePropertyResponse
                            ? this.state.singlePropertyResponse.annual_property_tax
                            : 0} displayType={'text'} thousandSeparator={true} />
                          </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>Annual Home Owner’s Insurance</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.singlePropertyResponse
                            ? this.state.singlePropertyResponse.home_owner_insurance
                            : 0} displayType={'text'} thousandSeparator={true} />
                        
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol md="6">
                      <h6>Monthly Home Owner’s Association (HOA) dues</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.singlePropertyResponse
                            ? this.state.singlePropertyResponse.annual_home_owner_association_dues
                            : 0} displayType={'text'} thousandSeparator={true} />
                        
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBCardTitle className="CardTitle">
                  Personal Finance
                  </MDBCardTitle>

                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>FICO score range</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.personalFinanace
                            ? this.state[this.state.personalFinanace.fico_score_range]
                            : 0} displayType={'text'} thousandSeparator={true} />
                          </div>
                      </div>
                    </MDBCol>
                    <MDBCol md="6">
                      <h6>Federal Adjusted Annual Gross Income</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        <NumberFormat value={this.state.personalFinanace
                            ? this.state.personalFinanace.federal_income
                            : 0} displayType={'text'} thousandSeparator={true} />
                        
                        
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>Marginal Tax Rate</h6>
                      <div className="property-finance-get-started-label" >
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        {this.state.personalFinanace
                            ? `${(this.state.marginal_tax_rate)}%`
                            : 0}
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol md="6">
                      <h6>Average Monthly Debt Payments</h6>

                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>

                        <NumberFormat value={this.state.personalFinanace
                            ? this.state.personalFinanace.monthly_debt_payments
                            : 0} displayType={'text'} thousandSeparator={true} />
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="6">
                      <h6>Tax Filing Status</h6>
                      <div className="property-finance-get-started-label">
                        <img
                          src={require("../../assets/logo/taxs.png")}
                          alt="finmagix"
                          className="property-finance-logo"
                        />
                        <div>
                        {this.state.personalFinanace
                            ? this.state.personalFinanace.filling_status
                            : 0}
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </Fragment>
    );
  }
}
export default withRouter(PropertyAndPersonalFinanceInfo);
