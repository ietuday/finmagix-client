import React, { Component } from "react";
import { Range, getTrackBackground } from "react-range";
import { MDBRow, MDBCol } from "mdbreact";

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "A" ? 624 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "B" ? 650 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "C" ? 670 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "D" ? 690 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "E" ? 710 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "F" ? 730 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "G" ? 750 :
      this.props.apiRangeData && this.props.apiRangeData.fico_score_range === "H" ? 760 : 624

      ],
      A: "620 - 639",
      B: "640 - 659",
      C: "660 - 679",
      D: "680 - 699",
      E: "700 - 719",
      F: "720 - 739",
      G: "740 - 759",
      H: "Greater than 760",
    };
  }

  render() {
    return (
      <div className="row text-center">
        <h4 className="fico-score-range-text">
          {Math.round(this.state.values[0]) >= 620 &&
          Math.round(this.state.values[0]) <= 639
            ? [this.state.A]
            : Math.round(this.state.values[0]) >= 640 &&
              Math.round(this.state.values[0]) <= 659
            ? [this.state.B]
            : Math.round(this.state.values[0]) >= 660 &&
              Math.round(this.state.values[0]) <= 679
            ? [this.state.C]
            : Math.round(this.state.values[0]) >= 680 &&
              Math.round(this.state.values[0]) <= 699
            ? [this.state.D]
            : Math.round(this.state.values[0]) >= 700 &&
              Math.round(this.state.values[0]) <= 719
            ? [this.state.E]
            : Math.round(this.state.values[0]) >= 720 &&
              Math.round(this.state.values[0]) <= 739
            ? [this.state.F]
            : Math.round(this.state.values[0]) >= 740 &&
              Math.round(this.state.values[0]) <= 759
            ? [this.state.G]
            : this.state.H}
        </h4>
        <Range
          values={this.state.values}
          // step={0.1}
          min={620}
          max={770}
          onChange={(values) => {
            this.setState({ values });
            if (this.props.getRangeData) {
              this.props.getRangeData(
                Math.round(this.state.values[0]) >= 620 &&
                  Math.round(this.state.values[0]) <= 639
                  ? "A"
                  : Math.round(this.state.values[0]) >= 640 &&
                    Math.round(this.state.values[0]) <= 659
                  ? "B"
                  : Math.round(this.state.values[0]) >= 660 &&
                    Math.round(this.state.values[0]) <= 679
                  ? "C"
                  : Math.round(this.state.values[0]) >= 680 &&
                    Math.round(this.state.values[0]) <= 699
                  ? "D"
                  : Math.round(this.state.values[0]) >= 700 &&
                    Math.round(this.state.values[0]) <= 719
                  ? "E"
                  : Math.round(this.state.values[0]) >= 720 &&
                    Math.round(this.state.values[0]) <= 739
                  ? "F"
                  : Math.round(this.state.values[0]) >= 740 &&
                    Math.round(this.state.values[0]) <= 759
                  ? "G"
                  : "H"
              );
            } else {
              return false;
            }
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
                margin: "20px",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "8px",
                  width: "100%",
                  borderRadius: "10px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: 0,
                    max: 100,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "42px",
                width: "42px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            ></div>
          )}
        />
        <MDBRow style={{ width: "100%" }}>
          <MDBCol md="2" size="2">
            620
          </MDBCol>
          <MDBCol md="7" size="5"></MDBCol>
          <MDBCol md="3" size="5">
            More than 760
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default RangeSlider;
