import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { get_personal_finance_data } from "../redux/actions/PropertyReport/personalFinance";
import { Redirect,withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import quss from "../../assets/images/que.png";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
export class PersonalFinanceReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEdit: false,
    };
  }
  componentDidMount() {
    const { GetPersonalFinanceData } = this.props;
    GetPersonalFinanceData();
  }
  goToEdit = () => {
    this.setState({
      goToEdit: !this.state.goToEdit,
    });
  };
  render() {
    const { PeronalFinanceData } = this.props;
    if (this.state.goToEdit) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: { property_id: 1 ,personal_finance_edit_id : this.props.location.getId },
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
              returnBackFromreviewEdit : true})}
            >
               <ArrowBackIosIcon />
            </Button>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <h4 className="summary-title">Personal Finance Summary</h4>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
          <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="5" size="5">
              <div className="">
                <span className="get-started-label">FICO Score Range</span>
              </div>
            </MDBCol>
           
            <MDBCol size="6" sm="4" md="4">
              <div className="get-started-label text-center">
                { PeronalFinanceData.fico_score_range === "A" ? "620-639":
                PeronalFinanceData.fico_score_range === "B" ? "640-659":
                PeronalFinanceData.fico_score_range === "C" ? "660-679" :
                PeronalFinanceData.fico_score_range === "D" ? "680-699" :
                PeronalFinanceData.fico_score_range === "E" ? "700-719":
                PeronalFinanceData.fico_score_range === "F" ? "720-739":
                PeronalFinanceData.fico_score_range === "G" ? "740-759":
                "Greater than 760"
                  }
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

          <MDBRow className="margin20">
          <MDBCol md="1" size="1"></MDBCol>
          <MDBCol md="6" size="6">
            <div className="">
              <span className="get-started-label">
              Adjusted Gross Income

              </span>
             
            </div>
          </MDBCol>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
          <MDBCol md="3" size="3">
            <div className="get-started-label text-center">
              {PeronalFinanceData.federal_income}
            </div>
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>

          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">
                  Your monthly debt payments
                </span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt=""/>
            <span className="tooltip-img-text">Monthly debt payments are all your NON-HOUSING 
            debt payments such as credit cards, car loans etc. </span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.monthly_debt_payments}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">
                  Monthly non housing Expenses
                </span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.monthly_non_housing_expenses}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">
                  Marginal tax Rate
                </span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt=""/>
            <span className="tooltip-img-text">  Marginal Tax rate refers to the rate you pay  on the amount of your income that falls into a certain range. 
              We use to estimate monthly taxes you may pay on your income.</span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.marginal_tax_rate*100}%
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">
                  Filling Status
                </span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.filling_status === "1" ? "Single" :
                PeronalFinanceData.filling_status === "2" ? "Married filling jointly" :
                PeronalFinanceData.filling_status === "3" ? "Married filling seperately":
                PeronalFinanceData.filling_status === "4" ? "Head of household" : null}
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
    PeronalFinanceData: state.getPersonalFinanceData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetPersonalFinanceData: () => dispatch(get_personal_finance_data()),
  };
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalFinanceReviewEdit));
