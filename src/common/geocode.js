import React from "react";
import Geocode from "react-geocode";
import { Input } from "antd";
import { MDBRow, MDBCol } from "mdbreact";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

const _ = require("lodash");
Geocode.setApiKey("AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU");
Geocode.enableDebug();

const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        house_address: "",
        house_state: "",
        house_zip_code: "",
        markers: [],
        addressArray: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        getState: () => {
          let state = "";
          const addressArray = this.state.addressArray;
          for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
              if (
                addressArray[i].types[0] &&
                "administrative_area_level_1" === addressArray[i].types[0]
              ) {
                state = addressArray[i].long_name;
                this.setState({ house_state: state });
              }
            }
          }
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
          console.log(refs.map.getCenter().lat());
          console.log(refs.map.getCenter().lng());
          // console.log()

          Geocode.fromLatLng(
            refs.map.getCenter().lat(),
            refs.map.getCenter().lng()
          )
            .then((response) => {
              console.log(response);
              const address = response.results[0].formatted_address;
              const addressArray = response.results[0].address_components;
              let state = "";
              let post_code = "";
              for (let i = 0; i < addressArray.length; i++) {
                for (let i = 0; i < addressArray.length; i++) {
                  if (
                    addressArray[i].types[0] &&
                    "administrative_area_level_1" === addressArray[i].types[0]
                  ) {
                    state = addressArray[i].long_name;
                    this.setState({ house_state: state });
                  }

                  if (
                    addressArray[i].types[0] &&
                    "postal_code" === addressArray[i].types[0]
                  ) {
                    post_code = addressArray[i].long_name;
                    this.setState({ house_zip_code: post_code });
                  }
                }
              }

              this.setState({
                house_address: address,
                addressArray: addressArray,
              });
              let addressData ={
                "house_address": this.state.house_address,
                "house_state": this.state.house_state,
                "house_zip_code": this.state.house_zip_code,
              } 
              localStorage.setItem('addressData', JSON.stringify(addressData))
              console.log(this.state);
              //   city = this.getCity(addressArray),
              //   area = this.getArea(addressArray),
              //   state = this.getState(addressArray);
            })
            .catch((err) => {
              console.log(err);
            });
        },

        onChange: (ev) => {
          this.setState({ [ev.target.name]: ev.target.value });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();
          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map((place) => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter your address"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `255px`,
            height: `40px`,
            marginTop: `12px`,
            padding: `5px 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `12px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </GoogleMap>
    <div>
      <MDBRow className="margin20">
        <MDBCol>
          <span className="get-started-label">Address</span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Address"
            name="house_address"
            disabled={true}
            onChange={props.onChange}
            value={props.house_address}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="margin20">
        <MDBCol>
          <span className="get-started-label">State</span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="Start typing state name"
            name="house_state"
            disabled={true}
            onChange={props.getState}
            value={props.house_state}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="margin20">
        <MDBCol>
          <span className="get-started-label">Zip Code</span>
          <br />
          <Input
            className="input-class-mdb"
            placeholder="zip code"
            name="house_zip_code"
            disabled={true}
            onChange={props.onChange}
            value={props.house_zip_code}
          />
        </MDBCol>
      </MDBRow>
    </div>
  </>
));

export default MapWithASearchBox;
