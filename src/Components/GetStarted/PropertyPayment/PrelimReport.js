import React, { Component, Fragment } from "react";
import {MDBRow, MDBCol } from "mdbreact";
import { NotificationManager } from "react-notifications";
import { Redirect,Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { get_prelim_report } from "../../redux/actions/prelimReport";
import SHA256 from "crypto-js/sha256";
import {
  sign_up,
  // sign_up_google,
} from '../../../Components/redux/actions/signinSignup.js/index';

export class PrelimReport extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
    };
  }

  componentDidMount() {
    const { GetPrelimReport } = this.props;
    var mortgageObject = localStorage.getItem("property-mortgage-info");
    var dataObject = {
      Downpaymentamt: JSON.parse(mortgageObject).downPayment,
      PMIchoice: JSON.parse(mortgageObject).Pmi,
      Loantermchoice: JSON.parse(mortgageObject).mortgageTerm,
      Interestonlychoice: JSON.parse(mortgageObject).ineterestOnlyFirstMortgage,
      durationofstay: Number(JSON.parse(mortgageObject).houseDuration),
    };
    GetPrelimReport(dataObject);
  }

  signUpGoogleFacebbok(res, type) {
    const { SignUp } = this.props;
    let response;
    if (type === "google") {
      response = {
        name: SHA256(JSON.stringify(res.profileObj.name)).toString(),
        email: SHA256(JSON.stringify(res.profileObj.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    } else if (type === "facebook") {
      response = {
        name: SHA256(JSON.stringify(res.name)).toString(),
        email: SHA256(JSON.stringify(res.email)).toString(),
        password: SHA256(JSON.stringify("12345678")).toString(),
      };
    }
    if (response) {
      SignUp(response, this.onSuccess, this.onFailure);
    }
  }

  onSuccess = () => {
    // this.props.history("/signin");
    NotificationManager.success(
      "User Created Successfully ..!!",
      "Success",
      3000
    );
  };
  onFailure = (message) => {
    NotificationManager.error("data already exists", "error", 3000);
  };
  goToSignup = () => {
    this.setState({
      signup: !this.state.signup,
    });
  };
  render() {
    const { PrelimReportResponse } = this.props;
    if (this.state.signup) {
      return <Redirect to="/signup" />;
    }
    const responseFacebook = (response) => {
      this.signUpGoogleFacebbok(response, "facebook");
    };
    const responseGoogle = (response) => {
      this.signUpGoogleFacebbok(response, "google");
    };
    return (
      <Fragment>
        <MDBRow className="prelim-report-row ">
          <MDBCol md="12" className="text-center">
            <h4 style={{color:'white'}}>Preliminary Report</h4>
            <p>Monthly</p>
            <h2 style={{color:'white'}}>
              {PrelimReportResponse
                ? PrelimReportResponse.recommended_mortagage
                : "No Data"}
            </h2>
           
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12" className="text-center">
            <h4>
              Sign up to get a complete financial review of your home purchase
              customized to your needs
            </h4>
            {/* <p className="link">(Click here for sample report)</p> */}
            <br />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.goToSignup}
              className="button-inner-class"
              fullWidth
            >
              Sign Up
            </Button>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12" className="text-center">
            <span className="get-started-label">Or sign up with</span>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="6" size="6" className="text-center">
            <GoogleLogin
              clientId="1058447115595-ukhhmegumqrk5766437i00qolisqhgqv.apps.googleusercontent.com"
              buttonText="Google"
              className="google-button"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </MDBCol>
          <MDBCol md="6" size="6" className="text-center">
            {/* <FacebookLogin
              appId="969146693516388"
              fields="name,email,picture"
              scope="public_profile,user_friends"
              textButton="     Facebook"
              cssClass="facebook-button"
              callback={responseFacebook}
              icon="fa fab fa-facebook-square"
            />
            
            */}

              <FacebookLogin
                appId="354525859322257"
                fields="name,email,picture"
                scope="public_profile,user_friends"
                textButton="     Facebook"
                cssClass="facebook-button"
                callback={responseFacebook}
                icon="fab fa-facebook-square"
              />
          </MDBCol>
    
        </MDBRow>
        <MDBRow className="margin20 signuplastsentence text-center">
          <MDBCol md="12" className="text-center">
            <span className="sign-up-small-label">
            Already have an account? <Link to="/signin">Sign In</Link>
            </span>
          </MDBCol>
        </MDBRow>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PrelimReportResponse: state.prelimReportResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetPrelimReport: (data) => dispatch(get_prelim_report(data)),
    SignUp: (data, onSuccess, onFailure) =>
      dispatch(sign_up(data, onSuccess, onFailure)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PrelimReport);
