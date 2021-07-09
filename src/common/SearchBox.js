// import React from 'react';
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

// export default class SearchBox extends React.Component {

//   static propTypes = {
//     placeholder: PropTypes.string,
//     onPlacesChanged: PropTypes.func
//   }
//   render() {
//     return <input ref="input" placeholder={this.props.placeholder} type="text"/>;
//   }
//   onPlacesChanged = () => {
//     if (this.props.onPlacesChanged) {
//       this.props.onPlacesChanged(this.searchBox.getPlaces());
//     }
//   }
//   componentDidMount() {
//     var input = ReactDOM.findDOMNode(this.refs.input);
//     // eslint-disable-next-line no-undef
//     this.searchBox = new googlemaps.places.SearchBox(input);
//     this.searchBox.addListener('places_changed', this.onPlacesChanged);
//   }
//   componentWillUnmount() {
//     this.searchBox.removeListener('places_changed', this.onPlacesChanged);
//   }

// }