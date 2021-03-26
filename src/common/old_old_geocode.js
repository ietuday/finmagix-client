import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from "antd";
// import MapContainer from './geocodeHOC';
 
export default class MapWithASearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      formatted_address: '',
      lat: '',
      lng: '',
      state: '',
     };
  }
 
  handleChange = address => {
    console.log(address)
    this.setState({ address });
  };
 
  handleSelect = address => {
    // console.log(address)
    geocodeByAddress(address)
      .then(results => {
        console.log(results)
        this.setState({ formatted_address: results[0].formatted_address})
        console.log(results[0].geometry.location.lat().toString().substr(0,12))
        console.log(results[0].geometry.location.lng().toString().substr(0,12))
        var addressLength = results[0].formatted_address.split(',');
        console.log(addressLength[addressLength.length-2])
        this.setState({ state: addressLength[addressLength.length - 2]})
        this.setState({ lat: results[0].geometry.location.lat().toString().substr(0,12)})
        this.setState({ lng: results[0].geometry.location.lng().toString().substr(0,12)})
        getLatLng(results[0])
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading......</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <br />
      <Input
      type="text" 
      value={this.state.formatted_address}
      />
      <br />
      <br />
      <Input
      type="text" 
      value={this.state.state}
      />        
      </>
    );
  }
}