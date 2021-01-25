import React, { Component, Fragment } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { arm_mortgage_create_first, arm_mortgage_create_second, frm_mortgage_create_first, frm_mortgage_create_second } from "../redux/actions/PropertyReport/propertyMortgage";
import { Radio } from "antd";
import { Button } from "@material-ui/core";
import SecondLoanScenario from "./secondLoanScenario";
import FirstLoanScenario from "./firstLoanScenario";
import { NotificationManager } from "react-notifications";
import { isFormValid } from "../../common/ValidatorFunction";

export class PropertyMortgageHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false,
      openModal: true,
      radioValue: false,
      firstLoanScenario: {
        firstloanarmvalidationerror: 0,
      },
      secondLoanScenario: {
        secondloanarmvalidationerror: 0,
      },
      FirstloanscenarioValidationErrors: 0,
      SecondloanscenarioValidationErrors: 0,
    };
  }
  getFirstloanScenarioValidationError = (error) => {
    this.setState({
      FirstloanscenarioValidationErrors: error,
    });
  };
  getSecondloanScenarioValidationError = (error) => {
    this.setState({
      SecondloanscenarioValidationErrors: error,
    });
  };
  handleFirstloanMortgageInfo = async (data, armvalidationerror) => {
    await this.setState((prevState) => {
      let firstLoanScenario = Object.assign({}, prevState.firstLoanScenario);
      firstLoanScenario = data;
      firstLoanScenario.firstloanarmvalidationerror = armvalidationerror;
      return { firstLoanScenario };
    });
  };
  handleSecondloanMortgageInfo = async (data, armvalidationerror) => {
    await this.setState((prevState) => {
      let secondLoanScenario = Object.assign({}, prevState.secondLoanScenario);
      secondLoanScenario = data;
      secondLoanScenario.secondloanarmvalidationerror = armvalidationerror;
      return { secondLoanScenario };
    });
  };
  handleNext = () => {
    const { FRMMortgageCreateFirst, ARMMortgageCreateFirst} = this.props;
    if (
      (this.state.firstLoanScenario.firstloanarmvalidationerror === 0 ||
        this.state.FirstloanscenarioValidationErrors === 0) 
    ) {
      if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1 
      ) {
        if(this.state.firstLoanScenario['interest']){
          this.state.firstLoanScenario['interest'] = String(
            Number(this.state.firstLoanScenario["interest"]) / 100
          );
        }
        if(this.state.firstLoanScenario['second_mortgage_interest']){
          this.state.firstLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        if(this.state.firstLoanScenario['points']){
          this.state.firstLoanScenario['points'] = String(
            Number(this.state.firstLoanScenario["points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['closing_costs']){
        //   this.state.firstLoanScenario['closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.firstLoanScenario['second_mortgage_points']){
          this.state.firstLoanScenario['second_mortgage_points'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['second_mortgage_closing_costs']){
        //   this.state.firstLoanScenario['second_mortgage_closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["second_mortgage_closing_costs"]) / 100
        //   );
        // }

        FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2 
      ) {
        if(this.state.firstLoanScenario['ARM1rate']){
          this.state.firstLoanScenario['ARM1rate'] = String(
            Number(this.state.firstLoanScenario["ARM1rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['first_interest_rate_adj_cap']){
          this.state.firstLoanScenario['first_interest_rate_adj_cap'] = String(
            Number(this.state.firstLoanScenario["first_interest_rate_adj_cap"]) / 100
          );
        }
        if(this.state.firstLoanScenario['floor_interest_rate']){
          this.state.firstLoanScenario['floor_interest_rate'] = String(
            Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['ceiling_interest_rate']){
          this.state.firstLoanScenario['ceiling_interest_rate'] = String(
            Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['period_cap']){
          console.log(this.state.firstLoanScenario['period_cap'])
          console.log(this.state.firstLoanScenario["period_cap_percentage"])
          this.state.firstLoanScenario['period_cap'] = String(
            Number(this.state.firstLoanScenario["period_cap"]) / 100
          );
        }
        if(this.state.firstLoanScenario['rate_add']){
          this.state.firstLoanScenario['rate_add'] = String(
            Number(this.state.firstLoanScenario["rate_add"]) / 100
          );
        }

        if(this.state.firstLoanScenario['points']){
          this.state.firstLoanScenario['points'] = String(
            Number(this.state.firstLoanScenario["points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['closing_costs']){
        //   this.state.firstLoanScenario['closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.firstLoanScenario['second_mortgage_interest']){
          this.state.firstLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        
          if(this.state.firstLoanScenario['second_mortgage_points'] ){
            this.state.firstLoanScenario['second_mortgage_points'] = String(
              Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
            );
          }
        
          // if(this.state.firstLoanScenario['second_mortgage_closing_costs']){
          //   this.state.firstLoanScenario['second_mortgage_closing_costs'] = String(
          //     Number(this.state.firstLoanScenario[" "]) / 100
          //   );
          // }
        
          if(this.state.firstLoanScenario['initial_interest_rate']){
            this.state.firstLoanScenario['initial_interest_rate'] = String(
              Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
            );
          }
        
        
        ARMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {
        if(this.state.firstLoanScenario['interest']){
          this.state.firstLoanScenario['interest'] = String(
            Number(this.state.firstLoanScenario["interest"]) / 100
          );
        }
        if(this.state.firstLoanScenario['second_mortgage_interest']){
          this.state.firstLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        if(this.state.firstLoanScenario['points']){
          this.state.firstLoanScenario['points'] = String(
            Number(this.state.firstLoanScenario["points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['closing_costs']){
        //   this.state.firstLoanScenario['closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.firstLoanScenario['second_mortgage_points']){
          this.state.firstLoanScenario['second_mortgage_points'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['second_mortgage_closing_costs']){
        //   this.state.firstLoanScenario['second_mortgage_closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["second_mortgage_closing_costs"]) / 100
        //   );
        // }
        FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {
        if(this.state.firstLoanScenario['ARM1rate']){
          this.state.firstLoanScenario['ARM1rate'] = String(
            Number(this.state.firstLoanScenario["ARM1rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['first_interest_rate_adj_cap']){
          this.state.firstLoanScenario['first_interest_rate_adj_cap'] = String(
            Number(this.state.firstLoanScenario["first_interest_rate_adj_cap"]) / 100
          );
        }
        if(this.state.firstLoanScenario['floor_interest_rate']){
          this.state.firstLoanScenario['floor_interest_rate'] = String(
            Number(this.state.firstLoanScenario["floor_interest_rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['ceiling_interest_rate']){
          this.state.firstLoanScenario['ceiling_interest_rate'] = String(
            Number(this.state.firstLoanScenario["ceiling_interest_rate"]) / 100
          );
        }
        if(this.state.firstLoanScenario['period_cap']){
          console.log(this.state.firstLoanScenario['period_cap'])
          console.log(this.state.firstLoanScenario["period_cap_percentage"])
          this.state.firstLoanScenario['period_cap'] = String(
            Number(this.state.firstLoanScenario["period_cap"]) / 100
          );
        }
        if(this.state.firstLoanScenario['rate_add']){
          this.state.firstLoanScenario['rate_add'] = String(
            Number(this.state.firstLoanScenario["rate_add"]) / 100
          );
        }

        if(this.state.firstLoanScenario['points']){
          this.state.firstLoanScenario['points'] = String(
            Number(this.state.firstLoanScenario["points"]) / 100
          );
        }
        // if(this.state.firstLoanScenario['closing_costs']){
        //   this.state.firstLoanScenario['closing_costs'] = String(
        //     Number(this.state.firstLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.firstLoanScenario['second_mortgage_interest']){
          this.state.firstLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.firstLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        
          if(this.state.firstLoanScenario['second_mortgage_points'] ){
            this.state.firstLoanScenario['second_mortgage_points'] = String(
              Number(this.state.firstLoanScenario["second_mortgage_points"]) / 100
            );
          }
        
          // if(this.state.firstLoanScenario['second_mortgage_closing_costs']){
          //   this.state.firstLoanScenario['second_mortgage_closing_costs'] = String(
          //     Number(this.state.firstLoanScenario[" "]) / 100
          //   );
          // }
        
          if(this.state.firstLoanScenario['initial_interest_rate']){
            this.state.firstLoanScenario['initial_interest_rate'] = String(
              Number(this.state.firstLoanScenario["initial_interest_rate"]) / 100
            );
          }
        ARMMortgageCreateFirst(this.state.firstLoanScenario);
      }
      this.setState({ onClick: !this.state.onClick });
    } else {
      NotificationManager.error("Please Validate Fields", "Error");
    }
    
  };
  handleSubmit = () => {
    const { FRMMortgageCreateFirst, ARMMortgageCreateFirst,FRMMortgageCreateSecond,ARMMortgageCreateSecond } = this.props;
    if (
        (this.state.secondLoanScenario.secondloanarmvalidationerror === 0 ||
        this.state.SecondloanscenarioValidationErrors === 0)
    ) {
      if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 1
      ) {

        if(this.state.secondLoanScenario['interest']){
          this.state.secondLoanScenario['interest'] = String(
            Number(this.state.secondLoanScenario["interest"]) / 100
          );
        }
        if(this.state.secondLoanScenario['second_mortgage_interest']){
          this.state.secondLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        if(this.state.secondLoanScenario['points']){
          this.state.secondLoanScenario['points'] = String(
            Number(this.state.secondLoanScenario["points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['closing_costs']){
        //   this.state.secondLoanScenario['closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.secondLoanScenario['second_mortgage_points']){
          this.state.secondLoanScenario['second_mortgage_points'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['second_mortgage_closing_costs']){
        //   this.state.secondLoanScenario['second_mortgage_closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["second_mortgage_closing_costs"]) / 100
        //   );
        // }



      

        FRMMortgageCreateSecond(this.state.secondLoanScenario);
      } else if (
        this.state.radioValue &&
        this.state.secondLoanScenario.mortgage_program_type_value === 2
      ) {


        if(this.state.secondLoanScenario['ARM2rate']){
          this.state.secondLoanScenario['ARM2rate'] = String(
            Number(this.state.secondLoanScenario["ARM2rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['first_interest_rate_adj_cap']){
          this.state.secondLoanScenario['first_interest_rate_adj_cap'] = String(
            Number(this.state.secondLoanScenario["first_interest_rate_adj_cap"]) / 100
          );
        }
        if(this.state.secondLoanScenario['floor_interest_rate']){
          this.state.secondLoanScenario['floor_interest_rate'] = String(
            Number(this.state.secondLoanScenario["floor_interest_rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['ceiling_interest_rate']){
          this.state.secondLoanScenario['ceiling_interest_rate'] = String(
            Number(this.state.secondLoanScenario["ceiling_interest_rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['period_cap']){
        
          console.log(this.state.secondLoanScenario['period_cap'])
          console.log(this.state.secondLoanScenario["period_cap_percentage"])
          this.state.secondLoanScenario['period_cap'] = String(
            Number(this.state.secondLoanScenario["period_cap"]) / 100
          );
         
        }
        if(this.state.secondLoanScenario['rate_add']){
          this.state.secondLoanScenario['rate_add'] = String(
            Number(this.state.secondLoanScenario["rate_add"]) / 100
          );
        }

        if(this.state.secondLoanScenario['points']){
          this.state.secondLoanScenario['points'] = String(
            Number(this.state.secondLoanScenario["points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['closing_costs']){
        //   this.state.secondLoanScenario['closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.secondLoanScenario['second_mortgage_interest']){
          this.state.secondLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        
          if(this.state.secondLoanScenario['second_mortgage_points'] ){
            this.state.secondLoanScenario['second_mortgage_points'] = String(
              Number(this.state.secondLoanScenario["second_mortgage_points"]) / 100
            );
          }
        
          // if(this.state.secondLoanScenario['second_mortgage_closing_costs']){
          //   this.state.secondLoanScenario['second_mortgage_closing_costs'] = String(
          //     Number(this.state.secondLoanScenario[" "]) / 100
          //   );
          // }
        
          if(this.state.secondLoanScenario['initial_interest_rate']){
            this.state.secondLoanScenario['initial_interest_rate'] = String(
              Number(this.state.secondLoanScenario["initial_interest_rate"]) / 100
            );
          }
        
        ARMMortgageCreateSecond(this.state.secondLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 1
      ) {
        if(this.state.secondLoanScenario['interest']){
          this.state.secondLoanScenario['interest'] = String(
            Number(this.state.secondLoanScenario["interest"]) / 100
          );
        }
        if(this.state.secondLoanScenario['second_mortgage_interest']){
          this.state.secondLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        if(this.state.secondLoanScenario['points']){
          this.state.secondLoanScenario['points'] = String(
            Number(this.state.secondLoanScenario["points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['closing_costs']){
        //   this.state.secondLoanScenario['closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.secondLoanScenario['second_mortgage_points']){
          this.state.secondLoanScenario['second_mortgage_points'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['second_mortgage_closing_costs']){
        //   this.state.secondLoanScenario['second_mortgage_closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["second_mortgage_closing_costs"]) / 100
        //   );
        // }

        
        FRMMortgageCreateFirst(this.state.firstLoanScenario);
      } else if (
        !this.state.radioValue &&
        this.state.firstLoanScenario.mortgage_program_type_value === 2
      ) {
        if(this.state.secondLoanScenario['ARM2rate']){
          this.state.secondLoanScenario['ARM2rate'] = String(
            Number(this.state.secondLoanScenario["ARM2rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['first_interest_rate_adj_cap']){
          this.state.secondLoanScenario['first_interest_rate_adj_cap'] = String(
            Number(this.state.secondLoanScenario["first_interest_rate_adj_cap"]) / 100
          );
        }
        if(this.state.secondLoanScenario['floor_interest_rate']){
          this.state.secondLoanScenario['floor_interest_rate'] = String(
            Number(this.state.secondLoanScenario["floor_interest_rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['ceiling_interest_rate']){
          this.state.secondLoanScenario['ceiling_interest_rate'] = String(
            Number(this.state.secondLoanScenario["ceiling_interest_rate"]) / 100
          );
        }
        if(this.state.secondLoanScenario['period_cap']){
          console.log(this.state.firstLoanScenario['period_cap'])
          console.log(this.state.firstLoanScenario["period_cap_percentage"])
          this.state.secondLoanScenario['period_cap'] = String(
            Number(this.state.secondLoanScenario["period_cap"]) / 100
          );
        }
        if(this.state.secondLoanScenario['rate_add']){
          this.state.secondLoanScenario['rate_add'] = String(
            Number(this.state.secondLoanScenario["rate_add"]) / 100
          );
        }

        if(this.state.secondLoanScenario['points']){
          this.state.secondLoanScenario['points'] = String(
            Number(this.state.secondLoanScenario["points"]) / 100
          );
        }
        // if(this.state.secondLoanScenario['closing_costs']){
        //   this.state.secondLoanScenario['closing_costs'] = String(
        //     Number(this.state.secondLoanScenario["closing_costs"]) / 100
        //   );
        // }
        if(this.state.secondLoanScenario['second_mortgage_interest']){
          this.state.secondLoanScenario['second_mortgage_interest'] = String(
            Number(this.state.secondLoanScenario["second_mortgage_interest"]) / 100
          );
        }
        
          if(this.state.secondLoanScenario['second_mortgage_points'] ){
            this.state.secondLoanScenario['second_mortgage_points'] = String(
              Number(this.state.secondLoanScenario["second_mortgage_points"]) / 100
            );
          }
        
          // if(this.state.secondLoanScenario['second_mortgage_closing_costs']){
          //   this.state.secondLoanScenario['second_mortgage_closing_costs'] = String(
          //     Number(this.state.secondLoanScenario[" "]) / 100
          //   );
          // }
        
          if(this.state.secondLoanScenario['initial_interest_rate']){
            this.state.secondLoanScenario['initial_interest_rate'] = String(
              Number(this.state.secondLoanScenario["initial_interest_rate"]) / 100
            );
          }
        
        ARMMortgageCreateFirst(this.state.firstLoanScenario);
      }
      this.props.handleContinue();
    } else {
      NotificationManager.error("Please Validate Fields", "Error");
    }
  };
  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  onRadioChange = async (e) => {
    await this.setState({
      radioValue: !this.state.radioValue,
      openModal: !this.state.openModal,
    });
    this.props.selectLoanScenario(this.state.radioValue)
  };
  remainOnSamePage = () => {
    this.setState({
      radioValue: false,
      onClick: false,
      openModal: false,
    });
  };
  componentDidMount() {}
  render() {
    const showSelectLoanScenarioModule = ( 
      <div>
        <MDBModal
          isOpen={this.state.openModal}
          toggle={this.toggle}
          backdrop={true}
          keyboard={false}
          disableBackdrop={true}
          size="small"
          centered
        >
          <MDBModalHeader toggle={this.toggle}>
           <div><h4>Select Loan Choices</h4></div>
          </MDBModalHeader>
    
          <MDBModalBody>
            <p>You have the option to model two loan scenarios. This allows you to<br></br>
            compare different loan Programs you may be evaluating.</p>
            <p className="">Do you want to model two loan scenarios?</p>
           
            <Radio.Group
              defaultValue={false}
              onChange={this.onRadioChange}
              value={this.state.radioValue}
              className="text-center"
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </MDBModalBody>
         
          <MDBModalFooter className="button-center">
          {!this.state.radioValue ? (
            
            <Button size="medium" className="btn btn-primary btn-sm waves-effect waves-light" onClick={this.remainOnSamePage}>
              Continue
            </Button>
          
          ) : null}
          </MDBModalFooter>
    
        </MDBModal>
      </div>
    );

    return (
      <Fragment>
        {this.state.openModal ? (
          showSelectLoanScenarioModule
        ) : (
          <div>
            {!this.state.onClick ? (
              <FirstLoanScenario
                downpayment={this.props.downpayment}
                handleFirstloanMortgageInfo={this.handleFirstloanMortgageInfo}
                getValidationError={this.getFirstloanScenarioValidationError}
                {...this.props}
                {...this.state}
              />
            ) : (
              <SecondLoanScenario
                downpayment={this.props.downpayment}
                handleSecondloanMortgageInfo={this.handleSecondloanMortgageInfo}
                getValidationError={this.getSecondloanScenarioValidationError}
                {...this.props}
                {...this.state}
              />
            )}

            {!this.state.onClick && this.state.radioValue === true ? (
              <MDBRow className="margin20 text-center">
                <MDBCol md="12">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className="button-inner-class"
                    size="large"
                  >
                    Second Loan Scenario
                  </Button>
                </MDBCol>
              </MDBRow>
            ) : (
              <div>
                <MDBRow className="margin20 text-center">
                  <MDBCol md="12">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      className="button-inner-class"
                      size="large"
                    >
                      Continue
                    </Button>
                  </MDBCol>
                </MDBRow>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    FRMMortgageCreateResponseFirst: state.FRMMortgageCreateResponseFirst,
    FRMMortgageCreateResponseSecond: state.FRMMortgageCreateResponseSecond,
    ARMMortgageCreateResponseFirst: state.ARMMortgageCreateResponseFirst,
    ARMMortgageCreateResponseSecond: state.ARMMortgageCreateResponseSecond,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    FRMMortgageCreateFirst: (data) => dispatch(frm_mortgage_create_first(data)),
    ARMMortgageCreateFirst : (data) => dispatch(arm_mortgage_create_first(data)),
    FRMMortgageCreateSecond: (data) => dispatch(frm_mortgage_create_second(data)),
    ARMMortgageCreateSecond : (data) => dispatch(arm_mortgage_create_second(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PropertyMortgageHOC)
);
