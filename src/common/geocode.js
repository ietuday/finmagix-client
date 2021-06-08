import React from "react";
import Geocode from "react-geocode";

import Axios from "axios";

// import { Input } from "antd";
// import { MDBRow, MDBCol } from "mdbreact";
import { config } from '../Components/config/default';
const { compose, withProps, lifecycle } = require("recompose");
const _ = require("lodash");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");

const { baseURL } = config;


Geocode.setApiKey("AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU");
Geocode.enableDebug();



const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    UNSAFE_componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        isUpdate : false,
        house_address: "",
        house_state: "",
        house_zip_code: "",
        markers: [],
        addressArray: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
         
        checkProperty: () => {
          const propertyId = JSON.parse(localStorage.getItem("property_id"));
          if (propertyId) {
            Axios.get(`${baseURL}/property_listings/${propertyId}`, {
              headers: {
                "Content-type": "Application/json",
                Authorization: `JWT ${localStorage.getItem("accessToken")}`,
              },
            })
              .then((propertyInfo) => {
                const propertyDetail = propertyInfo.data.data[0];

                
                  Geocode.fromAddress(propertyDetail.house_address).then(
                    (response) => {
                      const { lat, lng } = response.results[0].geometry.location;
                      const center = {
                        lat: lat,
                        lng: lng
                      }
                      
                      this.setState({"center": center})
                    },
                    (error) => {
                      
                    }
                  );
            })
            
              
          }else{
            console.log("Property Not Found");
            
          }
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
          const propertyId = JSON.parse(localStorage.getItem("property_id"));
          let called = false
          if (propertyId && !this.state.isUpdate) {
            console.log(called)
            Axios.get(`${baseURL}/property_listings/${propertyId}`, {
              headers: {
                "Content-type": "Application/json",
                Authorization: `JWT ${localStorage.getItem("accessToken")}`,
              },
            })
              .then((propertyInfo) => {
                const propertyDetail = propertyInfo.data.data[0];
                called = true;
                
                  Geocode.fromAddress(propertyDetail.house_address).then(
                    (response) => {
                      const { lat, lng } = response.results[0].geometry.location;
                      console.log(lat, lng);
                      const center = {
                        lat: lat,
                        lng: lng
                      }
                      
                      this.setState({"center": center, "isUpdate": true})
                    },
                    (error) => {
                      console.error(error);
                    }
                  );
            })
            
              
          }else{
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
                let addressData = {
                  house_address: this.state.house_address,
                  house_state: this.state.house_state,
                  house_zip_code: this.state.house_zip_code,
                };
                localStorage.setItem("addressData", JSON.stringify(addressData));
              })
              .catch((err) => {
                console.log(err);
              });
            
          }
         
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
      checkProperty={props.checkProperty}
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
          className="geocode-style"
          onChange={props.onChange}
          style={{zIndex: '0',
            position: 'absolute',
            left: '213px',
            top: '334px'}
          }
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </GoogleMap>
    {/* <div>
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
            value={props.hosue_info_house_address ? props.hosue_info_house_address : props.house_address}
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
            value={props.hosue_info_house_state ? props.hosue_info_house_state : props.house_state}
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
            value={props.hosue_info_house_zip_code ? props.hosue_info_house_zip_code : props.house_zip_code}
          />
        </MDBCol>
      </MDBRow>
    </div> */}
  </>
));

export default MapWithASearchBox;
