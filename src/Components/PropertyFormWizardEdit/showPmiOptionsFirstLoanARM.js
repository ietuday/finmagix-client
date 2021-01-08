import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import quss from "../../assets/images/que.png";


export class ShowPmiOptionsFirstLoanARM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pmi_amount : props.mortgageProgramType === 1 ? props.frmResponse.pmi : props.mortgageProgramType === 2 ? props.armResponse.pmi : "",
      second_mortgage_loan_amount:props.mortgageProgramType === 1 ? props.frmResponse.second_mortgage_loan_amount : props.mortgageProgramType === 2 ? props.armResponse.second_mortgage_loan_amount : "",
      second_mortgage_loan_term: props.mortgageProgramType === 1 ? props.frmResponse.second_mortgage_loan_term : props.mortgageProgramType === 2 ? props.armResponse.second_mortgage_loan_term : "",
      second_mortgage_interest:props.mortgageProgramType === 1 ? props.frmResponse.second_mortgage_interest : props.mortgageProgramType === 2 ? props.armResponse.second_mortgage_interest : "",
      second_mortgage_points:props.mortgageProgramType === 1 ? props.frmResponse.second_mortgage_interest: props.mortgageProgramType === 2 ? props.armResponse.second_mortgage_interest : "",
      second_mortgage_closing_costs:props.mortgageProgramType === 1 ? props.frmResponse.second_mortgage_closing_costs : props.mortgageProgramType === 2 ? props.armResponse.second_mortgage_closing_costs : "",
      PMIOptions: props.mortgageProgramType === 1 && props.frmResponse.pmi === "null" ? "Second Loan" : props.mortgageProgramType === 2 && props.armResponse.pmi === "null" ? "Second Loan" : "PMI",
      showSecondloanOption:  props.mortgageProgramType === 1 && props.frmResponse.pmi !== "null" ? false : props.mortgageProgramType === 2 && props.armResponse.pmi !== "null" ? false : true,
      secondmtgpmichoice1:props.mortgageProgramType === 1 ? props.frmResponse.secondmtgpmichoice1 : props.mortgageProgramType === 2 ? props.armResponse.secondmtgpmichoice1 : "",
      PMIfirst1:props.mortgageProgramType === 1 ? props.frmResponse.PMIfirst1 : props.mortgageProgramType === 2 ? props.armResponse.PMIfirst1 : "",
      loanamountsecond1:props.mortgageProgramType === 1 ? props.frmResponse.loanamountsecond1 : props.mortgageProgramType === 2 ? props.armResponse.loanamountsecond1 : "",
      Pmtsecond1:props.mortgageProgramType === 1 ? props.frmResponse.Pmtsecond1 : props.mortgageProgramType === 2 ? props.armResponse.Pmtsecond1 : "",
      ARMtype1:props.mortgageProgramType === 1 ? props.frmResponse.ARMtype1 : props.mortgageProgramType === 2 ? props.armResponse.ARMtype1 : "",
      ARM1rate:props.mortgageProgramType === 1 ? props.frmResponse.ARM1rate : props.mortgageProgramType === 2 ? props.armResponse.ARM1rate : "",
      ARMfirstadjin1:props.mortgageProgramType === 1 ? props.frmResponse.ARMfirstadjin1 : props.mortgageProgramType === 2 ? props.armResponse.ARMfirstadjin1 : "",
      floor1:props.mortgageProgramType === 1 ? props.frmResponse.floor1 : props.mortgageProgramType === 2 ? props.armResponse.floor1 : "",
      ceiling1:props.mortgageProgramType === 1 ? props.frmResponse.ceiling1 : props.mortgageProgramType === 2 ? props.armResponse.ceiling1 : "", 
      periodicadjcap1:props.mortgageProgramType === 1 ? props.frmResponse.periodicadjcap1 : props.mortgageProgramType === 2 ? props.armResponse.periodicadjcap1 : "",
      rateadd1:props.mortgageProgramType === 1 ? props.frmResponse.rateadd1 : props.mortgageProgramType === 2 ? props.armResponse.rateadd1 : "",
      secondmtgpmichoice2:props.mortgageProgramType === 1 ? props.frmResponse.secondmtgpmichoice2 : props.mortgageProgramType === 2 ? props.armResponse.secondmtgpmichoice2 : "",
      PMIfirst2:props.mortgageProgramType === 1 ? props.frmResponse.PMIfirst2 : props.mortgageProgramType === 2 ? props.armResponse.PMIfirst2 : "",
      loanamountsecond2:props.mortgageProgramType === 1 ? props.frmResponse.loanamountsecond2 : props.mortgageProgramType === 2 ? props.armResponse.loanamountsecond2 : "",
      Pmtsecond2:props.mortgageProgramType === 1 ? props.frmResponse.Pmtsecond2 : props.mortgageProgramType === 2 ? props.armResponse.Pmtsecond2 : "",
      ARM2rate:props.mortgageProgramType === 1 ? props.frmResponse.ARM2rate : props.mortgageProgramType === 2 ? props.armResponse.ARM2rate : "",
      ARMfirstadjin2:props.mortgageProgramType === 1 ? props.frmResponse.ARMfirstadjin2 : props.mortgageProgramType === 2 ? props.armResponse.ARMfirstadjin2 : "",
      floor2:props.mortgageProgramType === 1 ? props.frmResponse.floor2 : props.mortgageProgramType === 2 ? props.armResponse.floor2 : "",
      ceiling2:props.mortgageProgramType === 1 ? props.frmResponse.ceiling2 : props.mortgageProgramType === 2 ? props.armResponse.ceiling2 : "",
      periodicadjcap2:props.mortgageProgramType === 1 ? props.frmResponse.periodicadjcap2 : props.mortgageProgramType === 2 ? props.armResponse.periodicadjcap2 : "",
      rateadd2:props.mortgageProgramType === 1 ? props.frmResponse.rateadd2 : props.mortgageProgramType === 2 ? props.armResponse.rateadd2 : "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  showPmiSecondloan = (event, value) => {
    this.setState({
      PMIOptions: value,
    });
    if (value === "PMI") {
      this.setState({
        showSecondloanOption: false,
      });
    } else if (value === "Second Loan") {
      this.setState({
        showSecondloanOption: true,
      });
    }
  };
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });
    this.props.handleDownpaymentData(this.state);
  }
  componentDidMount() {
  }
  render() {
    const showPmiAmount = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">PMI Amount</span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="pmi_amount"
            value={this.state.pmi_amount}
            onChange={this.handleChange}
          />
        </MDBCol>
      </MDBRow>
    );
    const showSecondLoan = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Loan Amount</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Enter the amount you plan to borrow for this mortgage </span>
</div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_loan_amount"
              value={this.state.second_mortgage_loan_amount}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Select Loan term</span>
            <br />
            <Select
              value={this.state.second_mortgage_loan_term}
              name="second_mortgage_loan_term"
              onChange={this.handleChange}
              style={{ minWidth: "100%" }}
            >
              <MenuItem value={5}>5 years</MenuItem>
              <MenuItem value={10}>10 years</MenuItem>
              <MenuItem value={15}>15 years</MenuItem>
              <MenuItem value={20}>20 years</MenuItem>
              <MenuItem value={25}>25 years</MenuItem>
              <MenuItem value={30}>30 years</MenuItem>
            </Select>
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Interest on your second mortgage
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_interest"
              value={this.state.second_mortgage_interest}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Points</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Input the points you may need to pay on your loan expressed as a % of the loan amount.
 For e.g. 2 points is 2% of the loan amount. Points are levied to cover origination costs or reduce interest rate. </span>
</div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_points"
              value={this.state.second_mortgage_points}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            {/* <span className="get-started-label">Closing costs</span> */}
            <span className="get-started-label">Closing costs</span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">These are fees charged by the lender to the
             borrower for offering the loan. These may include home appraisal fees, 
             credit appraisal fees etc. Do not include any 'points' you have to pay on 
             the loan. Other closing costs may include escrow fees, title insurance, 
             recording fee, survey fee etc. These can range from 0.3% - 1% of the loan 
             amount or slightly higher based on the lender.</span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_closing_costs"
              value={this.state.second_mortgage_closing_costs}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">Secondmtgpmichoice2</span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="secondmtgpmichoice2"
            value={this.state.secondmtgpmichoice2}
            onChange={this.handleChange}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="margin20">
      <MDBCol md="12">
        <span className="get-started-label">PMIfirst2</span>
        <br />
        <Input
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="PMIfirst2"
          value={this.state.PMIfirst2}
          onChange={this.handleChange}
        />
      </MDBCol>
    </MDBRow>

    <MDBRow className="margin20">
    <MDBCol md="12">
      <span className="get-started-label">loanamountsecond2</span>
      <br />
      <Input
        className="input-class-mdb"
        placeholder="Enter amount here"
        name="loanamountsecond2"
        value={this.state.loanamountsecond2}
        onChange={this.handleChange}
      />
    </MDBCol>
  </MDBRow>

    <MDBRow className="margin20">
      <MDBCol md="12">
        <span className="get-started-label">Pmtsecond2</span>
        <br />
        <Input
          className="input-class-mdb"
          placeholder="Enter amount here"
          name="Pmtsecond2"
          value={this.state.Pmtsecond2}
          onChange={this.handleChange}
        />
      </MDBCol>
    </MDBRow>

    <MDBRow className="margin20">
    <MDBCol md="12">
      <span className="get-started-label">ARM2rate</span>
      <br />
      <Input
        className="input-class-mdb"
        placeholder="Enter amount here"
        name="ARM2rate"
        value={this.state.ARM2rate}
        onChange={this.handleChange}
      />
    </MDBCol>
  </MDBRow>

  <MDBRow className="margin20">
  <MDBCol md="12">
    <span className="get-started-label">ARMfirstadjin2</span>
    <br />
    <Input
      className="input-class-mdb"
      placeholder="Enter amount here"
      name="ARMfirstadjin2"
      value={this.state.ARMfirstadjin2}
      onChange={this.handleChange}
    />
  </MDBCol>
</MDBRow>

<MDBRow className="margin20">
<MDBCol md="12">
  <span className="get-started-label">floor2</span>
  <br />
  <Input
    className="input-class-mdb"
    placeholder="Enter amount here"
    name="floor2"
    value={this.state.floor2}
    onChange={this.handleChange}
  />
</MDBCol>
</MDBRow>

<MDBRow className="margin20">
<MDBCol md="12">
  <span className="get-started-label">periodicadjcap2</span>
  <br />
  <Input
    className="input-class-mdb"
    placeholder="Enter amount here"
    name="periodicadjcap2"
    value={this.state.periodicadjcap2}
    onChange={this.handleChange}
  />
</MDBCol>
</MDBRow>

<MDBRow className="margin20">
<MDBCol md="12">
  <span className="get-started-label">rateadd2</span>
  <br />
  <Input
    className="input-class-mdb"
    placeholder="Enter amount here"
    name="rateadd2"
    value={this.state.rateadd2}
    onChange={this.handleChange}
  />
</MDBCol>
</MDBRow>

<MDBRow className="margin20">
<MDBCol md="12">
  <span className="get-started-label">ceiling2</span>
  <br />
  <Input
    className="input-class-mdb"
    placeholder="Enter amount here"
    name="ceiling2"
    value={this.state.ceiling2}
    onChange={this.handleChange}
  />
</MDBCol>
</MDBRow>

      </div>
    );
    return (
      <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12" size="12">
            <p>Your downpayment is less than 20%</p>
            <br />
            <span className="get-started-label">
              Do you want to pay Private Mortgage Insurane(PMI) or Do you prefer
              a second loan?
            </span>
            <ToggleButtonGroup
              name="PMIOptions"
              value={this.state.PMIOptions}
              exclusive
              onChange={this.showPmiSecondloan}
              aria-label="text alignment"
              size="large"
            >
              <ToggleButton value={"PMI"}>PMI</ToggleButton>
              <ToggleButton value={"Second Loan"}>Second Mortgage</ToggleButton>
            </ToggleButtonGroup>
          </MDBCol>
        </MDBRow>
        {this.state.showSecondloanOption ? showSecondLoan : showPmiAmount}
      </Fragment>
    );
  }
}

export default ShowPmiOptionsFirstLoanARM;
