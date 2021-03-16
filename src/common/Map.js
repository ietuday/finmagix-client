import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import { Input } from "antd";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
// import PlacesAutocomplete from 'react-places-autocomplete';

import { GoogleMapsAPI } from "../client-config";
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.addressData
        ? this.props.addressData.house_address
        : "",
      city: "",
      area: this.props.addressData ? this.props.addressData.house_zip_code : "",
      state: this.props.addressData ? this.props.addressData.house_state : "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  componentDidMount() {

    this.setState({
      address: this.props.apiData ? this.props.apiData.house_address : "",
      area: this.props.apiData ? this.props.apiData.house_zip_code : "",
      city: "",
      state: this.props.apiData ? this.props.apiData.house_state : "",
    });
  }
  initMap = () => {
    let { lat, lng } = this.state;
    new window.google.maps.Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 8,
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        
        return city;
      }
    }
  };
  getArea = (addressArray) => {
    
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            // "sublocality_level_1" === addressArray[i].types[j] ||
            // "locality" === addressArray[i].types[j] ||
            addressArray[i].types[j] === "postal_code"
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  handleAddressData(data) {
    this.setState({
      address: data.house_address,
      area: data.house_zip_code,
      city: "",
      state: data.state,
    });
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onInfoWindowClose = (event) => {};
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  onPlaceSelected = (event) => {
    let newLat = event.geometry.location.lat(),
      newLng = event.geometry.location.lng();
    const address = event.formatted_address,
      addressArray = event.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray);
    this.setState({
      address: address,
      area: area,
      city: city,
      state: state,
      markerPosition: {
        lat: newLat,
        lng: newLng,
      },
      mapPosition: {
        lat: newLat,
        lng: newLng,
      },
    });
    this.props.getData(this.state);
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
          handleAddressData={(data) => this.handleAddressData(data)}
          
        >
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
          <Autocomplete
            style={{
              height: "40px",
              width: "100%",
              paddingLeft: "16px",
              marginTop: "30px",
              marginBottom: "500px",
              border: "none",
              borderBottom: "1px solid #7F8586",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
            componentRestrictions={{country: "us"}}
            placeholder={"Enter your home address here"}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div>
            <div className="form-group">
              <AsyncMap
                id="map"
                // googleMapURL={`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GoogleMapsAPI}`}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
                // googleMapURL={`https://maps.googleapis.com/maps/api/js?libraries=places&key=${GoogleMapsAPI}`}
                loadingElement={
                  <div
                    style={{
                      height: "200px",
                    }}
                  />
                }
                containerElement={
                  <div
                    style={{
                      height: "200px",
                    }} 
                  />
                }
                mapElement={
                  <div
                    style={{
                      height: "200px",
                    }}
                  />
                }
              />
            </div>

            <div className="row form-group address-fields">
              <div className="col-md-8">
                <span className="get-started-label">State</span>
                <br />
                <Input
                  className="input-class-mdb"
                  placeholder="Start typing state name"
                  name="state"
                  disabled={true}
                  onChange={this.onChange}
                  value={this.state.state}
                />
              </div>
              <div className="col-md-4">
                <span className="get-started-label">Zip Code</span>
                <br />
                <Input
                  className="input-class-mdb"
                  placeholder="zip code"
                  name="area"
                  disabled={true}
                  onChange={this.onChange}
                  value={this.state.area}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default Map;
