import React, { Component, Fragment } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import SplashScreen1 from "./splashscreen1";
import SplashScreen2 from "./splashScreen2";
import "../../css/splashScreen.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import SplashScreen3 from "./splashScreen3";
import SplashScreen4 from "./splashScreen4";
import SplashScreen5 from "./splashScreen5";
import SplashScreen6 from "./splashScreen6";
import SplashScreen7 from "./splashScreen7";

export class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
            <Carousel showArrows={false}  >
              <Item>
                <SplashScreen1 />
              </Item>
              {/* <Item>
                <SplashScreen2 />
              </Item>
              <Item>
                <SplashScreen3 />
              </Item> */}
              <Item>
                <SplashScreen4 />
              </Item>
              <Item>
                <SplashScreen5 />
              </Item>
              <Item>
                <SplashScreen6 />
              </Item>
              <Item>
                <SplashScreen7 />
              </Item>
            </Carousel>
      </Fragment>
    );
  }
}

export default SplashScreen;
