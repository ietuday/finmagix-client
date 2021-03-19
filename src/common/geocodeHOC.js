
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
      return (
        <Map google={this.props.google}
        style={style}
        center={{
          lat: 40.854885,
          lng: -88.081807
        }}
        zoom={15}
        // onClick={this.onMapClicked}
        >
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (AIzaSyCZSPd5v-HBJQRBSVdu5ZubIh9APtio6jU)
})(MapContainer)
