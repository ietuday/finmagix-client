import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

export class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showReports: false,
      isRentvsBuyFilled : props.isRentvsBuyFilled,
      isTaxFilled : props.isTaxFilled
    };
  }

  showReports = () => {
    this.props.history.push("/show-detailed-reports");
  };
  componentDidMount() {
    
  }
  render() {
    const{PropertyInfoCreateResponse,FRMMortgageCreateResponseFirst,ARMMortgageCreateResponseFirst,FRMMortgageCreateResponseSecond,ARMMortgageCreateResponseSecond, PersonalFinanceUpdateResponse,TaxUpdateResponse, PersonalFinanceCreateResponse,RentvsBuyCreateResponse,TaxCreateResponse} = this.props;
    return (
      <Fragment>
        <MDBContainer>
          <MDBRow className="margin20">
            <MDBCol>
              <div className="text-center">
                <img
                  src={require("../../assets/logo/report-logo.png")}
                  alt="report"
                  onClick={this.showReports}
                />
                
              </div>
              <div className="text-center">
              <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.showReports}>
                  Show Report
              </Button>
              </div>

            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div className="text-center">
                <h1 className="report-text">Well done,</h1>
                <h4 className="get-started-label report-text">
                  Your report is ready
                </h4>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol>
              <div className="text-center">
                <p>Do you want to Edit or Review inputs?</p>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Property Information</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() => this.props.history.push({pathname: '/property-information-review-edit',
                  getId : localStorage.getItem('property_id')  })}
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Personal Finance</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() => this.props.history.push({pathname: '/personalfinance-review-edit',
                  getId :JSON.parse(localStorage.getItem('personal_finance_array')).id })}
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Mortgage Programs</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() => this.props.history.push({pathname: '/mortgage-programs-review-edit',
                  getFRMDataResponseFirst : FRMMortgageCreateResponseFirst , 
                  getARMDataResponseFirst : ARMMortgageCreateResponseFirst,
                getARMDataResponseSecond: ARMMortgageCreateResponseSecond ,
                getFRMDataResponseSecond: FRMMortgageCreateResponseSecond ,
              })}
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          {localStorage.getItem("is_rent_vs_buy_filled") === "true"?
          (<MDBRow className="margin20">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Rent vs Buy</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push({pathname: 'rent-vs-buy-review-edit',
                    state: {isRentvsBuyFilled:true, 
                      getId : RentvsBuyCreateResponse.data.id 
                     }})
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>) : null }
          {this.state.isTaxFilled === true ||this.props.isTaxFilled || Object.entries(JSON.parse(localStorage.getItem('tax_array'))).length !== 0 ?
          <MDBRow className="margin20 marginbottom50">
            <MDBCol md="1"></MDBCol>
            <MDBCol md="8" size="8">
              <div className="">
                <span className="get-started-label">Taxes</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="1" size="1">
              <div className="text-center">
                <MDBIcon
                  icon="angle-right"
                  size="large"
                  onClick={() =>
                    this.props.history.push({pathname: '/taxes-review-edit',
                    state: {isTaxFilled : true,
                      getId :JSON.parse(localStorage.getItem('tax_array')).id }})
                  }
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow> : null }
                </MDBContainer>
      </Fragment> 
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PersonalFinanceCreateResponse: state.PersonalFinanceCreateResponse,
    PropertyInfoCreateResponse: state.PropertyInfoCreateResponse,
    RentvsBuyCreateResponse: state.RentvsBuyCreateResponse,
    TaxCreateResponse : state.TaxCreateResponse,
    PersonalFinanceUpdateResponse: state.PersonalFinanceUpdateResponse,
    FRMMortgageCreateResponseFirst : state.FRMMortgageCreateResponseFirst,
    ARMMortgageCreateResponseFirst : state.ARMMortgageCreateResponseFirst,
    FRMMortgageCreateResponseSecond : state.FRMMortgageCreateResponseSecond,
    ARMMortgageCreateResponseSecond : state.ARMMortgageCreateResponseSecond,
    TaxUpdateResponse : state.TaxUpdateResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default withRouter(
  connect(mapStateToProps, null)(Summary)
);

