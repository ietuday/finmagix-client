import React, { Component, Fragment } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { Button } from "@material-ui/core";
import NumberFormat from "react-number-format";
import Header from "../common/header";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import { NotificationManager } from "react-notifications";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import {
  get_property_listing,
  get_single_property,
} from "../Components/redux/actions/PropertyListing/index";
import "../css/dashboard.css";
import { MDBIcon } from "mdbreact";
import Axios from "axios";
import { config } from "./config/default";
const { baseURL } = config;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showReports: false,
      isRentvsBuyFilled: props.isRentvsBuyFilled,
      isTaxFilled: props.isTaxFilled,
      nextButton: false,
      reportButton: false,
      propertyEdit: false,
      singleid: "",
      modal: false,
      deleteItem: 0,
    };
    this.goToReportScreen = this.goToReportScreen.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.toggle = this.toggle.bind(this);
    this.cleanPreviousPropertyDetail()
  }
  cleanPreviousPropertyDetail(){
    if(localStorage.getItem('addressData')) localStorage.removeItem('addressData')
    if(localStorage.getItem('GetSinglePropertyResponse'))localStorage.removeItem('GetSinglePropertyResponse')
    if(localStorage.getItem('calculatorResponse'))localStorage.removeItem('calculatorResponse')
    if(localStorage.getItem('property_id'))localStorage.removeItem('property_id')
    
  }
  toggle = (item) => {
    if (item && item.id) {
      this.setState({
        deleteItem: item.id,
      });
    }
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleDelete = (data) => {
    if (data ===   "Yes") {
      //127.0.0.1:8000/property_listings/737
       Axios.delete(
        `${baseURL}/property_listings/${this.state.deleteItem}`,
        {
          headers: {
            "Content-type": "Application/json",
            Authorization: `JWT ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((userData) => {
          this.setState({
            deleteItem: 0,
          });
          const { GetPropertyListing } = this.props;

          GetPropertyListing();
          NotificationManager.success("Deleted Succesfully", "Property", 3000);
          this.toggle();
        })
        .catch((err) => {
          NotificationManager.error("Error", "Error", 3000);
          this.toggle();
        });
    } else {
      this.toggle();
    }
  };

  handleEdit = (data) => {
    this.setState({
      propertyEdit: !this.state.propertyEdit,
      singleid: data.id,
    });
  };

  goToNextPage = () => {
    this.setState({
      nextButton: !this.state.nextButton,
    });
  };
  goToReportScreen(data) {
    // const { GetSingleProperty } = this.props;
    this.setState({
      reportButton: !this.state.reportButton,
      singleid: data.id,
    });
  }

  componentWillMount() {
    const { GetPropertyListing } = this.props;

    GetPropertyListing();
  }

  componentDidMount() {}
  render() {
    const {
      PropertyListResponse,
    } = this.props;
    if (this.state.nextButton) {
      return <Redirect to="/select-modules" />;
    }
    if (this.state.reportButton) {
      localStorage.setItem("property_id", this.state.singleid);
      return (
        <Redirect
          to={{
            pathname: "/show-detailed-reports",
            state: { propertyId: this.state.singleid },
          }}
        />
      );
    }

    if (this.state.propertyEdit) {
      localStorage.setItem("property_id", this.state.singleid);
      return (
        <Redirect
          to={{
            pathname: "/property-form",
            returnBackFromreviewEdit: true,
            state: { propertyId: this.state.singleid },
          }}
        />
      );
    }
    return (
      <Fragment>
        <CssBaseline />
        <Header type="dashboard" />
        <MDBContainer className="dashboard-container">
          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <img
                src={require("../assets/images/dashboard-cover-pic.png")}
                alt="finmagix"
                className="dashboard-cover-img"
              />
            </MDBCol>
          </MDBRow>
          <div className="text-center">
            <h4 className="get-started-label">For New Property Report</h4>
          </div>
          <MDBRow className="margin20 marginbottom20">
            <MDBCol md="12" className="text-center">
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                size="large"
                color="primary"
                className="button-inner-class"
                onClick={this.goToNextPage}
                fullWidth
              >
                Add Property
              </Button>
            </MDBCol>
          </MDBRow>

          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              <h4 className="signup-signin-label">Latest Reports</h4>
            </MDBCol>
          </MDBRow>

          <MDBRow className="margin20">
            <MDBCol xl="12" lg="12" md="12" sm="12" xs="12">
              {PropertyListResponse && PropertyListResponse.data
                ? PropertyListResponse.data.map((item) => {
                    const {
                      house_address,
                      id,
                      created_at,
                      no_of_bedrooms,
                      no_of_bathrooms,
                      property_price,
                    } = item;

                    const d = new Date(created_at);
                    const ye = new Intl.DateTimeFormat("en", {
                      year: "numeric",
                    }).format(d);
                    const mo = new Intl.DateTimeFormat("en", {
                      month: "short",
                    }).format(d);
                    const da = new Intl.DateTimeFormat("en", {
                      day: "2-digit",
                    }).format(d);

                    return (
                      <div key={id}>
                        <Card>
                          <CardContent>
                            <MDBRow>
                              <MDBCol md="12" className="text-al">
                                <Typography color="textSecondary" gutterBottom>
                                  <span className="modal-text">
                                    <MDBIcon
                                      onClick={() => this.toggle(item)}
                                      icon="trash-alt"
                                    />
                                  </span>

                                  <span className="modal-text">
                                    <MDBIcon
                                      icon="edit"
                                      onClick={() => this.handleEdit(item)}
                                      // onClick={() => this.goToReportScreen(item)}
                                    />
                                  </span>
                                </Typography>
                              </MDBCol>
                            </MDBRow>
                            <Typography color="textSecondary" gutterBottom>
                              {`${da}-${mo}-${ye}`}
                            </Typography>
                            <Typography variant="h5" component="h2">
                              {house_address}
                            </Typography>

                            <MDBRow>
                              <MDBCol md="8">
                                <Typography color="textSecondary">
                                  Property Price
                                </Typography>
                              </MDBCol>
                              <MDBCol md="3">
                                <Typography variant="body2" component="p">
                                <NumberFormat value={property_price} displayType={'text'} thousandSeparator={true} />
                                
                                </Typography>
                              </MDBCol>
                            </MDBRow>
                            <MDBRow>
                              <MDBCol md="8">
                                <Typography color="textSecondary">
                                  No. of Bathroom
                                </Typography>
                              </MDBCol>
                              <MDBCol md="3">
                                <Typography variant="body2" component="p">
                                  {no_of_bathrooms}
                                </Typography>
                              </MDBCol>
                            </MDBRow>
                            <MDBRow>
                              <MDBCol md="8">
                                <Typography color="textSecondary">
                                  No. of Bedrooms
                                </Typography>
                              </MDBCol>
                              <MDBCol md="3">
                                <Typography variant="body2" component="p">
                                  {no_of_bedrooms}
                                </Typography>
                              </MDBCol>
                            </MDBRow>
                            <MDBRow className="margin20 marginbottom20">
                              <MDBCol md="12" className="text-center">
                                <Button
                                  variant="contained"
                                  size="large"
                                  color="primary"
                                  className="button-inner-class"
                                  onClick={() => this.goToReportScreen(item)}
                                  fullWidth
                                >
                                  View Detailed Report
                                </Button>
                              </MDBCol>
                            </MDBRow>
                          </CardContent>
                        </Card>
                        <br />
                      </div>
                    );
                  })
                : "no data"}
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBModal size="sm" isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>
              Delete Property
            </MDBModalHeader>
            <MDBModalBody>
              <br></br>
              <p> Are you sure want to delete property?</p>
              <br></br>
            </MDBModalBody>
            <MDBModalFooter>
              <Button color="primary" onClick={() => this.handleDelete("NO")}>
                No
              </Button>
              <Button
                color="secondary"
                onClick={() => this.handleDelete("Yes")}
              >
                Yes
              </Button>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PropertyListResponse: state.propertyListResponse,
    GetSinglePropertyResponse: state.getSinglePropertyResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetPropertyListing: () => dispatch(get_property_listing()),
    GetSingleProperty: (id) => dispatch(get_single_property(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
