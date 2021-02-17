import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import { Radio, Input } from "antd";
import Button from "@material-ui/core/Button";
import { withRouter, Redirect } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import quss from "../../assets/images/que.png";


import NumberFormat from "react-number-format";

export class Tax2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avg_loan_balance_for_grandfathered_debt: props.taxDataResponse.previous_balance === "Y" ?
      props.taxDataResponse.avg_loan_balance_for_grandfathered_debt : "",
      avg_loan_balance_for_home_acquisition_debt:props.taxDataResponse.previous_balance === "Y" ?
      props.taxDataResponse.avg_loan_balance_for_home_acquisition_debt : "",
      paid_mortgage_on_gf_ha_debt:  props.taxDataResponse.previous_balance === "Y" ?
      props.taxDataResponse.paid_mortgage_on_gf_ha_debt : "",
      previous_balance : props.taxDataResponse.previous_balance,
      showPreviousLoanBalanceButton: props.taxDataResponse.previous_balance === "Y" ? true : false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
  }
  previousBalanceChange = (event, value) => {
    this.setState({
      previous_balance: value,
    });
    if (value === "Y") {
      this.setState({
        showPreviousLoanBalanceButton: true,
      });
    } else if (value === "N") {
      this.setState({
        showPreviousLoanBalanceButton: false,
      });
    }
  };
  goToReport = () => {
    this.props.showNext();
  };
  async handleChange(e) {
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.getData("tax2", this.state)
  }
  render() {
    const showPreviousBalanceRow = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for grandfathered debt
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
<span className="tooltip-img-text">If you took out a mortgage on your home before October 14, 
1987, or you refinanced such a mortgage, it may qualify as grandfathered debt. Grandfathered 
debt isn't limited. All of the interest you paid on grandfathered debt is fully deductible
 home mortgage interest. However, the amount of your grandfathered debt reduces the limit for 
 home acquisition debt. Source: IRS Publication 936 </span>
</div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_grandfathered_debt"
              value={this.state.avg_loan_balance_for_grandfathered_debt}
              onChange={this.handleChange}
            /> */}
               <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_grandfathered_debt"
              value={this.state.avg_loan_balance_for_grandfathered_debt}
              onChange={this.handleChange}
              thousandSeparator={true}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for home acquisition debt
            </span>
            <div className="tooltip-img"><img src={quss} className="tool-img"></img>
            <span className="tooltip-img-text">Home acquisition debt is a mortgage you took out after 
            October 13, 1987, to buy, build, or substantially improve a qualified home (your main or second home).
             It must also be secured by that home. Source: IRS publication 936 </span>
            </div>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_home_acquisition_debt"
              value={this.state.avg_loan_balance_for_home_acquisition_debt}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20 marginbottom20">
          <MDBCol md="12">
            <span className="get-started-label">
              Mortgage interest you paid on your grandfathered debt and home
              acquisition debt
            </span>
            <br />
            <Input
              className="input-class-mdb"
              placeholder="Enter % here"
              name="paid_mortgage_on_gf_ha_debt"
              value={this.state.paid_mortgage_on_gf_ha_debt}
              onChange={this.handleChange}
            />
          </MDBCol>
        </MDBRow>
      </div>
    );

    return (
      <Fragment>
        <div>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12">
              <span className="get-started-label">
                Do you have any balances from previous loan?
              </span>
              <br />
              <ToggleButtonGroup
                name="previous_balance"
                value={this.state.previous_balance}
                exclusive
                onChange={this.previousBalanceChange}
                aria-label="text alignment"
                size="large"
              >
                <ToggleButton value={"Y"}>Yes</ToggleButton>
                <ToggleButton value={"N"}>No</ToggleButton>
              </ToggleButtonGroup>
            </MDBCol>
          </MDBRow>
          {this.state.showPreviousLoanBalanceButton
            ? showPreviousBalanceRow
            : null}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Tax2);
