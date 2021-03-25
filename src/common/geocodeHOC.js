import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { MDBRow, MDBCol } from "mdbreact";
import { Fragment } from "react";
import "../css/addProperty.css";
import { Input } from "antd";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: 39.460628234373196, lng: -101.89068354568538 }}
  >
    {console.log(props)}
    {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} >
    {props.infoWindow && <InfoWindow onCloseClick={props.infoWindowClose}>
        <div>
          {" "}
          Lat: {props.lat} <br />
          Lng: {props.lng}
        </div>
      </InfoWindow>}
      </Marker>}

  </GoogleMap>
)

class MapContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      gotPlaces: {

      },
      isMarkerShown: false,
      infoWindow: false,
      searchData: {
        address: '',
        postal_code: '',
        state: '',
        lat: '',
        lng: '',
        street_number: '',
        route: '',
        locality: ''
      }
    }
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 1000)
  }

  handleMarkerClick = () => {
    console.log('this')
    this.setState({ infoWindow: true })
  }

  onInfoWindowClose = () => {
    console.log('closed')
    this.setState({ infoWindow: false })
  }

  handleChange = (e) => {
    e.persist();
      // console.log(e.target.value)
      console.log(e.target.value)
      console.log(e.target.name)
  }

  placeChanges = async (e) => {
    e.persist();
    console.log(e.target.value)
    const center = { lat: 50.064192, lng: -130.605469 };
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
    const input = document.getElementById("searchTextField");
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { "country": "us" },
      fields: ["address_components", "geometry", "icon", "name"],
      origin: center,
      strictBounds: false,
    };
    let autocomplete = new window.google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(["place_id", "geometry", "name"]);
    const southwest = { lat: 5.6108, lng: 136.589326 };
    const northeast = { lat: 61.179287, lng: 2.64325 };
    const newBounds = new window.google.maps.LatLngBounds(southwest, northeast);
    autocomplete.setBounds(newBounds);
    autocomplete.unbind("bounds");
    autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
    autocomplete.setOptions({ strictBounds: true });
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    await sleep(2000)
    this.setState({ gotPlaces: autocomplete.getPlace() })
      if ((this.state.gotPlaces != null) && (this.state.gotPlaces !== 'undefined') && (Object.keys(this.state.gotPlaces).length !== 0)) {

        var inputData = {}
        console.log(e.target.value)
        inputData.address = e.target.value;
        inputData.lat = this.state.gotPlaces.geometry.location.lat().toString().substr(0, 12);
        inputData.lng = this.state.gotPlaces.geometry.location.lng().toString().substr(0, 12)
        this.state.gotPlaces.address_components.map((i) => {
          if (i.types[0] === "postal_code") {
            inputData.postal_code = i.long_name;
          }
          if (i.types[0] === "administrative_area_level_1") {
            inputData.state = i.long_name;
          }
          if (i.types[0] === "country") {
            inputData.country = i.long_name
          }
          if (i.types[0] === "street_number") {
            inputData.street_number = i.long_name
          }
          if (i.types[0] === "route") {
            inputData.route = i.long_name
          }
          if (i.types[0] === "locality") {
            inputData.locality = i.long_name
          }
          inputData.addresss = `${inputData.street_number}, ${inputData.route}, ${inputData.locality}, ${inputData.state}, ${inputData.country}`
        })
        console.log(inputData)
        console.log(this.state)
        console.log(e.target.value, 'kalyan')
        this.setState({ searchData : inputData })
      }
  }

  render() {

    console.log(this.state.searchData)
    console.log('in render')
    console.log(this.state.searchData.lat)
    console.log(this.state.searchData.lng)

    return (
      <>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          infoWindow={this.state.infoWindow}
          infoWindowClose={this.onInfoWindowClose}
          onMarkerClick={this.handleMarkerClick}
          lat= {parseFloat(this.state.searchData.lat)}
          lng= {parseFloat(this.state.searchData.lng)}
        />
        <Fragment>
        <MDBRow className="margin20">
          <MDBCol md="12">
          <span className="get-started-label">
              Address
            </span>
            <br />
          <Input id="searchTextField" value={this.state.searchData.addresss} className="input-class-mdb" type="text" placeholder="Address" onChange={this.placeChanges}></Input>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
          <span className="get-started-label">
              State
            </span>
            <br />
          <Input name="state" id="state"  onChange={this.handleChange} className="input-class-mdb" type="text" placeholder="State" value={this.state.searchData.state}></Input>
          </MDBCol>
        </MDBRow>
        <MDBRow className="margin20">
          <MDBCol md="12">
          <span className="get-started-label">
              Zip Code
            </span>
            <br />
          <Input id="zipcode" value={this.state.searchData.postal_code} className="input-class-mdb" type="text" placeholder="Zip Code"></Input>
          </MDBCol>
        </MDBRow>
        </Fragment>
        
      </>
    )
  }
}

export default MapContainer;