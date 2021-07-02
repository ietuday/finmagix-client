import React from "react";

import SplashScreen from "./Components/splashScreen/splashScreen";
import GetStarted from "./Components/GetStarted/getStarted";
import Signup from "./Components/signup";
import Signin from "./Components/signin";
import SelectModule from "./Components/selectModule";
import { NotificationContainer } from "react-notifications";
import "./App.css";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import PrivateRoute from "../src/routes/privateRoute";
import PublicRoute from "../src/routes/publicRoute";
import PropertyFormWizard from "./Components/PropertyFormWizard/index";
import PropertyFormWizardEdit from "./Components/PropertyFormWizardEdit/index";
import RentvsBuy from "./Components/PropertyFormWizard/rentvsBuy";
import PropertyInformationReviewEdit from "../src/Components/ReviewEdit/propertyInformationReviewEdit"
import PersonalFinanceReviewEdit from "./Components/ReviewEdit/personalFinanceReviewEdit";
import MortgageProgramReviewEdit from "./Components/ReviewEdit/mortgageProgramReviewEdit";
import RentvsBuyReviewEdit from "./Components/ReviewEdit/rentvsBuyReviewEdit";
import TaxReviewEdit from "./Components/ReviewEdit/taxReviewEdit";
import Dashboard from "./Components/dashboard";
import ShowDetailedReports from "../src/Components/reports/showDetailedReports";
import AddProperty from "../src/Components/AddProperty/addProperty";
import CheatSheet from "../src/Components/reports/cheatSheet";
import NerdReport from "../src/Components/reports/nerdReport";
import Survey from "../src/Components/PropertyFormWizard/Survey";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import PropertyAndPersonalFinanceInfo from "./Components/nerdReportDetails/PropertyAndPersonalFinanceInfo";
import MortgageSummary from "./Components/nerdReportDetails/MortgageSummary";
import HomeAffordability from "./Components/nerdReportDetails/HomeAffordability";
import TaxSummary from "./Components/nerdReportDetails/TaxSummary";
import AmortizationTableFRM from "./Components/nerdReportDetails/AmortizationTableFRM";
import RentBuySummary from "./Components/nerdReportDetails/RentBuySummary";
import EquityProjection from "./Components/nerdReportDetails/EquityProjection";
import PostMortgagePurchaseProfile from "./Components/nerdReportDetails/PostMortgagePurchaseProfile";
import ForgotPassword from "./Components/ForgotPassword";
import CreatePassword from "./Components/createPassword";
import Geocode from "./common/geocode"
import { logout } from './routes/utils';
import { NotificationManager } from "react-notifications";

const axios = require('axios');

function App() {
  return (
    <React.Fragment>
    {axios.interceptors.response.use(
      (successRes)=>  {
        console.log(successRes)
        // ... modify response; 
        // return successRes;
      }, 
      (error) =>  {
        console.log("####################",error.response.status)
        if(error.response.status == 401){
          console.log("Unauthorized");
          logout();
          NotificationManager.error('error', 'Token Expired', 3000)
          window.location.reload(); 
        }
        // ... return Promise.reject(error);
      }
      )}
      <Router>
        <Switch>
        <PublicRoute
            restricted={false}
            component={Geocode}
            path="/geo"
            exact
          />
          <PublicRoute
            restricted={true}
            component={SplashScreen}
            path="/"
            exact
          />
          <PublicRoute
            restricted={false}
            component={GetStarted}
            path="/get-started"
            exact
          />
          <PublicRoute component={ForgotPassword} path="/forgotpassword" exact />
          <PublicRoute component={CreatePassword} path="/create-password/:token" exact />

          <PublicRoute restricted={true} component={Signin} path="/signin" exact />
          <PublicRoute restricted={true} component={Signup} path="/signup" exact />
          <PrivateRoute component={SelectModule} path="/select-modules" exact />
          <PrivateRoute
            component={PropertyFormWizard}
            path="/property-form"
            exact
          />
           <PrivateRoute
            component={PropertyFormWizardEdit}
            path="/property-form-edit"
            exact
          />
          <PrivateRoute
            component={Survey}
            path="/survey"
            exact
          />
          
          <PrivateRoute component={RentvsBuy} path="/rent-vs-buy" exact />
          <PrivateRoute
            component={PropertyInformationReviewEdit}
            path="/property-information-review-edit"
            exact
          />
          <PrivateRoute
            component={PersonalFinanceReviewEdit}
            path="/personalfinance-review-edit"
            exact
          />

           <PrivateRoute
            component={RentBuySummary}
            path="/rentbuy-summary"
            exact
          />  

           <PrivateRoute
            component={MortgageProgramReviewEdit}
            path="/mortgage-programs-review-edit"
            exact
          />
           <PrivateRoute
            component={RentvsBuyReviewEdit}
            path="/rent-vs-buy-review-edit"
            exact
          />
           <PrivateRoute
            component={TaxReviewEdit}
            path="/taxes-review-edit"
            exact
          />
           <PrivateRoute
            component={Dashboard}
            path="/dashboard"
            exact
          />
           <PrivateRoute
            component={ShowDetailedReports}
            path="/show-detailed-reports"
            exact
          />
          <PrivateRoute
            component={PropertyAndPersonalFinanceInfo}
            path="/property-finance-info"
            exact
          />
          <PrivateRoute
            component={MortgageSummary}
            path="/mortgage-summary" 
            exact
          />
           <PrivateRoute
            component={HomeAffordability}
            path="/home-affordability" 
            exact
          />
           <PrivateRoute
            component={TaxSummary}
            path="/tax-summary" 
            exact
          />
          <PrivateRoute
            component={EquityProjection}
            path="/equity-projection" 
            exact
          />
          
           <PrivateRoute
            component={AmortizationTableFRM}
            path="/amortization-table-frm" 
            exact
          />
          <PrivateRoute
            component={PostMortgagePurchaseProfile}
            path="/post-mortgage-profile" 
            exact
          />
 

           <PrivateRoute
            component={AddProperty}
            path="/add-property"
            exact
          />
           <PrivateRoute
            component={CheatSheet}
            path="/cheatsheet"
            exact
          />
          <PrivateRoute
            component={NerdReport}
            path="/nerd-report"
            exact
          />
        </Switch>
      </Router>
      <NotificationContainer />
    </React.Fragment>
  );
}

export default App;
