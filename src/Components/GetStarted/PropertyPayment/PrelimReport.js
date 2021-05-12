import React, { Component, Fragment } from "react";
import {MDBRow, MDBCol } from "mdbreact";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { get_prelim_report } from "../../redux/actions/prelimReport";

export class PrelimReport extends Component {
  constructor() {
    super();
    this.state = {
      selectModules: false,
    };
  }

  componentDidMount() {
    const { GetPrelimReport } = this.props;
    var mortgageObject = localStorage.getItem("property-mortgage-info");
    var dataObject = {
      Downpaymentamt: JSON.parse(mortgageObject).downPayment,
      PMIchoice: JSON.parse(mortgageObject).Pmi,
      Loantermchoice: JSON.parse(mortgageObject).mortgageTerm,
      Interestonlychoice: JSON.parse(mortgageObject).ineterestOnlyFirstMortgage,
      durationofstay: Number(JSON.parse(mortgageObject).houseDuration),
    };
    GetPrelimReport(dataObject);
  }

  goToSelectModules = () => {
    this.setState({
      selectModules: !this.state.selectModules,
    });
  };
  render() {
    const { PrelimReportResponse } = this.props;
    if (this.state.selectModules) {
      return <Redirect to="/select-modules" />;
    }
    return (
      <Fragment>
        <MDBRow className="prelim-report-row ">
          <MDBCol md="12" className="text-center">
            <h4 style={{color:'white'}}>Based on your inputs, Finmagix recommends</h4>
            <p>Monthly</p>
            <h2 style={{color:'white'}}>
              {PrelimReportResponse
                ? PrelimReportResponse.recommended_mortagage
                : "No Data"}
            </h2>
           
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12" className="text-center">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.goToSelectModules}
              className="button-inner-class"
              fullWidth
            >
              Next
            </Button>
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PrelimReportResponse: state.prelimReportResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetPrelimReport: (data) => dispatch(get_prelim_report(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrelimReport);
