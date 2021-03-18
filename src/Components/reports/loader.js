import React, { Component, Fragment } from "react";
import Header from "../../common/header";
import { MDBContainer, MDBRow, MDBCol} from "mdbreact";

export class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        <Header type="Report" />
        <MDBContainer className="loading-container">
          <MDBRow className="margin20">
            <MDBCol md="12" className="">
              <div className="loader center">
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Fragment>
    );
  }
}

export default Loader;
