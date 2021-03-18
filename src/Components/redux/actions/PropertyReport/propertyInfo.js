import { PROPERTY_INFO_CREATE, PROPERTY_INFO_GET ,PROPERTY_INFO_UPDATE,SURVEY_CREATE } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;


export const property_info_create = (data,onSuccess,onFailure) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/property_listings/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((propertyCreateResponse) => {
        dispatch({
          type: PROPERTY_INFO_CREATE ,
          payload: propertyCreateResponse.data,
        });
        // if(localStorage.getItem('basic-info')){
        //   const basicInfo = JSON.parse(localStorage.getItem('basic-info'))
        //   const 
        //   const data = { ...basicInfo, }
        // }
        onSuccess(propertyCreateResponse.data.data);
      })
      .catch((err) => {
       
      });
      onFailure();
  };
};
export const survey_create = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/survey/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((surveyCreateResponse) => {
        dispatch({
          type: SURVEY_CREATE ,
          payload: surveyCreateResponse.data,
        });
      
        localStorage.setItem("survey_id",surveyCreateResponse.data.data.id);
      })
      .catch((err) => {
      
      });
  };
};
export const get_property_info = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/property_listings/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getPropertyInfo) => {
        dispatch({
          type: PROPERTY_INFO_GET,
          payload: getPropertyInfo.data.data[0],
        });
      })
      .catch((err) => {
      
      });
  };
};

export const property_info_update = (data) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/property_listings/${data.id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updatePropertyInfoData) => {
        dispatch({
          type: PROPERTY_INFO_UPDATE,
          payload: updatePropertyInfoData.data.data[0],
        });
      })
      .catch((err) => {
       
      });
  };
};
