import {
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_GOOGLE,
} from "../actions/action-types";

export const sign_in = (state = {}, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {...state,payload};

    case SIGN_IN_FAILURE:
      return payload;

    default:
      return state;
  }
};

export const sign_up = (state = {}, { type, payload }) => {
  switch (type) {
    case SIGN_UP:
      return payload;

    case SIGN_UP_FAILURE:
      return payload;

    default:
      return state;
  }
};

export const sign_up_google = (state = {}, { type, payload }) => {
  switch (type) {
    case SIGN_IN_GOOGLE:
      return payload;

    default:
      return state;
  }
};
