import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { Redirect,withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import { get_tax_data } from "../redux/actions/PropertyReport/taxes";
import NumberFormat from "react-number-format";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export class TaxReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEdit : false
    };
  }
  componentDidMount() {
    const { GetTaxData } = this.props;
    GetTaxData();
  
  }
  goToEdit = () => {
    this.setState({
      goToEdit: !this.state.goToEdit,
    });
  };
  render() {
    const { GetTaxResponse } = this.props;
    if (this.state.goToEdit) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: { property_id: 4 ,isTaxFilled :true, tax_edit_id : this.props.location.getId},
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header type="Edit your inputs" />
        <MDBContainer className="review-edit-container">
        <MDBRow className="margin20">
            <Button
              className="back-arrow"
              size="large"
              onClick={() => this.props.history.push({pathname: '/property-form',
              returnBackFromreviewEdit : true })}
            >
               <ArrowBackIosIcon />
            </Button>
          </MDBRow>
        <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <h4 className="summary-title">
                Taxes Summary
              </h4>
            </MDBCol>
          </MDBRow>
    
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Medical and dental Expenses</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              
              <NumberFormat value= {GetTaxResponse ? GetTaxResponse.medical_and_dental_expenses : "no data"} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">State local general sales taxes</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              
              <NumberFormat value= {GetTaxResponse ? GetTaxResponse.state_local_generalsales_taxes : "no data"} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Other Taxes</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value= {GetTaxResponse ? GetTaxResponse.other_taxes : "no data"} displayType={'text'} thousandSeparator={true} />
              
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Tax deductive investment interest</span>
           
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.tax_deductive_investment_interest : "no data"} displayType={'text'} thousandSeparator={true} />
             
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Tax deductible charitable donations</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.tax_deductible_charitable_donations : "no data"} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Tax deductible casualty and theft losses</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.tax_deductible_casualty_and_theft_losses : "no data"} displayType={'text'} thousandSeparator={true} />
              
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Average loan balance for grandfathered debt</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.avg_loan_balance_for_grandfathered_debt : "no data"} displayType={'text'} thousandSeparator={true} />
              
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Average loan balance for home acquisition</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.avg_loan_balance_for_home_acquisition_debt : "no data"} displayType={'text'} thousandSeparator={true} />
              
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Paid mortgage</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
              <NumberFormat value=  {GetTaxResponse ? GetTaxResponse.paid_mortgage_on_gf_ha_debt : "no data"} displayType={'text'} thousandSeparator={true} />
              
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
    GetTaxResponse: state.TaxGetResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTaxData: () => dispatch(get_tax_data()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaxReviewEdit));
