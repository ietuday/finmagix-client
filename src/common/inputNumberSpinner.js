import React, { Component } from "react";

class NumberSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks:  this.props.count, 
      show: true,
    };
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecreaseItem = this.DecreaseItem.bind(this);
  }

  async IncrementItem() {
    await this.setState({
      clicks: Number(this.state.clicks) + 1,
    });

    this.props.onRoomCount(this.state.clicks);
  }
  async DecreaseItem() {
    if (Number(this.state.clicks) === 0) {
      await this.setState({
        clicks: 0,
      });
    } else {
      await this.setState((prevState) => ({
        clicks: Number(this.state.clicks) - 1,
      }));
    }
    this.props.onRoomCount(this.state.clicks);
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="row">
        <button className="increment-button" onClick={this.IncrementItem}>
          +
        </button>
        <h5>{Number(this.state.clicks)}</h5>
        <button className="decrement-button" onClick={this.DecreaseItem}>
          -
        </button>
      </div>
    );
  }
}

export default NumberSpinner;
