import { GET_CALCULATOR } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;
export const get_calculator = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/calculator/`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((calculatorResponse) => {
        dispatch({
          type: GET_CALCULATOR,
          payload: calculatorResponse.data,
        });
      })
      .catch((err) => {
      
      });
  };
};
