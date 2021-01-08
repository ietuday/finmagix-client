import React, { Component } from "react";
import Map from "./Map";

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      addressData : {}
    };
  }
  componentDidMount(){
    if(this.props.addressData){
    this.props.handleAddressData(this.props.addressData)
    }
  }
  getData = async(data) => { 
    await this.setState((prevState) => {
      let addressData = Object.assign({}, prevState.addressData);
      addressData = data;
      return { addressData };
    });
    this.props.onSelectAddress(this.state.addressData);
  }
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          center={{ lat: 18.5204, lng: 73.8567 }}
          zoom={15}
          type={this.props.type}
          getData = {this.getData}
          apiData = {this.props.PropertyInfoGetDataResponse}
        />
      </div>
    );
  }
}

export default MapContainer;
