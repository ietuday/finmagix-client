import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import { Button } from "@material-ui/core";
import {get_detail_expense} from "../../src/Components/redux/actions/PropertyReport/personalFinance"
import { Input } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class DetailedExpenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilities: props.apiResponse ? props.apiResponse.utilities : "",
      telephone_internet: props.apiResponse ? props.apiResponse.telephone_internet : "",
      travel_entertainment: props.apiResponse ? props.apiResponse.travel_entertainment : "",
      education: props.apiResponse ? props.apiResponse.education : "",
      other_expenses: props.apiResponse ? props.apiResponse.other_expenses : "",
      personal_finances_obj : JSON.parse(localStorage.getItem('personal_finance_array')).id,
      id :JSON.parse(localStorage.getItem("personal_finance_array")).detail_non_housing_expenses && Object.entries(JSON.parse(localStorage.getItem('personal_finance_array')).detail_non_housing_expenses).length !== 0 ?
      JSON.parse(localStorage.getItem('personal_finance_array')).detail_non_housing_expenses.id : "",
      nonHousingExpenses: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }
  componentDidMount (){
    const {GetDetailExpense}= this.props;
    GetDetailExpense(this.props.apiResponse.id)
  }
  cancelClick() {
    this.setState({
      utilities: "",
      telephone_internet: "",
      travel_entertainment: "",
      education: "",
      other_expenses: "",
      nonHousingExpenses: 0,
    });
  }
  goToNextPage = () => {
    this.props.calculateNonHousingExpense(this.state);
  };
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    });
    
    this.add();
  }
  async add() {
    const {
      utilities,
      telephonInternet,
      travelEntertainment,
      education,
      otherExpenses,
    } = this.state;
    await this.setState({
      nonHousingExpenses:
        Number(utilities) +
        Number(telephonInternet) +
        Number(travelEntertainment) +
        Number(education) +
        Number(otherExpenses),
    });
    
  }
  render() {
    return (
      <Fragment>
          <MDBModal
            isOpen={this.props.openModal}
            toggle={this.props.toggle}
            backdrop={true}
            size="lg"
          >
            <MDBModalHeader toggle={this.props.toggle}></MDBModalHeader>
            <MDBModalBody>
              <MDBRow className="property-payment-row">
                <MDBCol md="2">
                  <span onClick={this.cancelClick}>
                    <h4 className="link">Cancel</h4>
                  </span>
                </MDBCol>
                <MDBCol md="10" className="text-center">
                  <h4>Non-housing expenses</h4>
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12" className="text-center">
                  <span>Your monthly combined non-housing expenses</span>
                  <br />
                  <span>{Number(this.state.nonHousingExpenses)}</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Utilities</span>
                  <br />
                  <Input
                    className="input-class-mdb"
                    placeholder="Enter amount here"
                    name="utilities"
                    value={this.state.utilities}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">
                    Telephone and Internet
                  </span>
                  <br />
                  <Input
                    className="input-class-mdb"
                    placeholder="Enter amount here"
                    name="telephone_internet"
                    value={this.state.telephone_internet}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">
                    Travel and Entertainment
                  </span>
                  <br />
                  <Input
                    className="input-class-mdb"
                    placeholder="Enter amount here"
                    name="travel_entertainment"
                    value={this.state.travel_entertainment}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Education</span>
                  <br />
                  <Input
                    className="input-class-mdb"
                    placeholder="Enter amount here"
                    name="education"
                    value={this.state.education}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12">
                  <span className="get-started-label">Other Expenses</span>
                  <br />
                  <Input
                    className="input-class-mdb"
                    placeholder="Enter amount here"
                    name="other_expenses"
                    value={this.state.other_expenses}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="margin20">
                <MDBCol md="12" className="text-center">
                  <Button
                    variant="contained"
                    size="large"
                    className="button-inner-class"
                    onClick={this.goToNextPage}
                  >
                    {JSON.parse(localStorage.getItem("personal_finance_array")).detail_non_housing_expenses && Object.entries(JSON.parse(localStorage.getItem('personal_finance_array')).detail_non_housing_expenses).length !== 0 ? "Update" : "Save"}
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
          </MDBModal>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    GetDetailExpenseResponse : state.GetDetailExpenseResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDetailExpense: (id) => dispatch(get_detail_expense(id)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedExpenseModal));

