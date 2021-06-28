import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import {
  frm_mortgage_get_first,
  frm_mortgage_get_second,
  arm_mortgage_get_first,
  arm_mortgage_get_second,
} from "../redux/actions/PropertyReport/propertyMortgage";
import { Redirect, withRouter } from "react-router-dom";
import Tabs from "../../common/tabs";
import "../../css/reviewEdit.css";
import quss from "../../assets/images/que.png";
import NumberFormat from "react-number-format";
import Axios from "axios";
import { config } from '../config/default';
const { baseURL } = config;



export class MortgageProgramReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEditFirstFrm: false,
      goToEditFirstArm: false,
      goToEditSecondFrm: false,
      goToEditSecondArm: false,
      propertyDetail: {}
    };
    this.checkProperty()
  }

  checkProperty(){
    const propertyId = JSON.parse(localStorage.getItem('property_id'))

    if (propertyId) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0]
          this.setState({propertyDetail: propertyDetail})
          

        })
        .catch((er) => {
          
        })
    }
  }
  
  componentDidMount() {
    const {
      FRMMortgageCreateResponseFirst,
      FRMMortgageCreateResponseSecond,
      ARMMortgageCreateResponseFirst,
      ARMMortgageCreateResponseSecond,
      FRMMortgageGetFirst,
      FRMMortgageGetSecond,
      ARMMortgageGetFirst,
      ARMMortgageGetSecond,
    } = this.props;
    
    if (FRMMortgageCreateResponseFirst && FRMMortgageCreateResponseFirst.data) {
      FRMMortgageGetFirst(FRMMortgageCreateResponseFirst.data.id);
    }
    if (
      FRMMortgageCreateResponseSecond &&
      FRMMortgageCreateResponseSecond.data
    ) {
      FRMMortgageGetSecond(FRMMortgageCreateResponseSecond.data.id);
    }
    if (ARMMortgageCreateResponseFirst && ARMMortgageCreateResponseFirst.data) {
      ARMMortgageGetFirst(ARMMortgageCreateResponseFirst.data.id);
    }
    if (
      ARMMortgageCreateResponseSecond &&
      ARMMortgageCreateResponseSecond.data
    ) {
      ARMMortgageGetSecond(ARMMortgageCreateResponseSecond.data.id);
    }
  }
  goToEditFirstFrm = () => {
    this.setState({
      goToEditFirstFrm: !this.state.goToEditFirstFrm,
    });
  };
  goToEditFirstArm = () => {
    this.setState({
      goToEditFirstArm: !this.state.goToEditFirstArm,
    });
  };
  goToEditSecondFrm = () => {
    this.setState({
      goToEditSecondFrm: !this.state.goToEditSecondFrm,
    });
  };
  goToEditSecondArm = () => {
    this.setState({
      goToEditSecondArm: !this.state.goToEditSecondArm,
    });
  };
  render() {
    // const {

    // } = this.props;
    if (this.state.goToEditFirstFrm) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: {
              property_id: 2,
              frm_first_edit_id:
                this.state.propertyDetail.first_frm.id 
                  ? this.state.propertyDetail.first_frm.id 
                  : null,
            },
          }}
        />
      );
    }
    if (this.state.goToEditFirstArm) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: {
              property_id: 2,
              arm_first_edit_id:
              this.state.propertyDetail.first_arm.id 
                  ? this.state.propertyDetail.first_arm.id 
                  : null,
          
            },
          }}
        />
      );
    }
    if (this.state.goToEditSecondFrm) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: {
              property_id: 2,
              frm_second_edit_id:
              this.state.propertyDetail.second_frm.id 
              ? this.state.propertyDetail.second_frm.id 
              : null,
                
            },
          }}
        />
      );
    }
    if (this.state.goToEditSecondArm) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: {
              property_id: 2,
              arm_second_edit_id:
              this.state.propertyDetail.second_arm.id 
              ? this.state.propertyDetail.second_arm.id 
              : null,
            },
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
              onClick={() =>
                this.props.history.push({
                  pathname: "/property-form",
                  returnBackFromreviewEdit: true,
                })
              }
            >
              Back
            </Button>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <h4 className="summary-title">Mortgage Programs Summary</h4>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12">
              <Tabs>
                <div label="First FRM">
                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                           <NumberFormat value={this.state.propertyDetail &&
                          this.state.propertyDetail.first_frm
                          ? this.state.propertyDetail.first_frm.loan_amount || 0
                          : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Term</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.loan_term || 0
                        : null}
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Interest</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? (this.state.propertyDetail.first_frm.interest)*100 || 0
                        : null}%
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Points</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? (this.state.propertyDetail.first_frm.points)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Closing costs</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                         <NumberFormat value= {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Interest only period
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.interest_only_period || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Monthly PMI Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.pmi || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage Loan Amount
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                   
                        <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.loanamountsecond1 || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan term
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.second_mortgage_loan_term || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan interest
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? (this.state.propertyDetail.first_frm.second_mortgage_interest)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage points
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? (this.state.propertyDetail.first_frm.second_mortgage_points)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage closing costs
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                       <NumberFormat value=  {this.state.propertyDetail &&
                        this.state.propertyDetail.first_frm
                        ? this.state.propertyDetail.first_frm.second_mortgage_closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
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
                          onClick={this.goToEditFirstFrm}
                          className="button-inner-class"
                          fullWidth
                        >
                          Edit
                        </Button>
                      </MDBCol>
                    </MDBRow>
                  
                </div>
                <div label="First ARM">

                <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                 
                      <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.loan_amount || 0
                        : null} displayType={'text'} thousandSeparator={true} /> 
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Term</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.loan_term || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Select loan Program</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.select_loan_program || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Initial interest rate</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.initial_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">First interest rate adj cap</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.first_interest_rate_adj_cap)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>


                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Floor interest rate</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            This is the lowest interest rate or 'floor' for an ARM. If the index rate continues to decrease, the 'floor interest rate' gives the lender a floor interest that the lender can levy even if the calculated interest rate is below that floor
            </span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.floor_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Ceiling interest rate</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.ceiling_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Period cap</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            This is the maximum amount an interest rate can increase by when the ARM interest rate resets. For e.g. on a 5/1 ARM mortgage, after 5 years, the interest rate can reset every year '1'. The period cap denotes that maximum amount it can go up by when it resets every year after the first 5 years.
            </span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.period_cap)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>
                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Rate add</span>

                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            This is the maximum interest rate that a lender can charge for an ARM. If the index rate on the loan continues to go up, the interest rate on the ARM can go up. The ceiling interest rate caps the maximum interest a lender can charge
            </span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.rate_add)*100 || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Points</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.points)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Closing costs</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                       <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.closing_costs
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Interest only period
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.interest_only_period || 0
                        : null}

                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Monthly PMI Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.pmi || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage Loan Amount
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                
                         <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.second_mortgage_loan_amount || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan term
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.second_mortgage_loan_term || 0
                        : null}
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan interest
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? (this.state.propertyDetail.first_arm.second_mortgage_interest)*100 || 0
                        : null}%
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage points
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.second_mortgage_points || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage closing costs
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                        <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.first_arm
                        ? this.state.propertyDetail.first_arm.second_mortgage_closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
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
                          onClick={this.goToEditFirstArm}
                          className="button-inner-class"
                          fullWidth
                        >
                          Edit
                        </Button>
                      </MDBCol>
                    </MDBRow>
                </div>
                <div label="Second FRM">
                  

                <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
           
                       <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.loan_amount || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Term</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.loan_term || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Interest</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? (this.state.propertyDetail.second_frm.interest)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Points</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? (this.state.propertyDetail.second_frm.points)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Closing costs</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                   
                       <NumberFormat value=   {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Interest only period
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.interest_only_period || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Monthly PMI Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.pmi || 0
                        : null}
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage Loan Amount
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                   
                       <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.loanamountsecond2 || 0
                        : null} displayType={'text'} thousandSeparator={true} /> 
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan term
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.second_mortgage_loan_term || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan interest
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? (this.state.propertyDetail.second_frm.second_mortgage_interest)*100 || 0
                        : null}%
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage points
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.second_mortgage_points || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage closing costs
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_frm
                        ? this.state.propertyDetail.second_frm.second_mortgage_closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
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
                          onClick={this.goToEditSecondFrm}
                          className="button-inner-class"
                          fullWidth
                        >
                          Edit
                        </Button>
                      </MDBCol>
                    </MDBRow>
                  
                </div>
                <div label="Second ARM">
                  
                <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                    
                       <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.loan_amount || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Loan Term</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.loan_term || 0
                        : null}
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Select loan Program</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.select_loan_program || 0
                        : null}
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Initial interest rate</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">

                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.initial_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">First interest rate adj cap</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.first_interest_rate_adj_cap)*100 || 0
                        : null}%
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>


                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Floor interest rate</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.floor_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Ceiling interest rate</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.ceiling_interest_rate)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Period cap</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.period_cap || 0
                        : null}
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>
                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Rate add</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">
            This field allows you to model an increase or a decrease in your index ARM rate every year  
            </span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.rate_add || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Points</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.points)*100 || 0
                        : null}%
                       
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Closing costs</span>
                        <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                     <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Interest only period
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.interest_only_period || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">Monthly PMI Amount</span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.pmi || 0
                        : null}
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage Loan Amount
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                 
                       <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.second_mortgage_loan_amount || 0
                        : null} displayType={'text'} thousandSeparator={true} /> 
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan term
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.second_mortgage_loan_term || 0
                        : null}
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage loan interest
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.second_mortgage_interest)*100 || 0
                        : null}%
                        
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage points
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">

                      {this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? (this.state.propertyDetail.second_arm.second_mortgage_points)*100 || 0
                        : null}%
                      </div>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                  </MDBRow>

                  <MDBRow className="margin20">
                    <MDBCol md="1" size="1"></MDBCol>
                    <MDBCol md="6" size="6">
                      <div className="">
                        <span className="get-started-label">
                          Second mortgage closing costs
                        </span>
                      </div>
                    </MDBCol>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <MDBCol md="3" size="3">
                      <div className="get-started-label text-center">
                   
                        <NumberFormat value={this.state.propertyDetail &&
                        this.state.propertyDetail.second_arm
                        ? this.state.propertyDetail.second_arm.second_mortgage_closing_costs || 0
                        : null} displayType={'text'} thousandSeparator={true} />
                        
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
                          onClick={this.goToEditSecondArm}
                          className="button-inner-class"
                          fullWidth
                        >
                          Edit
                        </Button>
                      </MDBCol>
                    </MDBRow>
                 
                </div>
              </Tabs>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FRMMortgageCreateResponseFirst: state.FRMMortgageCreateResponseFirst,
    FRMMortgageCreateResponseSecond: state.FRMMortgageCreateResponseSecond,
    ARMMortgageCreateResponseFirst: state.ARMMortgageCreateResponseFirst,
    ARMMortgageCreateResponseSecond: state.ARMMortgageCreateResponseSecond,
    FRMMortgageGetResponseFirst: state.FRMMortgageGetResponseFirst,
    FRMMortgageGetResponseSecond: state.FRMMortgageGetResponseSecond,
    ARMMortgageGetResponseFirst: state.ARMMortgageGetResponseFirst,
    ARMMortgageGetResponseSecond: state.ARMMortgageGetResponseSecond,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FRMMortgageGetFirst: (id) => dispatch(frm_mortgage_get_first(id)),
    ARMMortgageGetFirst: (id) => dispatch(arm_mortgage_get_first(id)),
    FRMMortgageGetSecond: (id) => dispatch(frm_mortgage_get_second(id)),
    ARMMortgageGetSecond: (id) => dispatch(arm_mortgage_get_second(id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MortgageProgramReviewEdit)
);
