import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { withRouter, Redirect } from "react-router-dom";
import store from "../redux/store/index";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Loader from "./loader";
import { Input } from "antd";
import { get_single_property } from "../redux/actions/PropertyListing/index";
import { get_calculator } from "../redux/actions/Calculator/index";
import "../../css/reports.css";
import Axios from "axios";
import { config } from "../config/default";
const { baseURL } = config;

export class ShowDetailedReports extends Component {
  constructor() {
    super();
    this.state = {
      homeScreen: false,
      cheatSheet: false,
      nerdReport: false,
      loading: true,
      propertyCalled: false,
      survey: {},
      personalFinace: {},
      taxes: {},
      disabled: true,
      calculateCalled: false,
      calculateResponse: false,
    };
  }
  goToHomeScreen = () => {
    this.setState({
      homeScreen: !this.state.homeScreen,
    });
  };
  goToCheatSheet = () => {
    this.setState({
      cheatSheet: !this.state.cheatSheet,
    });
  };
  goToNerdReport = () => {
    this.setState({
      nerdReport: !this.state.nerdReport,
    });
  };
  sleep = (milliseconds) => {
    let me = this;
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        me.setState({
          loading: false,
        });
      }, milliseconds);
    });
  };
  wait = async (milliseconds = 3000) => {
    await this.sleep(milliseconds);
  };
  componentWillMount() {
    const data = this.props.GetSingleProperty(
      localStorage.getItem("property_id")
    );
  }
  componentDidMount() {
    this.wait(3000);
    Axios.get(
      `${baseURL}/users/user/${JSON.parse(localStorage.getItem("id"))}`,
      {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((userData) => {
        this.setState({
          personalFinace: userData.data.data["personal_finances"],
          taxes: userData.data.data["taxes"],
        });
      })
      .catch((err) => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.calculateResponse &&
      store.getState().CalculatorResponse &&
      store.getState().CalculatorResponse.success
    ) {
      this.setState({
        disabled: false,
        loading: false,
        calculateResponse: true,
      });
      localStorage.setItem(
        "calculatorResponse",
        JSON.stringify(store.getState().CalculatorResponse.output)
      );
    }
    this.calculateSurvey(prevProps);
  }

  calculateSurvey(prevProps) {
    this.calculateAPI(prevProps);
    if (!this.state.propertyCalled) {
      this.setState({
        propertyCalled: !this.state.propertyCalled,
        loading: !this.state.loading,
      });
      Axios.get(`${baseURL}/survey/get_by_user`, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((surveyData) => {
          //  surveyData.data.data[0]
          this.setState({
            survey: {
              whenbuyhome: Number(surveyData.data.data[0]["when_buy_home"]),
              Homeidentified:
                surveyData.data.data[0]["home_identified"] == true ? "Y" : "N",
              Lenderidentified:
                surveyData.data.data[0]["lender_identified"] == true
                  ? "Y"
                  : "N",
              Realtoridentified:
                surveyData.data.data[0]["realtor_identified"] == true
                  ? "Y"
                  : "N",
              Veteranstatus:
                surveyData.data.data[0]["veteran_status"] == true ? "Y" : "N",
              Firsttimehomebuyer:
                surveyData.data.data[0]["first_time_home_buyer"] == true
                  ? "Y"
                  : "N",
            },
          });
        })
        .catch((err) => {});
    }
  }

  calculateAPI(prevProps) {
    if (
      this.state.survey &&
      this.state.survey["whenbuyhome"] &&
      !this.state.calculateCalled &&
      prevProps.GetSinglePropertyResponse &&
      prevProps.GetSinglePropertyResponse["data"] &&
      prevProps.GetSinglePropertyResponse["data"].length > 0
    ) {
      localStorage.setItem(
        "GetSinglePropertyResponse",
        JSON.stringify(prevProps.GetSinglePropertyResponse["data"][0])
      );
      this.setState({
        calculateCalled: !this.state.calculateCalled,
      });

      const calculatorInputObj = {
        //API Call Remaining
        survey: this.state.survey,
        ref: this.calculateRef(),
        home: this.calculateHome(prevProps),
        screen6: this.calculateScreen6(),
        screen7: this.calculateScreen7(),
        screen8: this.calculateScreen8(prevProps),
        screen9: this.calculateScreen9(prevProps),
        screen10: this.calculateScreen10(prevProps),
        screen11: this.calculateScreen11(prevProps),
        screen12: this.calculateScreen12(prevProps),
      };

      const data = this.props.GetCalculator(calculatorInputObj);
    }
  }

  calculateRef() {
    return {
      inflationrate: 0.02,
    };
  }

  calculateHome(data) {
    return {
      Homeaddress: data.GetSinglePropertyResponse["data"][0].house_address,
      homePrice: Number(
        data.GetSinglePropertyResponse["data"][0].property_price
      ),
      Zipcode: Number(data.GetSinglePropertyResponse["data"][0].house_zip_code),
      Statename: data.GetSinglePropertyResponse["data"][0].house_state,
      durationofstay: Number(
        data.GetSinglePropertyResponse["data"][0].stay_duration
      ),
      Homepricegrowth: Number(
        data.GetSinglePropertyResponse["data"][0].home_price_growth
      ),
      Homesqfootage: Number(
        data.GetSinglePropertyResponse["data"][0].area_of_the_house
      ),
      Homebedrooms: Number(
        data.GetSinglePropertyResponse["data"][0].no_of_bedrooms
      ),
      Homebathrooms: Number(
        data.GetSinglePropertyResponse["data"][0].no_of_bathrooms
      ),
      Propertytax: Number(
        data.GetSinglePropertyResponse["data"][0].annual_property_tax
      ),
      HOI: Number(
        data.GetSinglePropertyResponse["data"][0].home_owner_insurance
      ),
      HOA: Number(
        data.GetSinglePropertyResponse["data"][0]
          .annual_home_owner_association_dues
      ),
      Downpaymentnew: Number(
        data.GetSinglePropertyResponse["data"][0].downpayment_amount
      ),
      Officeaddress: data.GetSinglePropertyResponse["data"][0].office_address,
      OfficeZipcode: data.GetSinglePropertyResponse["data"][0].office_zip_code,
      OfficeStatename:
        data.GetSinglePropertyResponse["data"][0].office_state_name,
    };
  }

  calculateScreen6() {
    if (localStorage.getItem("property-mortgage-info")) {
      const rec_mortgage = JSON.parse(
        localStorage.getItem("property-mortgage-info")
      );
      return {
        Downpaymentamt: rec_mortgage.downPayment
          ? rec_mortgage.downPayment
          : "A",
        //Need to UNDERSTAND
        PMIchoice: "N",
        Loantermchoice: rec_mortgage.mortgageTerm
          ? Number(rec_mortgage.mortgageTerm)
          : 30,
        Interestonlychoice: rec_mortgage.ineterestOnlyFirstMortgage
          ? rec_mortgage.ineterestOnlyFirstMortgage
          : "N",
      };
    } else {
      return {
        Downpaymentamt: "A",
        //Need to UNDERSTAND
        PMIchoice: "N",
        Loantermchoice: 30,
        Interestonlychoice: "N",
      };
    }
  }

  calculateScreen7() {
    return {
      Taxmoduleoption:
        JSON.parse(localStorage.getItem("is_tax_selected")) == false
          ? "N"
          : "Y",
      RvBuymoduleoption:
        JSON.parse(localStorage.getItem("is_rent_vs_buy_selected")) == false
          ? "N"
          : "Y",
    };
  }

  calculateScreen8(data) {
    const personal_finance = JSON.parse(
      localStorage.getItem("personal_finance_array")
    ).marginal_tax_rate;
    return {
      FICOscore: this.state.personalFinace.fico_score_range
        ? this.state.personalFinace.fico_score_range
        : "",
      Federalincome: this.state.personalFinace.federal_income
        ? Number(this.state.personalFinace.federal_income)
        : 0,
      Taxrate: this.state.personalFinace.marginal_tax_rate
        ? Number(this.state.personalFinace.marginal_tax_rate)
        : 0,
      Mtlydebt: this.state.personalFinace.monthly_debt_payments
        ? Number(this.state.personalFinace.monthly_debt_payments)
        : 0,
      FilingStatus: this.state.personalFinace.filling_status
        ? Number(this.state.personalFinace.filling_status)
        : 0,
      Nonhousingoption: this.state.personalFinace.monthly_non_housing_expenses
        ? Number(this.state.personalFinace.monthly_non_housing_expenses)
        : 0,
      Mtlyutilities:
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses &&
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].personal_finances
                .detail_non_housing_expenses.utilities
            )
          : 0,
      Mtlytelinternet:
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses &&
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].personal_finances
                .detail_non_housing_expenses.telephone_internet
            )
          : 0,
      MtlyTE:
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses &&
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].personal_finances
                .detail_non_housing_expenses.travel_entertainment
            )
          : 0,
      Mtlyeducation:
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses &&
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].personal_finances
                .detail_non_housing_expenses.education
            )
          : 0,
      Mtlyotherexpenses:
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses &&
        data.GetSinglePropertyResponse["data"][0].personal_finances
          .detail_non_housing_expenses.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].personal_finances
                .detail_non_housing_expenses.other_expenses
            )
          : 0,
      _Totalnonhousing: this.state.personalFinace.total_non_housing
        ? Number(this.state.personalFinace.total_non_housing)
        : 0,
    };
  }

  calculateScreen9(data) {
    if (
      data.GetSinglePropertyResponse["data"][0].first_frm &&
      data.GetSinglePropertyResponse["data"][0].first_frm.id
    ) {
      let secondmtgpmichoice ;
      if(data.GetSinglePropertyResponse["data"][0].first_frm.pmi){
        console.log("PMI");
        secondmtgpmichoice = 1
      }else if(Number(data.GetSinglePropertyResponse["data"][0].first_frm.loanamountsecond1)){
        console.log("loanamountsecond1");
        secondmtgpmichoice = 2
      }else{
        console.log("ELSE");
        secondmtgpmichoice = 0
      }
      

      return {
        loanchoicefirst1: 1,
        loanchoicefirst1_details: {
          loanamountfirst1: data.GetSinglePropertyResponse["data"][0].first_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.loan_amount
              )
            : 0.0,
          termfirst1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.loan_term
              )
            : 0,
          interestfirst1: data.GetSinglePropertyResponse["data"][0].first_frm
            .interest
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.interest
              )
            : 0.0,
          pointsfirst1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].first_frm.points)
            : 0.0,
          closingcostsfirst1: data.GetSinglePropertyResponse["data"][0]
            .first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .closing_costs
              )
            : 0.0,
          interestonlyfirst1: data.GetSinglePropertyResponse["data"][0]
            .first_frm.id
            ? data.GetSinglePropertyResponse["data"][0].first_frm
                .interest_only_option
            : "N",
          interestonlyfirstterm1: data.GetSinglePropertyResponse["data"][0]
            .first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .interest_only_period
              )
            : 0,
          // secondmtgpmichoice1: data.GetSinglePropertyResponse['data'][0].first_frm.id ? Number(data.GetSinglePropertyResponse['data'][0].first_frm.secondmtgpmichoice1) : 0,
          PMIfirst1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].first_frm.pmi)
            : 0,
          loanamountsecond1: data.GetSinglePropertyResponse["data"][0].first_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .loanamountsecond1
              )
            : 0,
          interestsecond1: data.GetSinglePropertyResponse["data"][0].first_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .second_mortgage_loan_term
              )
            : 0,
          termsecond1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .second_mortgage_interest
              )
            : 0,
          pointssecond1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .second_mortgage_points
              )
            : 0,
          Pmtsecond1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.Pmtsecond1
              )
            : 0,
          closingcostssecond1: data.GetSinglePropertyResponse["data"][0]
            .first_frm.closingcostssecond1
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .second_mortgage_closing_costs
              )
            : 0,
          ARMtype1: data.GetSinglePropertyResponse["data"][0].first_frm
            .select_loan_program
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .select_loan_program
              )
            : 0,
          ARM1rate: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.ARM1rate
              )
            : 0,
          ARMfirstadjin1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .ARMfirstadjin1
              )
            : 0,
          floor1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].first_frm.floor1)
            : 0,
          ceiling1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.ceiling1
              )
            : 0,
          periodicadjcap1: data.GetSinglePropertyResponse["data"][0].first_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm
                  .periodicadjcap1
              )
            : 0,
          rateadd1: data.GetSinglePropertyResponse["data"][0].first_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_frm.rateadd1
              )
            : 0,
          secondmtgpmichoice1: secondmtgpmichoice,
        },
      };
    } else {
      const secondmtgpmichoice = data.GetSinglePropertyResponse["data"][0]
        .first_arm.pmi
        ? 1
        : data.GetSinglePropertyResponse["data"][0].first_arm.loanamountsecond1
        ? 2
        : 0;

      return {
        loanchoicefirst1: 2,
        loanchoicefirst1_details: {
          loanamountfirst1: data.GetSinglePropertyResponse["data"][0].first_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.loan_amount
              )
            : 0.0,
          termfirst1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.loan_term
              )
            : 0,
          interestfirst1: data.GetSinglePropertyResponse["data"][0].first_arm
            .interest
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.interest
              )
            : 0.0,
          pointsfirst1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].first_arm.points)
            : 0.0,
          closingcostsfirst1: data.GetSinglePropertyResponse["data"][0]
            .first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .closing_costs
              )
            : 0.0,
          interestonlyfirst1: data.GetSinglePropertyResponse["data"][0]
            .first_arm.id
            ? data.GetSinglePropertyResponse["data"][0].first_arm
                .interest_only_option
            : "N",
          interestonlyfirstterm1: data.GetSinglePropertyResponse["data"][0]
            .first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .interest_only_period
              )
            : 0,
          // secondmtgpmichoice1: data.GetSinglePropertyResponse['data'][0].first_arm.id ? Number(data.GetSinglePropertyResponse['data'][0].first_arm.secondmtgpmichoice2) : 0,
          PMIfirst1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].first_arm.pmi)
            : 0,
          loanamountsecond1: data.GetSinglePropertyResponse["data"][0].first_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .loanamountsecond1
              )
            : 0,
          interestsecond1: data.GetSinglePropertyResponse["data"][0].first_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .second_mortgage_interest
              )
            : 0,
          termsecond1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .second_mortgage_loan_term
              )
            : 0,
          // pointssecond1: data.GetSinglePropertyResponse['data'][0].first_arm.id ? Number(data.GetSinglePropertyResponse['data'][0].first_arm.second_mortgage_points) : 0,
          pointssecond1: 0,
          Pmtsecond1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.Pmtsecond2
              )
            : 0,
          closingcostssecond1: data.GetSinglePropertyResponse["data"][0]
            .first_arm.closingcostssecond1
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .second_mortgage_closing_costs
              )
            : 0,
          ARMtype1: data.GetSinglePropertyResponse["data"][0].first_arm
            .select_loan_program
            ? data.GetSinglePropertyResponse["data"][0].first_arm
                .select_loan_program
            : 0,
          ARM1rate: data.GetSinglePropertyResponse["data"][0].first_arm
            .initial_interest_rate
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .initial_interest_rate
              )
            : 0,
          ARMfirstadjin1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .ARMfirstadjin2
              )
            : 0,
          floor1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .floor_interest_rate
              )
            : 0,
          ceiling1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm
                  .ceiling_interest_rate
              )
            : 0,
          periodicadjcap1: data.GetSinglePropertyResponse["data"][0].first_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.period_cap
              )
            : 0,
          rateadd1: data.GetSinglePropertyResponse["data"][0].first_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].first_arm.rate_add
              )
            : 0,
          secondmtgpmichoice1: secondmtgpmichoice,
        },
      };
    }
  }

  calculateScreen10(data) {
    if (
      data.GetSinglePropertyResponse["data"][0].second_frm &&
      data.GetSinglePropertyResponse["data"][0].second_frm.id
    ) {
      const secondmtgpmichoice = data.GetSinglePropertyResponse["data"][0]
        .second_frm.pmi
        ? 1
        : data.GetSinglePropertyResponse["data"][0].second_frm.loanamountsecond2
        ? 2
        : 0;
      return {
        loanchoicefirst2: 1,
        loanchoicefirst2_details: {
          loanamountfirst2: data.GetSinglePropertyResponse["data"][0].second_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.loan_amount
              )
            : 0.0,
          termfirst2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.loan_term
              )
            : 0,
          interestfirst2: data.GetSinglePropertyResponse["data"][0].second_frm
            .interest
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.interest
              )
            : 0.0,
          pointsfirst2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.points
              )
            : 0.0,
          closingcostsfirst2: data.GetSinglePropertyResponse["data"][0]
            .second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .closing_costs
              )
            : 0.0,
          interestonlyfirst2: data.GetSinglePropertyResponse["data"][0]
            .second_frm.id
            ? data.GetSinglePropertyResponse["data"][0].second_frm
                .interest_only_option
            : "N",
          interestonlyfirstterm2: data.GetSinglePropertyResponse["data"][0]
            .second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .interest_only_period
              )
            : 0,
          // secondmtgpmichoice2:data.GetSinglePropertyResponse['data'][0].second_frm.id ? Number(data.GetSinglePropertyResponse['data'][0].second_frm.secondmtgpmichoice2) : 0,
          PMIfirst2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].second_frm.pmi)
            : 0,
          loanamountsecond2: data.GetSinglePropertyResponse["data"][0]
            .second_frm.loanamountsecond2
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .loanamountsecond2
              )
            : 0,
          interestsecond2: data.GetSinglePropertyResponse["data"][0].second_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .second_mortgage_loan_term
              )
            : 0,
          termsecond2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .second_mortgage_interest
              )
            : 0,
          // pointssecond2: data.GetSinglePropertyResponse['data'][0].second_frm.id ? Number(data.GetSinglePropertyResponse['data'][0].second_frm.second_mortgage_points) : 0,
          pointssecond2: 0,

          Pmtsecond2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.Pmtsecond2
              )
            : 0,
          closingcostssecond2: data.GetSinglePropertyResponse["data"][0]
            .second_frm.second_mortgage_closing_costs
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .second_mortgage_closing_costs
              )
            : 0,
          ARMtype2: data.GetSinglePropertyResponse["data"][0].second_frm
            .select_loan_program
            ? String(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .select_loan_program
              )
            : 0,
          ARM2rate: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.ARM2rate
              )
            : 0,
          ARMfirstadjin2: data.GetSinglePropertyResponse["data"][0].second_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .ARMfirstadjin2
              )
            : 0,
          floor2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.floor2
              )
            : 0,
          ceiling2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.ceiling2
              )
            : 0,
          periodicadjcap2: data.GetSinglePropertyResponse["data"][0].second_frm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm
                  .periodicadjcap2
              )
            : 0,
          rateadd2: data.GetSinglePropertyResponse["data"][0].second_frm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_frm.rateadd2
              )
            : 0,
          secondmtgpmichoice2: secondmtgpmichoice,
        },
      };
    } else if (
      data.GetSinglePropertyResponse["data"][0].second_arm &&
      data.GetSinglePropertyResponse["data"][0].second_arm.id
    ) {

      const secondmtgpmichoice = data.GetSinglePropertyResponse["data"][0]
        .second_arm.pmi
        ? 1
        : data.GetSinglePropertyResponse["data"][0].second_arm.loanamountsecond2
        ? 2
        : 0;

      return {
        loanchoicefirst2: 2,
        loanchoicefirst2_details: {
          loanamountfirst2: data.GetSinglePropertyResponse["data"][0].second_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.loan_amount
              )
            : 0.0,
          termfirst2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.loan_term
              )
            : 0,
          interestfirst2: data.GetSinglePropertyResponse["data"][0].second_arm
            .interest
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.interest
              )
            : 0.0,
          pointsfirst2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.points
              )
            : 0.0,
          closingcostsfirst2: data.GetSinglePropertyResponse["data"][0]
            .second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .closing_costs
              )
            : 0.0,
          interestonlyfirst2: data.GetSinglePropertyResponse["data"][0]
            .second_arm.id
            ? data.GetSinglePropertyResponse["data"][0].second_arm
                .interest_only_option
            : "N",
          interestonlyfirstterm2: data.GetSinglePropertyResponse["data"][0]
            .second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .interest_only_period
              )
            : 0,
          // secondmtgpmichoice2: data.GetSinglePropertyResponse["data"][0]
          //   .second_arm.id
          //   ? Number(
          //       data.GetSinglePropertyResponse["data"][0].second_arm
          //         .secondmtgpmichoice2
          //     )
          //   : 0,
          PMIfirst2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(data.GetSinglePropertyResponse["data"][0].second_arm.pmi)
            : 0,
          loanamountsecond2: data.GetSinglePropertyResponse["data"][0]
            .second_arm.loanamountsecond2
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .loanamountsecond2
              )
            : 0,
          interestsecond2: data.GetSinglePropertyResponse["data"][0].second_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .second_mortgage_interest
              )
            : 0,
          termsecond2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .second_mortgage_loan_term
              )
            : 0,
          pointssecond2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .second_mortgage_points
              )
            : 0,
          Pmtsecond2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.Pmtsecond2
              )
            : 0,
          closingcostssecond2: data.GetSinglePropertyResponse["data"][0]
            .second_arm.second_mortgage_closing_costs
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .second_mortgage_closing_costs
              )
            : 0,
          ARMtype2: data.GetSinglePropertyResponse["data"][0].second_arm
            .select_loan_program
            ? String(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .select_loan_program
              )
            : 0,
          ARM2rate: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .initial_interest_rate
              )
            : 0,
          ARMfirstadjin2: data.GetSinglePropertyResponse["data"][0].second_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .ARMfirstadjin2
              )
            : 0,
          floor2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .floor_interest_rate
              )
            : 0,
          ceiling2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm
                  .ceiling_interest_rate
              )
            : 0,
          periodicadjcap2: data.GetSinglePropertyResponse["data"][0].second_arm
            .id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.period_cap
              )
            : 0,
          rateadd2: data.GetSinglePropertyResponse["data"][0].second_arm.id
            ? Number(
                data.GetSinglePropertyResponse["data"][0].second_arm.rate_add
              )
            : 0,
          secondmtgpmichoice2: secondmtgpmichoice,
        },
      };
    } else {
      return {
        loanchoicefirst2: 1,
        loanchoicefirst2_details: {
          loanamountfirst2: 0.0,
          termfirst2: 30,
          interestfirst2: 0.0,
          pointsfirst2: 0.0,
          closingcostsfirst2: 0.0,
          interestonlyfirst2: "N",
          interestonlyfirstterm2: 0,
          secondmtgpmichoice2: 0,
          PMIfirst2: 0,
          loanamountsecond2: 0.0,
          interestsecond2: 0,
          termsecond2: 0,
          pointssecond2: 0.0,
          Pmtsecond2: 0,
          closingcostssecond2: 0.0,
          ARMtype2: 0,
          ARM2rate: 0.0,
          ARMfirstadjin2: 0.0,
          floor2: 0.0,
          ceiling2: 0.0,
          periodicadjcap2: 0.0,
          rateadd2: 0.0,
        },
      };
    }
  }

  calculateScreen11(data) {
    return {
      rent:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .current_monthly_rent_payment
            )
          : 0.0,
      //Need to add on DB and UI
      // rentinflation: data.GetSinglePropertyResponse['data'][0].rent_vs_buy && data.GetSinglePropertyResponse['data'][0].rent_vs_buy.id ? data.GetSinglePropertyResponse['data'][0].rent_vs_buy.rentinflation : 0.0,
      rentinflation:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.rentinflation
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .rentinflation
            )
          : 0.0,
      rentinsurance:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .annual_rent_insurance
            )
          : 0.0,
      Taxrate:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .marginal_tax_rate
            )
          : 0.0,
      Investrate:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .rate_of_investment
            )
          : 0.0,
      Taxfiling:
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy &&
        data.GetSinglePropertyResponse["data"][0].rent_vs_buy.id
          ? Number(
              data.GetSinglePropertyResponse["data"][0].rent_vs_buy
                .select_your_filling_status
            )
          : 0.0,
      inflationrate: 0.02,
    };
  }

  calculateScreen12(data) {
    return {
      Detailedtaxexpenses:
        this.state.taxes && this.state.taxes.detailed_tax_expenses ? "Y" : "N",
      Medicalexpenses:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.medical_and_dental_expenses)
          : 0.0,
      Stateorsalestax:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.state_local_generalsales_taxes)
          : 0.0,
      Othertaxes:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.other_taxes)
          : 0.0,
      Investmentinterest:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.tax_deductive_investment_interest)
          : 0.0,
      Charitabledonation:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.tax_deductible_charitable_donations)
          : 0.0,
      CasualtyTheft:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.tax_deductible_casualty_and_theft_losses)
          : 0.0,
      previousbalance:
        this.state.taxes && this.state.taxes.previous_balance ? "Y" : "N",
      Grandfatherdebt:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.avg_loan_balance_for_grandfathered_debt)
          : 0.0,
      Homeacquisitiondebt:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.avg_loan_balance_for_home_acquisition_debt)
          : 0.0,
      _Pub936Line13a:
        this.state.taxes && this.state.taxes.id
          ? Number(this.state.taxes.pub936_line_13a)
          : 0.0,
    };
  }
  render() {
    const { GetSinglePropertyResponse, CalculatorResponse } = this.props;
    if (this.state.homeScreen) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.cheatSheet) {
      return (
        <Redirect
          to={{
            pathname: "/cheatsheet",
            state: {
              singlePropertyResponse: GetSinglePropertyResponse.data[0],
              CalculatorResponse: CalculatorResponse.output,
            },
          }}
        />
      );
    }
    if (this.state.nerdReport) {
      return (
        <Redirect
          to={{
            pathname: "/nerd-report",
            state: {
              singlePropertyResponse: GetSinglePropertyResponse.data[0],
              CalculatorResponse: CalculatorResponse.output,
            },
          }}
        />
      );
    }
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <Fragment>
        <Header type="Report" />
        <MDBContainer className="report-container">
          <Button
            size="medium"
            className="btn btn-primary btn-sm waves-effect waves-light"
            onClick={this.goToHomeScreen}
          >
            Go To Dashboard
          </Button>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="8" size="6" className="text-center">
              <Input
                type="email"
                className="input-class-mdb"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your Email Id to see pdf report"
              />
            </MDBCol>
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="3" size="3">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="button-inner-class"
                onClick={this.goToNextPage}
                fullWidth
              >
                Submit
              </Button>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Cheat Sheet
                      </Typography>
                      <Typography variant="body2" component="p">
                        Affordability range for different loan
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          onClick={this.goToCheatSheet}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Nerd Report
                      </Typography>
                      <Typography variant="body2" component="p">
                        Detailed report of various factors
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center pointer">
                        <MDBIcon
                          icon="angle-right"
                          size="large"
                          onClick={this.goToNerdReport}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          {/* <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Property Report
                      </Typography>
                      <Typography variant="body2" component="p">
                        Details of the mortgage amount and type
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center">
                        <MDBIcon icon="angle-right" size="large" />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Property Comparison
                      </Typography>
                      <Typography variant="body2" component="p">
                        Tax advantage to buying a home
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center">
                        <MDBIcon icon="angle-right" size="large" />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardContent>
                  <MDBRow>
                    <MDBCol md="9" size="10">
                      <Typography variant="h5" component="h2">
                        Offers
                      </Typography>
                      <Typography variant="body2" component="p">
                        Equility in the house or house price
                      </Typography>
                    </MDBCol>
                    <MDBCol md="2" size="2">
                      <div className="text-center">
                        <MDBIcon icon="angle-right" size="large" />
                      </div>
                    </MDBCol>
                  </MDBRow>
                </CardContent>
              </Card>
            </MDBCol>
          </MDBRow> */}
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GetSinglePropertyResponse: state.GetSinglePropertyResponse,
    CalculatorResponse: state.CalculatorResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetSingleProperty: (id) => dispatch(get_single_property(id)),
    GetCalculator: (data) => dispatch(get_calculator(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowDetailedReports)
);
