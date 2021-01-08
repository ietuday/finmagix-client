import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { Redirect,withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import { get_rent_vs_buy_data } from "../redux/actions/PropertyReport/rentvsBuy";

import quss from "../../assets/images/que.png";

export class RentvsBuyReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEdit: false,
    };
  }
  componentDidMount() {
    const { GetRentvsBuyData,RentvsBuyCreateResponse } = this.props;
    GetRentvsBuyData(RentvsBuyCreateResponse.data.id);
    
  }
  goToEdit = () => {
    this.setState({
      goToEdit: !this.state.goToEdit,
    });
  };
  render() {
    const { GetRentvsBuyResponse } = this.props;
    if (this.state.goToEdit) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: { property_id: 3 ,isRentvsBuyFilled : true ,rent_vs_buy_edit_id : this.props.location.state.getId  },
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
              onClick={() => this.props.history.push({pathname: '/property-form',
              returnBackFromreviewEdit : true })}
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
                {GetRentvsBuyResponse.current_monthly_rent_payment}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Annual Rent Insurance</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">This is the insurance that covers a rental property. Different landlords may
 require different levels of coverage from a tenant.</span>
</div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              {GetRentvsBuyResponse.annual_rent_insurance}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label"></span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">This is your average annualized 'rate of return' on your investments. 
            This input is used in the 'rent vs. buy' comparison.</span>
            </div>

              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              {GetRentvsBuyResponse.rate_of_investment}
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
    GetRentvsBuyResponse : state.RentvsBuyGetData,
    RentvsBuyCreateResponse : state.RentvsBuyCreateResponse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetRentvsBuyData: (id) => dispatch(get_rent_vs_buy_data(id)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RentvsBuyReviewEdit));
