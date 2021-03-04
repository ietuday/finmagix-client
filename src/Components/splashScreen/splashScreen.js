import React, { Component, Fragment } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import SplashScreen1 from "./splashscreen1";
import SplashScreen2 from "./splashScreen2";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";

export class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
            <Carousel showArrows={false} showDots={false} >
              <Item>
                <SplashScreen1 />
              </Item>
              <Item>
                <SplashScreen2 />
              </Item>
            </Carousel>
      </Fragment>
    );
  }
}

export default SplashScreen;
