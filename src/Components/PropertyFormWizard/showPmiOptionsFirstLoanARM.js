import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import quss from "../../assets/images/que.png";
import NumberFormat from "react-number-format";
 
import { config } from '../config/default';
const { baseURL } = config;

export class ShowPmiOptionsFirstLoanARM extends Component {
  constructor() {
    super();

    this.state = {
      pmi_amount: 1,
      pmi_amount_number: "1",
      loanamountsecond1_number: "0",
      second_mortgage_loan_amount: "0",
      second_mortgage_loan_term: "0",
      second_mortgage_interest: "0",
      second_mortgage_interest_percentage: "0",
      second_mortgage_points: "0",
      second_mortgage_closing_costs:0,
      second_mortgage_closing_costs_number:0,
      PMIOptions: "PMI",
      showSecondloanOption: false,
      secondmtgpmichoice1: "0",
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
      second_mortgage_points_percentage: "0",
      is_update: false,
      id:"",
      loanAmountValidationError: "",
      pmiValidationError:"",
      interestrateValidationError:"",
      pointsValidationError:"",
      closingCostsValidationError:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty()
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
            pmi_amount: propertyDetail.first_arm.pmi,
            pmi_amount_number: propertyDetail.first_arm.pmi,
            second_mortgage_loan_amount: propertyDetail.first_arm.loanamountsecond1,
            second_mortgage_loan_term: propertyDetail.first_arm.second_mortgage_loan_term,
            second_mortgage_interest: propertyDetail.first_arm.second_mortgage_interest,
            second_mortgage_interest_percentage: Number(propertyDetail.first_arm.second_mortgage_interest)*100,
            second_mortgage_points: propertyDetail.first_arm.second_mortgage_points,
            second_mortgage_closing_costs:propertyDetail.first_arm.second_mortgage_closing_costs,
            second_mortgage_closing_costs_number:propertyDetail.first_arm.second_mortgage_closing_costs,
            PMIOptions: "PMI",
            showSecondloanOption: false,
            secondmtgpmichoice1: propertyDetail.first_arm.secondmtgpmichoice1,
            PMIfirst1: propertyDetail.first_arm.PMIfirst1,
            loanamountsecond1: propertyDetail.first_arm.loanamountsecond1,
            loanamountsecond1_number: propertyDetail.first_arm.loanamountsecond1,
            Pmtsecond1: propertyDetail.first_arm.Pmtsecond1,
            ARMtype1: propertyDetail.first_arm.ARMtype1,
            ARM1rate: propertyDetail.first_arm.ARM1rate,
            ARMfirstadjin1: propertyDetail.first_arm.ARMfirstadjin1,
            floor1: propertyDetail.first_arm.floor1,
            ceiling1: propertyDetail.first_arm.ceiling1,
            periodicadjcap1: propertyDetail.first_arm.periodicadjcap1,
            rateadd1: propertyDetail.first_arm.rateadd1,
            secondmtgpmichoice2: propertyDetail.first_arm.secondmtgpmichoice2,
            PMIfirst2: propertyDetail.first_arm.PMIfirst2,
            loanamountsecond2: propertyDetail.first_arm.loanamountsecond2,
            Pmtsecond2: propertyDetail.first_arm.Pmtsecond2,
            ARM2rate: propertyDetail.first_arm.ARM2rate,
            ARMfirstadjin2: propertyDetail.first_arm.ARMfirstadjin2,
            floor2: propertyDetail.first_arm.floor2,
            ceiling2: propertyDetail.first_arm.ceiling2,
            periodicadjcap2: propertyDetail.first_arm.periodicadjcap2,
            rateadd2: propertyDetail.first_arm.rateadd2,
            second_mortgage_points_percentage: parseInt(Number(propertyDetail.first_arm.second_mortgage_points)*100),
            is_update:true,
            id: propertyDetail.first_arm.id,
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
      this.setState({
        showSecondloanOption: false,
      });
    } else if (value === "Second Loan") {
      this.setState({
        showSecondloanOption: true,
      });
      console.log('clicked')
      // let e = true;
      
      console.log(this.props)
      console.log(this.props.second_mortgage_loan_amount)
      await this.setState({
        showSecondloanOption: true,
        loanamountsecond1: this.props.second_mortgage_loan_amount,
        loan_amount: this.props.loanAmount 
      });
      console.log(this.state.loan_amount)
      var loanOnePercent;
      var secondMortagePercent;
      console.log(this.state.loan_amount, 'success')
      console.log(this.state.property_downpayment, 'success')
        var loanPlusDown = (parseInt(this.state.loan_amount)) + (parseInt(this.state.property_downpayment))
    console.log(loanPlusDown)
    var diff;
    diff = this.state.propertyPrice - loanPlusDown;
    console.log(diff)
    if(diff === 0) {
      loanOnePercent = (this.state.loan_amount/100)*80;
      console.log(loanOnePercent)
      secondMortagePercent = this.state.loan_amount - loanOnePercent
      console.log(secondMortagePercent)
      this.setState({
        loanamountsecond1: secondMortagePercent
      })
     this.props.getEventfromSecondMortgage(loanOnePercent) 
    } else {
      console.log(diff)
      this.setState({
        loanamountsecond1: diff
      })
    }
    }
  };
  async handleChange(event) {
    event.persist();
    await this.setState({
      [event.target.name]: event.target.value,
    });

    if(event.target.name === "loanamountsecond1"){
      if(this.props.loanAmount < parseInt(String(event.target.value).replace(/,/g, ''))){
        this.setState({
          loanAmountValidationError: "Cannot exceed first mortgage amount"
        }) 
      }else{
        this.setState({
          loanAmountValidationError: ""
        }) 
      }
    
  }

  if(event.target.name ===   "second_mortgage_interest_percentage"){
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
      (parseFloat(String(this.state.loanamountsecond1).replace(/,/g, "")) * 5) /
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
              name="loanamountsecond1"
              value={this.state.loanamountsecond1}
              onChange={this.handleChange}
            /> */}
            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="loanamountsecond1"
              value={this.state.loanamountsecond1}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  loanamountsecond1_number: formattedValue,
                });
                await this.setState({
                  loanamountsecond1: value,
                });
              }}
            />
             <span className="validation-text-color">
             {this.state.loanAmountValidationError}
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

export default ShowPmiOptionsFirstLoanARM;
