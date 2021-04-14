import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";

import { config } from "../config/default";
const { baseURL } = config;

export class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showReports: false,
      isRentvsBuyFilled : props.isRentvsBuyFilled,
      isTaxFilled : props.isTaxFilled,
      propertyDetail: {}
    };
    this.checkProperty()
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
            propertyDetail: propertyInfo.data.data[0]
          });
        })
        .catch((err) => {});
    }
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
                <img
                  src={require("../../assets/logo/report-logo.png")}
                  alt="report"
                  onClick={this.showReports}
                />
                
              </div>
              <div className="text-center">
              <Button size="large" className="btn btn-primary waves-effect waves-light" onClick={this.showReports}>
              Show Reports
              </Button>
         
              </div>

            </MDBCol>
          </MDBRow>
      
          <MDBRow className="margin20">
            <MDBCol>
              <div className="text-center">
                <p className="summary-font">Do you want to review or edit your inputs? Click  below!</p>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer" 
            onClick={() => this.props.history.push({pathname: '/property-information-review-edit',
            getId : PropertyInfoCreateResponse.data.id  })}>
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
                
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
          onClick={() => this.props.history.push({pathname: '/personalfinance-review-edit',
          getId :JSON.parse(localStorage.getItem('personal_finance_array')).id })}>
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
                  
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 pointer"
           onClick={() =>
            this.props.history.push({pathname: 'rent-vs-buy-review-edit',
            state: {isRentvsBuyFilled:true, 
              getId : this.state.propertyDetail.rent_vs_buy.id 
             }})
          }>
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
          <MDBRow className="margin20 pointer"
           onClick={() =>
            this.props.history.push({pathname: 'rent-vs-buy-review-edit',
            state: {isRentvsBuyFilled:true, 
              getId : this.state.propertyDetail.rent_vs_buy.id 
             }})
          }>
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
                 
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 marginbottom50 pointer"
           onClick={() =>
            this.props.history.push({pathname: '/taxes-review-edit',
            state: {isTaxFilled : true,
              getId :JSON.parse(localStorage.getItem('tax_array')).id }})
          }>
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
                 
                />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow> 
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

