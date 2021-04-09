import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";

import Axios from "axios";
 
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import NumberFormat from "react-number-format";
import quss from "../../assets/images/que.png";
import { config } from '../config/default';
const { baseURL } = config;

export class ShowPmiOptionsSecondLoan extends Component {
  constructor() {
    super();
    this.state = {
      pmi_amount: 1,
      pmi_amount_number:"",
      second_mortgage_loan_amount: "",
      second_mortgage_loan_term: "",
      second_mortgage_interest: "",
      second_mortgage_interest_percentage: "",
      second_mortgage_points: "",
      second_mortgage_closing_costs:0,
      PMIOptions: "PMI",
      showSecondloanOption: false,
      secondmtgpmichoice1: "",
      PMIfirst1: "0",
      loanamountsecond1: "0",
      Pmtsecond1: "0",
      ARMtype1: "0",
      ARM1rate: "0",
      ARMfirstadjin1: "0",
      floor1: "0",
      ceiling1: "0",
      periodicadjcap1: "0",
      rateadd1: "0",
      secondmtgpmichoice2: "0",
      PMIfirst2: "0",
      loanamountsecond2: "0",
      Pmtsecond2: "0",
      ARM2rate: "0",
      ARMfirstadjin2: "0",
      floor2: "0",
      ceiling2: "0",
      periodicadjcap2: "0",
      rateadd2: "0",
      second_mortgage_closing_costs_number:0,
      second_mortgage_points_percentage: "0",
      loanamountsecond2_number:"0",
      is_update: false,
      id:"",
      secondloanAmountValidationError: "",
      interestrateValidationError: "",
      pointsValidationError: "",
      pmiValidationError: "",
      closingCostsValidationError: "",
      second_mortgage_changed_value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty();
  }

  checkProperty(){
    const propertyId = JSON.parse(localStorage.getItem('property_id'))
    if(propertyId){
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0]
          this.setState({
            pmi_amount: propertyDetail.second_frm.pmi,
            pmi_amount_number: propertyDetail.second_frm.pmi,
            second_mortgage_loan_amount: propertyDetail.second_frm.loanamountsecond1,
            second_mortgage_loan_term: propertyDetail.second_frm.second_mortgage_loan_term,
            second_mortgage_interest: propertyDetail.second_frm.second_mortgage_interest,
            second_mortgage_interest_percentage: Number(propertyDetail.second_frm.second_mortgage_interest)*100,
            second_mortgage_points: propertyDetail.second_frm.second_mortgage_points,
            second_mortgage_closing_costs:propertyDetail.second_frm.second_mortgage_closing_costs,
            second_mortgage_closing_costs_number:propertyDetail.second_frm.second_mortgage_closing_costs,
            PMIOptions: "PMI",
            showSecondloanOption: false,
            secondmtgpmichoice1: propertyDetail.second_frm.secondmtgpmichoice1,
            PMIfirst1: propertyDetail.second_frm.PMIfirst1,
            loanamountsecond1: propertyDetail.second_frm.loanamountsecond1,
            loanamountsecond1_number: propertyDetail.second_frm.loanamountsecond1,
            Pmtsecond1: propertyDetail.second_frm.Pmtsecond1,
            ARMtype1: propertyDetail.second_frm.ARMtype1,
            ARM1rate: propertyDetail.second_frm.ARM1rate,
            ARMfirstadjin1: propertyDetail.second_frm.ARMfirstadjin1,
            floor1: propertyDetail.second_frm.floor1,
            ceiling1: propertyDetail.second_frm.ceiling1,
            periodicadjcap1: propertyDetail.second_frm.periodicadjcap1,
            rateadd1: propertyDetail.second_frm.rateadd1,
            secondmtgpmichoice2: propertyDetail.second_frm.secondmtgpmichoice2,
            PMIfirst2: propertyDetail.second_frm.PMIfirst2,
            loanamountsecond2: propertyDetail.second_frm.loanamountsecond2,
            Pmtsecond2: propertyDetail.second_frm.Pmtsecond2,
            ARM2rate: propertyDetail.second_frm.ARM2rate,
            ARMfirstadjin2: propertyDetail.second_frm.ARMfirstadjin2,
            floor2: propertyDetail.second_frm.floor2,
            ceiling2: propertyDetail.second_frm.ceiling2,
            periodicadjcap2: propertyDetail.second_frm.periodicadjcap2,
            rateadd2: propertyDetail.second_frm.rateadd2,
            second_mortgage_points_percentage: Number(propertyDetail.second_frm.second_mortgage_points)*100,
            is_update: true,
            id:propertyDetail.second_frm.id,
            secondloanAmountValidationError: this.state.secondloanAmountValidationError,
            propertyPrice: propertyDetail.property_price,
            property_downpayment: propertyDetail.downpayment_amount
          })
          this.props.handleDownpaymentData(this.state);
        })
        .catch((err) => {
         
        });
    }
  }

  showPmiSecondloan = async(event, value) => {
    this.setState({
      PMIOptions: value,
    });
    if (value === "PMI") {
      await this.setState({
        showSecondloanOption: false,
        loanamountsecond2 : 0
      });
      this.props.getEventfromSecondMortgage("PMI")
    } else if (value === "Second Loan") {
      await this.setState({
        showSecondloanOption: true,
      });
      this.props.getEventfromSecondMortgage("SecondMortgage") 
    }
  };
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });

    if(event.target.name === "pmi_amount"){
      const checkloanprice = parseInt(Number(this.props.loanAmount) * 3 )/100
      if(checkloanprice < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          pmiValidationError: "Shouldn't exceed 3% of first loan amount"
        }) 
      }else{
        if(parseInt(String(event.target.value).replace(/,/g, '')) <= 0) {
          this.setState({
            pmiValidationError: "PMI cannot be 0"
          })  
        } else {
          this.setState({
            pmiValidationError: ""
          })
        } 
      }
    }

    if(event.target.name === "loanamountsecond2"){
      if(this.props.loanAmount < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          secondloanAmountValidationError: "Cannot exceed first mortgage amount"
        }) 
      }else{
        this.setState({
          secondloanAmountValidationError: ""
        }) 
      }
      
  }

  if(event.target.name === "second_mortgage_interest_percentage"){
    if(parseInt(String(event.target.value).replace(/%/g, '')) > 10){
      this.setState({
        interestrateValidationError: " Is the interest rate input accurate?"
      }) 
    }else{
      this.setState({
        interestrateValidationError: ""
      }) 
    }
    
}


if(event.target.name === "second_mortgage_points_percentage"){
  if(parseInt(String(event.target.value).replace(/%/g, '')) > 5){
    this.setState({
      pointsValidationError: "Points cannot exceed 5%"
    }) 
  }else{
    this.setState({
      pointsValidationError: ""
    }) 
  }
  
}

if (event.target.name === "second_mortgage_closing_costs") {
  if (
    parseInt(String(event.target.value).replace(/,/g, "")) >
    (parseFloat(String(this.state.loanamountsecond2).replace(/,/g, "")) * 5) /
      100
  ) {
    this.setState({
      closingCostsValidationError:
        " Closing costs cannot exceed 5% of loan amount",
    });
  } else {
    this.setState({
      closingCostsValidationError: "",
    });
  }
}

    this.props.handleDownpaymentData(this.state);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if(nextProps.second_mortgage_changed_value){
      this.setState({
        loanamountsecond2: nextProps.second_mortgage_changed_value
      })
    }
  }
  render() {
    const showPmiAmount = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">Monthly PMI Amount</span>
          <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
              PMI, is a type of mortgage insurance you might be required to pay for if you have a conventional loan. PMI is usually required when you have a conventional loan and make a down payment of less than 20 percent of the home's purchase price. You can pay PMI in lieu of a second mortgage
              </span>
            </div>
          <br />
          {/* <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="pmi_amount"
            value={this.state.pmi_amount}
            onChange={this.handleChange}
          /> */}
       <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="pmi_amount"
              value={this.state.pmi_amount}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  pmi_amount_number: formattedValue,
                });
                await this.setState({
                  pmi_amount: value,
                });
              }}
            />
             <span className="validation-text-color">

             {this.state.pmiValidationError}
             </span>
           
        </MDBCol>
      </MDBRow>
    );
    const showSecondLoan = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Loan Amount</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                Enter the amount you plan to borrow for this mortgage{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loanamountsecond2"
              value={this.state.loanamountsecond2}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loanamountsecond2"
              value={this.state.loanamountsecond2}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  loanamountsecond2_number: formattedValue,
                });
                await this.setState({
                  loanamountsecond2: value,
                });
              }}
            />
              <span className="validation-text-color">
              {this.state.secondloanAmountValidationError}
              </span>
           
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
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_interest"
              value={this.state.second_mortgage_interest}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_interest_percentage"
              value={this.state.second_mortgage_interest_percentage}
              onChange={this.handleChange}
              // thousandSeparator={true}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  second_mortgage_interest: value,
                });
                await this.setState({
                  second_mortgage_interest_percentage: formattedValue,
                });
              }}
            />
              <span className="validation-text-color">
              {this.state.interestrateValidationError}
              </span>
            
          </MDBCol>
          
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">Points</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                Input the points you may need to pay on your loan expressed as a
                % of the loan amount. For e.g. 2 points is 2% of the loan
                amount. Points are levied to cover origination costs or reduce
                interest rate.{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_points"
              value={this.state.second_mortgage_points}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_points_percentage"
              value={this.state.second_mortgage_points_percentage}
              onChange={this.handleChange}
              suffix={"%"}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  second_mortgage_points: value,
                });
                await this.setState({
                  second_mortgage_points_percentage: formattedValue,
                });
              }}
            />
              <span className="validation-text-color">
              {this.state.pointsValidationError}  
              </span>
             
          </MDBCol>
        
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            {/* <span className="get-started-label">Closing costs</span> */}
            <span className="get-started-label">Closing costs</span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                These are fees charged by the lender to the borrower for
                offering the loan. These may include home appraisal fees, credit
                appraisal fees etc. Do not include any 'points' you have to pay
                on the loan. Other closing costs may include escrow fees, title
                insurance, recording fee, survey fee etc. These can range from
                0.3% - 1% of the loan amount or slightly higher based on the
                lender.
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="second_mortgage_closing_costs"
              value={this.state.second_mortgage_closing_costs}
              onChange={this.handleChange}
            /> */}
               <NumberFormat
               className="input-class-mdb"
               placeholder="Enter amount here"
               name="second_mortgage_closing_costs"
               value={this.state.second_mortgage_closing_costs}
               onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  second_mortgage_closing_costs_number: formattedValue,
                });
                await this.setState({
                  second_mortgage_closing_costs: value,
                });
              }}
            />
             <span className="validation-text-color">
             {this.state.closingCostsValidationError}
             </span>

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

export default ShowPmiOptionsSecondLoan;
