import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Axios from "axios";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import { get_rent_vs_buy_data } from "../redux/actions/PropertyReport/rentvsBuy";

import quss from "../../assets/images/que.png";

import { config } from "../config/default";
const { baseURL } = config;

export class RentvsBuyReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEdit: false,
      propertyDetail: {}
    };
    this.checkProperty()
  }
  componentDidMount() {
    // const { GetRentvsBuyData,RentvsBuyCreateResponse } = this.props;
    // GetRentvsBuyData(RentvsBuyCreateResponse.data.id);

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
          // const propertyDetail = propertyInfo.data.data[0];

          this.setState({
            propertyDetail: propertyInfo.data.data[0]
          });
        })
        .catch((err) => { });
    }
  }
  goToEdit = () => {
    this.setState({
      goToEdit: !this.state.goToEdit,
    });
  };
  render() {
    if (this.state.goToEdit) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: { property_id: 3, isRentvsBuyFilled: true, rent_vs_buy_edit_id: this.state.propertyDetail.rent_vs_buy.id },
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header type="Personal Finance" />
        <MDBContainer className="review-edit-container">
          <MDBRow className="margin20">
            <Button
              className="back-arrow"
              size="large"
              onClick={() => this.props.history.push({
                pathname: '/property-form',
                returnBackFromreviewEdit: true
              })}
            >
              Back
            </Button>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <h4 className="summary-title">
                Rent vs Buy Summary
              </h4>
            </MDBCol>
          </MDBRow>



          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Current Monthly Rent Payment</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {this.state.propertyDetail && this.state.propertyDetail.rent_vs_buy && this.state.propertyDetail.rent_vs_buy.current_monthly_rent_payment ? this.state.propertyDetail.rent_vs_buy.current_monthly_rent_payment : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>


          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Annual Rent Insurance</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
                  <span className="tooltip-img-text">This is the insurance that covers a rental property. Different landlords may
 require different levels of coverage from a tenant.</span>
                </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {this.state.propertyDetail && this.state.propertyDetail.rent_vs_buy && this.state.propertyDetail.rent_vs_buy.annual_rent_insurance ? this.state.propertyDetail.rent_vs_buy.annual_rent_insurance : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>




          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Rate of Investment</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
                  <span className="tooltip-img-text">This is your average annualized 'rate of return' on your investments.
              This input is used in the 'rent vs. buy' comparison.</span>
                </div>
              </div>
            </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {this.state.propertyDetail && this.state.propertyDetail.rent_vs_buy && this.state.propertyDetail.rent_vs_buy.rate_of_investment ? this.state.propertyDetail.rent_vs_buy.rate_of_investment : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Rate Inflation</span>

              </div>
            </MDBCol>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
        <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {this.state.propertyDetail && this.state.propertyDetail.rent_vs_buy && this.state.propertyDetail.rent_vs_buy.rentinflation ? this.state.propertyDetail.rent_vs_buy.rentinflation : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12" className="text-center">
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={this.goToEdit}
                className="button-inner-class"
                fullWidth
              >
                Edit
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GetRentvsBuyResponse: state.RentvsBuyGetData,
    RentvsBuyCreateResponse: state.RentvsBuyCreateResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetRentvsBuyData: (id) => dispatch(get_rent_vs_buy_data(id)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RentvsBuyReviewEdit));
