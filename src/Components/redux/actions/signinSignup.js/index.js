import { SIGN_UP,SIGN_UP_FAILURE, SIGN_IN_SUCCESS,SIGN_IN_FAILURE,SIGN_IN_GOOGLE, LOG_OUT } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;

export const sign_up = (data,onSuccess,onFailure) => {
  return dispatch => {
    Axios.post(`${baseURL}/users/sign_up`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(signupData => {
       
        dispatch({ type: SIGN_UP, payload: signupData.data });
        onSuccess(signupData.data);
      })
      .catch(err => {
       
        dispatch({ type: SIGN_UP_FAILURE, payload: {success:false} });
        onFailure(err);
      });
  };
};

export const sign_in = (dataObject,onSuccess,onFailure) => {
 
  return dispatch => {
    Axios.post(`${baseURL}/users/sign_in`, dataObject, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(signinData => {
        dispatch({ type: SIGN_IN_SUCCESS, payload: signinData.data });
        onSuccess(signinData.data);
      })
      .catch(err => {
        dispatch({ type: SIGN_IN_FAILURE, payload: {success:false} });
        onFailure();
      });
  };
};

export const sign_up_google = (token) => {
  return dispatch => {
    Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(googleSignupData => {
        dispatch({ type: SIGN_IN_GOOGLE, payload: googleSignupData.data });
      })
      .catch(err => {
        
      });
  };
};

export const log_out = () => {
  return {
    type: LOG_OUT
  }
};


