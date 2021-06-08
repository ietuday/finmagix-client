import { TAX_CREATE, TAX_GET ,TAX_UPDATE } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
import { saveTax } from "../../../../routes/utils";
const { baseURL } = config; 

export const tax_create = (data) => {
  const PropertyID = JSON.parse(localStorage.getItem('property_id'))
  return (dispatch) => {
    Axios.post(`${baseURL}/taxes/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((TaxCreateResponse) => {
        const proData = {
          is_tax_selected: true
        }
        Axios.put(`${baseURL}/property_listings/${PropertyID}`, proData, {
          headers: {
            "Content-type": "Application/json",
            Authorization: `JWT ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((updatePropertyInfoData) => {
            dispatch({
              type: TAX_CREATE,
              payload: TaxCreateResponse.data,
            });
            saveTax(TaxCreateResponse.data);
          })
          .catch((err) => {
            console.log(err)
          });

      })


      // })
      .catch((err) => {
        
      });
  };
};

export const get_tax_data = (data) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/taxes/${JSON.parse(localStorage.getItem('tax_array')).id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getTaxData) => {
        dispatch({
          type: TAX_GET,
          payload: getTaxData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};

export const tax_update = (data) => {
  const PropertyID = JSON.parse(localStorage.getItem('property_id'))
  return (dispatch) => {
    Axios.put(`${baseURL}/taxes/${JSON.parse(localStorage.getItem('tax_array')).id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateTaxData) => {
        const proData = {
          is_tax_selected: true
        }
        Axios.put(`${baseURL}/property_listings/${PropertyID}`, proData, {
          headers: {
            "Content-type": "Application/json",
            Authorization: `JWT ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((updatePropertyInfoData) => {
            dispatch({
              type: TAX_UPDATE,
              payload: updateTaxData.data.data,
            });
            saveTax(updateTaxData.data);
          })
          .catch((err) => {
            console.log(err)
          });

      })
      .catch((err) => {
        
      });
  };
};
