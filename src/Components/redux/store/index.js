import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import finmagixReducer from "../reducer/index";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
};
let middleware = "";

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(
    applyMiddleware(
      thunk,
      logger
    )
  )
} else {
  middleware = applyMiddleware(
    thunk
  )
}

const store = createStore(
  finmagixReducer,
  initialState,
  compose(middleware)
);

export default store;
