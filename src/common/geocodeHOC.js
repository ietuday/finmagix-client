import React, {Component} from 'react';
// import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Map, GoogleApiWrapper } from "google-maps-react";


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }



    return (
      <div
        style={{
          width: '100px',
  height: '200px'
        }}
      >
        <Map
          google={this.props.google}
          style={{}}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={5}
          // onClick={this.onMapClicked}
        />
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU"
})(MapContainer)