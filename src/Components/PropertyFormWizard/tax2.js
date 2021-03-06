import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,

} from "mdbreact";

import Axios from "axios";
import { withRouter} from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

// import Tax2Validator from "../validatorRules/Tax2Validator";
// import { updateValidators } from "../../common/ValidatorFunction";

import NumberFormat from "react-number-format";

// import {
//   resetValidators,
//   displayValidationErrors,
// } from "../../common/ValidatorFunction";
import quss from "../../assets/images/que.png";

import { config } from '../config/default';
const { baseURL } = config;



export class Tax2 extends Component {
  constructor() {
    super();
    this.state = {
      avg_loan_balance_for_grandfathered_debt: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_grandfathered_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_grandfathered_debt
        : "",
      avg_loan_balance_for_grandfathered_debt_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_grandfathered_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_grandfathered_debt
        : "",
      avg_loan_balance_for_home_acquisition_debt: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_home_acquisition_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_home_acquisition_debt : "",
      avg_loan_balance_for_home_acquisition_debt_number: JSON.parse(
        localStorage.getItem("tax_array")
      ).avg_loan_balance_for_home_acquisition_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .avg_loan_balance_for_home_acquisition_debt : "",
      paid_mortgage_on_gf_ha_debt: JSON.parse(
        localStorage.getItem("tax_array")
      ).paid_mortgage_on_gf_ha_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .paid_mortgage_on_gf_ha_debt : "",
      paid_mortgage_on_gf_ha_debt_number:JSON.parse(
        localStorage.getItem("tax_array")
      ).paid_mortgage_on_gf_ha_debt
        ? JSON.parse(localStorage.getItem("tax_array"))
            .paid_mortgage_on_gf_ha_debt : "",
      previous_balance: "N",
      showDetailedDeductionOption: false,
      showPreviousLoanBalanceButton: false,
    };
    // this.validators = Tax2Validator;
    // resetValidators(this.validators);
    this.handleChange = this.handleChange.bind(this);
    this.checkProperty()
  }

  checkProperty() {
    
    const propertyId = JSON.parse(localStorage.getItem("property_id"));
    if (propertyId && JSON.parse(localStorage.getItem("tax_array")) && JSON.parse(localStorage.getItem("tax_array")).id) {
      Axios.get(`${baseURL}/property_listings/${propertyId}`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((propertyInfo) => {
          const propertyDetail = propertyInfo.data.data[0];
          if(propertyDetail.taxes.id){
            this.setState({
              avg_loan_balance_for_grandfathered_debt:propertyDetail.taxes.avg_loan_balance_for_grandfathered_debt,  
              avg_loan_balance_for_grandfathered_debt_number:propertyDetail.taxes.avg_loan_balance_for_grandfathered_debt,   
              avg_loan_balance_for_home_acquisition_debt: propertyDetail.taxes.avg_loan_balance_for_home_acquisition_debt,
              avg_loan_balance_for_home_acquisition_debt_number: propertyDetail.taxes.avg_loan_balance_for_home_acquisition_debt,
              paid_mortgage_on_gf_ha_debt: propertyDetail.taxes.paid_mortgage_on_gf_ha_debt,
              paid_mortgage_on_gf_ha_debt_number: propertyDetail.taxes.paid_mortgage_on_gf_ha_debt
            });
            
            this.props.getData("tax2", this.state);
          }else{
            this.props.getData("tax2", this.state);
          }
         
          
        })
        .catch((err) => {});
    }
  }
  componentDidMount() {}
  previousBalanceChange = async (event, value) => {
    await this.setState({
      previous_balance: value,
    });
    if (value === "Y") {
      await this.setState({
        showPreviousLoanBalanceButton: true,
      });
    } else if (value === "N") {
      await this.setState({
        showPreviousLoanBalanceButton: false,
      });
    }
    this.props.getData("tax2", this.state);
  };
  goToReport = () => {
    this.props.showNext();
  };
  async handleChange(e) {
    // const { name } = e.target;
    e.persist();
    await this.setState({
      [e.target.name]: e.target.value,
    });

    // if (this.state.previous_balance === "Y") {
    //   if (
    //     name === "avg_loan_balance_for_grandfathered_debt" ||
    //     name === "avg_loan_balance_for_home_acquisition_debt" ||
    //     name === "paid_mortgage_on_gf_ha_debt"
    //   ) {
    //     // updateValidators(this.validators, e.target.name, e.target.value);
    //     // const validationErrorLength = this.validators[e.target.name].errors
    //       // .length;
    //     // this.props.getValidationError(validationErrorLength);
    //   }
    // }

    this.props.getData("tax2", this.state);
  }
  render() {
    const showPreviousBalanceRow = (
      <div>
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for grandfathered debt
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                If you took out a mortgage on your home before October 14, 1987,
                or you refinanced such a mortgage, it may qualify as
                grandfathered debt. Grandfathered debt isn't limited. All of the
                interest you paid on grandfathered debt is fully deductible home
                mortgage interest. However, the amount of your grandfathered
                debt reduces the limit for home acquisition debt. Source: IRS
                Publication 936{" "}
              </span>
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
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  avg_loan_balance_for_grandfathered_debt_number: formattedValue,
                });
                await this.setState({
                  avg_loan_balance_for_grandfathered_debt: value,
                });
              }}
            />
          </MDBCol>
        </MDBRow>
        
        <MDBRow className="margin20">
          <MDBCol md="12">
            <span className="get-started-label">
              Average loan balance for home acquisition debt
            </span>
            <div className="tooltip-img">
              <img src={quss} className="tool-img" alt="" />
              <span className="tooltip-img-text">
                Home acquisition debt is a mortgage you took out after October
                13, 1987, to buy, build, or substantially improve a qualified
                home (your main or second home). It must also be secured by that
                home. Source: IRS publication 936{" "}
              </span>
            </div>
            <br />
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_home_acquisition_debt"
              value={this.state.avg_loan_balance_for_home_acquisition_debt}
              onChange={this.handleChange}
            /> */}

            <NumberFormat
              className="input-class-mdb"
              placeholder="Enter amount here"
              name="avg_loan_balance_for_home_acquisition_debt"
              value={this.state.avg_loan_balance_for_home_acquisition_debt}
              onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  avg_loan_balance_for_home_acquisition_debt_number: formattedValue,
                });
                await this.setState({
                  avg_loan_balance_for_home_acquisition_debt: value,
                });
              }}
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
            {/* <Input
              className="input-class-mdb"
              placeholder="Enter % here"
              name="paid_mortgage_on_gf_ha_debt"
              value={this.state.paid_mortgage_on_gf_ha_debt}
              onChange={this.handleChange}
            /> */}
     <NumberFormat
             className="input-class-mdb"
             placeholder="Enter amount here"
             name="paid_mortgage_on_gf_ha_debt"
             value={this.state.paid_mortgage_on_gf_ha_debt}
             onChange={this.handleChange}
              thousandSeparator={true}
              onValueChange={async (values) => {
                const { formattedValue, value } = values;
                await this.setState({
                  paid_mortgage_on_gf_ha_debt_number: formattedValue,
                });
                await this.setState({
                  paid_mortgage_on_gf_ha_debt: value,
                });
              }}
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
