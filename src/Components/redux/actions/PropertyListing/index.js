import { GET_PROPERTY_LISTING,GET_SINGLE_PROPERTY } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;
export const get_property_listing = () => {
  return (dispatch) => {
    Axios.get(`${baseURL}/property_listings/list_or_create`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getResponse) => {
        dispatch({
          type: GET_PROPERTY_LISTING,
          payload: getResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};

export const get_single_property = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/property_listings/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getResponse) => {
        dispatch({
          type: GET_SINGLE_PROPERTY,
          payload: getResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};
