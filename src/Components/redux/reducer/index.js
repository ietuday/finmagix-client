import { combineReducers } from "redux";
import { sign_in, sign_up} from "../reducer/SigninSignupReducer.js";
import { sign_up_google } from "../actions/signinSignup.js/index.js";
import { get_prelim_report } from "../reducer/prelimReportReducer"
import { LOG_OUT } from "../actions/action-types.js";
import { personal_finance_create,update_detail_expense,get_personal_finance_data,get_detail_expense,detail_expense_create, personal_finance_update} from "../reducer/propertyReportReducer";
import { rent_vs_buy_create ,get_rent_vs_buy_data,rent_vs_buy_update} from "../reducer/propertyReportReducer";
import { tax_create,get_tax_data, tax_update } from "../reducer/propertyReportReducer";
import { get_property_listing ,get_single_property } from "../reducer/propertyListingReducer";
import { property_info_create,get_property_info, property_info_update,survey_create } from "../reducer/propertyReportReducer";
import { frm_mortgage_create_first, arm_mortgage_create_first, frm_mortgage_get_first, arm_mortgage_get_first,
   frm_mortgage_update_first, arm_mortgage_update_first,
   frm_mortgage_create_second, arm_mortgage_create_second, frm_mortgage_get_second, arm_mortgage_get_second,
   frm_mortgage_update_second, arm_mortgage_update_second } from "../reducer/propertyReportReducer";
import {get_calculator} from "../reducer/CalculatorReducer";

const finmagixReducer = combineReducers({
  signinData: sign_in,
  signupData: sign_up,
  googlesignupdata : sign_up_google,
  prelimReportResponse : get_prelim_report,
  PersonalFinanceCreateResponse : personal_finance_create,
  DetailExpenseCreateResponse : detail_expense_create, 
  UpdateDetailExpenseResponse : update_detail_expense,
  PersonalFinanceUpdateResponse : personal_finance_update,
  RentvsBuyCreateResponse : rent_vs_buy_create,
  RentvsBuyUpdateResponse : rent_vs_buy_update,
  RentvsBuyGetData : get_rent_vs_buy_data,
  TaxCreateResponse : tax_create,
  TaxUpdateResponse : tax_update,
  TaxGetResponse : get_tax_data,
  GetDetailExpenseResponse : get_detail_expense,
  getPersonalFinanceData : get_personal_finance_data,
  propertyListResponse : get_property_listing,
  PropertyInfoCreateResponse : property_info_create,
  PropertyInfoUpdateResponse : property_info_update,
  getPropertyinfoData : get_property_info,
  FRMMortgageCreateResponseFirst : frm_mortgage_create_first,
  FRMMortgageUpdateResponseFirst : frm_mortgage_update_first,
  ARMMortgageCreateResponseFirst : arm_mortgage_create_first,
  ARMMortgageUpdateResponseFirst : arm_mortgage_update_first,
  FRMMortgageGetResponseFirst : frm_mortgage_get_first,
  ARMMortgageGetResponseFirst : arm_mortgage_get_first,
  FRMMortgageCreateResponseSecond : frm_mortgage_create_second,
  FRMMortgageUpdateResponseSecond : frm_mortgage_update_second,
  ARMMortgageCreateResponseSecond : arm_mortgage_create_second,
  ARMMortgageUpdateResponseSecond : arm_mortgage_update_second,
  FRMMortgageGetResponseSecond : frm_mortgage_get_second,
  ARMMortgageGetResponseSecond : arm_mortgage_get_second,
 SurveyCreateResponse : survey_create,
 GetSinglePropertyResponse : get_single_property,
 CalculatorResponse : get_calculator
  
});

const mainReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return finmagixReducer(state, action)
}

export default mainReducer;
