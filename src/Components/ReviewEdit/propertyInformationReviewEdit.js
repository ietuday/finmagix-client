import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Header from "../../common/header";
import { Button } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import "../../css/reviewEdit.css";
import { get_property_info } from "../redux/actions/PropertyReport/propertyInfo";
import quss from "../../assets/images/que.png";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NumberFormat from "react-number-format";
export class PropertyInformationReviewEdit extends Component {
  constructor() {
    super();
    this.state = {
      goToEdit: false,
    };
  }
  componentDidMount() {
    
    const { GetPropertyinfo, PropertyInfoCreateResponse } = this.props;
    
    if(PropertyInfoCreateResponse && PropertyInfoCreateResponse.data){

      GetPropertyinfo(localStorage.getItem('property_id'));
    }else{
      GetPropertyinfo(localStorage.getItem('property_id'))
    }
  }
  goToEdit = () => {
    this.setState({
      goToEdit: !this.state.goToEdit,
    });
  };
  render() {
    const { GetPropertyinfoData } = this.props;
    if (this.state.goToEdit) {
      return (
        <Redirect
          to={{
            pathname: "/property-form-edit",
            state: {
              property_id: 0,
              property_info_edit_id: this.props.location.getId,
            },
          }}
        />
      );
    }
    return (
      <Fragment>
        <Header type="Edit your inputs" />
        <MDBContainer className="review-edit-container">
          <MDBRow className="margin20">
            <Button
              className="back-arrow"
              size="large"
              onClick={() =>
                this.props.history.push({
                  pathname: "/property-form",
                  returnBackFromreviewEdit: true,
                })
              }
            >
               <ArrowBackIosIcon />
            </Button>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="12" className="text-left">
              <h4 className="summary-title">Property Information</h4>
            </MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="5" size="5">
              <div className="">
                <span className="get-started-label">House Address</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="5" size="5">
              <div className="get-started-label text-left">
                {GetPropertyinfoData ? GetPropertyinfoData.house_address : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">House state</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                {GetPropertyinfoData ? GetPropertyinfoData.house_state : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">House zip code</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                {GetPropertyinfoData
                  ? GetPropertyinfoData.house_zip_code
                  : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Property Price</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
              <NumberFormat value= {GetPropertyinfoData
                  ? GetPropertyinfoData.property_price
                  : null} displayType={'text'} thousandSeparator={true} />
               
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Downpayment Amount</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">Money you intend to pay i.s. 
            difference between the purchase price and loan amount.</span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
              <NumberFormat value=  {GetPropertyinfoData
                  ? GetPropertyinfoData.downpayment_amount
                  : null} displayType={'text'} thousandSeparator={true} />
               
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Stay Duration</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                {GetPropertyinfoData ? GetPropertyinfoData.stay_duration : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">No.of Bedrooms</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                {GetPropertyinfoData
                  ? GetPropertyinfoData.no_of_bedrooms
                  : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">No.of Bathrooms</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                {GetPropertyinfoData
                  ? GetPropertyinfoData.no_of_bathrooms
                  : null}
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Area of the House</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
              
                 <NumberFormat value={GetPropertyinfoData
                  ? GetPropertyinfoData.area_of_the_house
                  : null} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Annual Property Tax</span>
                <div className="tooltip-img"><img src={quss} className="tool-img" alt="" />
            <span className="tooltip-img-text">The annual property tax in number not %. 
            Typically these range between 1-2% of the home price. </span>
            </div>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
                <NumberFormat value={GetPropertyinfoData
                  ? GetPropertyinfoData.annual_property_tax
                  : null}   displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">
                  Annual home owner association dues
                </span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
              
                <NumberFormat value={GetPropertyinfoData
                  ? GetPropertyinfoData.annual_home_owner_association_dues
                  : null} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20">
            <MDBCol md="1" size="1"></MDBCol>
            <MDBCol md="6" size="6">
              <div className="">
                <span className="get-started-label">Home Owner Insurance</span>
              </div>
            </MDBCol>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <MDBCol md="3" size="3">
              <div className="get-started-label text-left">
            
                 <NumberFormat value={GetPropertyinfoData
                  ? GetPropertyinfoData.home_owner_insurance
                  : null} displayType={'text'} thousandSeparator={true} />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12" className="text-left">
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={this.goToEdit}
                className="button-inner-class"
                fullWidth
              >
                Edit
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GetPropertyinfoData: state.getPropertyinfoData,
    PropertyInfoCreateResponse: state.PropertyInfoCreateResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetPropertyinfo: (id) => dispatch(get_property_info(id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PropertyInformationReviewEdit)
);
