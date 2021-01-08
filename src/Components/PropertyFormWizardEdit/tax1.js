import React, { Component, Fragment } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import quss from "../../assets/images/que.png";





export class Tax1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed_tax_expenses: props.taxDataResponse.detailed_tax_expenses,
      fedral_adjusted_gross_income: props.taxDataResponse.detailed_tax_expenses === "N" ?
                                    props.taxDataResponse.fedral_adjusted_gross_income : "",
      medical_and_dental_expenses: props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.medical_and_dental_expenses : "", 
      state_local_generalsales_taxes:props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.state_local_generalsales_taxes : "", 
      other_taxes:props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.other_taxes : "", 
      tax_deductive_investment_interest:props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.tax_deductive_investment_interest : "",
      tax_deductible_charitable_donations: props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.tax_deductible_charitable_donations : "",
      tax_deductible_casualty_and_theft_losses: props.taxDataResponse.detailed_tax_expenses === "Y" ?
      props.taxDataResponse.tax_deductible_casualty_and_theft_losses : "",
      showDetailedDeductionOption: props.taxDataResponse.detailed_tax_expenses === "Y" ? true : false,
      pub936_line_13a: props.taxDataResponse.pub936_line_13a, 
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
  }
  detailedExpenseChange = (event, value) => {
    this.setState({
      detailed_tax_expenses: value,
    });
    if (value === "Y") {
      this.setState({
        showDetailedDeductionOption: true,
      });
    } else if (value === "N") {
      this.setState({
        showDetailedDeductionOption: false,
      });
    }
  };

  async handleChange(e) {
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.getData("tax1", this.state)
   
  }
  render() {
    const showGrossIncome = (
      <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
            Federal adjusted gross income
          </span>
          <br />
          <Input
            className="input-class-mdb"
            name="fedral_adjusted_gross_income"
            value={this.state.fedral_adjusted_gross_income}
            onChange={this.handleChange}
            placeholder="Enter amount here"
          />
        </MDBCol>
      </MDBRow>
    );

    const showDetailedDeductionRow = (
      <div>

<MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
            Federal adjusted gross income
          </span>
          <br />
          <Input
            className="input-class-mdb"
            name="fedral_adjusted_gross_income"
            value={this.state.fedral_adjusted_gross_income}
            onChange={this.handleChange}
            placeholder="Enter amount here"
          />
        </MDBCol>
      </MDBRow>
      
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Eligible medical and dental expenses
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">If you itemize your deductions for a taxable year on
 Schedule A (Form 1040 or 1040-SR), Itemized Deductions PDF, you may be able to deduct
  expenses you paid that year for medical and dental care for yourself, your spouse, 
  and your dependents. You may deduct only the amount of your total medical expenses 
  that exceed 7.5% of your adjusted gross income. You figure the amount you're allowed to 
  deduct on Schedule A (Form 1040 or 1040-SR). Source: IRS</span>
</div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="medical_and_dental_expenses"
              value={this.state.medical_and_dental_expenses}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Eligible state and local taxes or general sales taxes
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">If you itemize deductions on Schedule A, 
            your total deduction for state and local income, sales and property taxes is
             limited to a combined, total deduction of $10,000 ($5,000 if married filing 
             separately). You have the option of claiming either state and local income
              taxes or state and local sales taxes (you can’t claim both). Source: IRS </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="state_local_generalsales_taxes"
              value={this.state.state_local_generalsales_taxes}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Other state,local or personal taxes
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">Deductible personal property taxes are those based only 
on the value of personal property such as a boat or car. The tax must be charged to you on 
a yearly basis, even if it's collected more than once a year or less than once a year. 
Refer to form 1040 and Publication 17 for details. Source: IRS </span>
</div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="other_taxes"
              value={this.state.other_taxes}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Tax deductive investment interest
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductive_investment_interest"
              value={this.state.tax_deductive_investment_interest}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Tax deductible charitable donations
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_charitable_donations"
              value={this.state.tax_deductible_charitable_donations}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
             
              Tax deductible casualty and theft losses
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="tax_deductible_casualty_and_theft_losses"
              value={this.state.tax_deductible_casualty_and_theft_losses}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
{/* 
        <MDBRow className="margin20">
        <MDBCol md="12">
          <span className="get-started-label">
          Pub936Line13a
          </span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Enter amount here"
            name="pub936_line_13a"
            value={this.state.pub936_line_13a}
            onChange={this.handleChange}
          />
        </MDBCol>
      </MDBRow> */}

      
      </div>
    );


    return (
      <Fragment>
        <div>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12">
              <span className="get-started-label">
                Do you want to provide detailed itemized deduction?
              </span>
              <br />
              <ToggleButtonGroup
                name="select_your_filling_status"
                value={this.state.detailed_tax_expenses}
                exclusive
                onChange={this.detailedExpenseChange}
                aria-label="text alignment"
                size="large"
              >
                <ToggleButton value={"Y"}>Yes</ToggleButton>
                <ToggleButton value={"N"}>No</ToggleButton>
              </ToggleButtonGroup>
            </MDBCol>
          </MDBRow>
          {this.state.showDetailedDeductionOption
            ? showDetailedDeductionRow
            : showGrossIncome}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Tax1);
