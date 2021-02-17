import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { get_personal_finance_data } from "../redux/actions/PropertyReport/personalFinance";
import { Redirect,withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import quss from "../../assets/images/que.png";


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
        <Header type="Personal Finance" />
        <MDBContainer className="review-edit-container">
        <MDBRow className="margin20">
            <Button
              className="back-arrow"
              size="large"
              onClick={() => this.props.history.push({pathname: '/property-form',
              returnBackFromreviewEdit : true})}
            >
              Back
            </Button>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-center">
              <h4 className="summary-title">Personal Finance Summary</h4>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Fico Score Range</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
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
                <span className="get-started-label">Annual Gross Income</span>
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Annual Gross income is your total gross income
              before any deductions such as income taxes. If you have other sources
              other than salary & wages, please include them as well. </span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.annual_gross_income}
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
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
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
                <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Note that we have to build a check here that the
             interest only period cannot be equal to the loan term or greater 
             than the loan term. </span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-center">
                {PeronalFinanceData.marginal_tax_rate}
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
