import { RENT_VS_BUY_CREATE, RENT_VS_BUY_GET, RENT_VS_BUY_UPDATE } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;
const token = localStorage.getItem('accessToken');
export const rent_vs_buy_create = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/rent_vs_buy/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((rentvsBuyCreateResponse) => {
        dispatch({
          type: RENT_VS_BUY_CREATE,
          payload: rentvsBuyCreateResponse.data,
        });
      })
      .catch((err) => {
        
      });
  };
};

export const get_rent_vs_buy_data = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/rent_vs_buy/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getRentvsBuyData) => {
        dispatch({
          type: RENT_VS_BUY_GET,
          payload: getRentvsBuyData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};

export const rent_vs_buy_update = (data) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/rent_vs_buy/${data.id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateRentvsBuyData) => {
        dispatch({
          type: RENT_VS_BUY_UPDATE,
          payload: updateRentvsBuyData.data.data,
        });
      })
      .catch((err) => {
        
      });
  };
};
