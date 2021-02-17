import { FRM_MORTGAGE_CREATE_FIRST, ARM_MORTGAGE_CREATE_FIRST,FRM_MORTGAGE_GET_FIRST, ARM_MORTGAGE_GET_FIRST,
   FRM_MORTGAGE_UPDATE_FIRST, ARM_MORTGAGE_UPDATE_FIRST,
   FRM_MORTGAGE_CREATE_SECOND, ARM_MORTGAGE_CREATE_SECOND,FRM_MORTGAGE_GET_SECOND, ARM_MORTGAGE_GET_SECOND,
   FRM_MORTGAGE_UPDATE_SECOND, ARM_MORTGAGE_UPDATE_SECOND } from "../action-types";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;
const token = localStorage.getItem('accessToken')
export const frm_mortgage_create_first = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/mortgage_programs/frm/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((frmMortgageCreateResponse) => {
        dispatch({
          type: FRM_MORTGAGE_CREATE_FIRST,
          payload: frmMortgageCreateResponse.data,
        });
      })
      .catch((err) => {
      
      });
  };
};
export const frm_mortgage_create_second = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/mortgage_programs/frm/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((frmMortgageCreateResponse) => {
        dispatch({
          type: FRM_MORTGAGE_CREATE_SECOND,
          payload: frmMortgageCreateResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};
export const arm_mortgage_create_first = (data) => {
    return (dispatch) => {
      Axios.post(`${baseURL}/mortgage_programs/arm/list_or_create`, data, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((armMortgageCreateResponse) => {
          dispatch({
            type: ARM_MORTGAGE_CREATE_FIRST,
            payload: armMortgageCreateResponse.data,
          });
        })
        .catch((err) => {
         
        });
    };
  };
  export const arm_mortgage_create_second = (data) => {
    return (dispatch) => {
      Axios.post(`${baseURL}/mortgage_programs/arm/list_or_create`, data, {
        headers: {
          "Content-type": "Application/json",
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((armMortgageCreateResponse) => {
          dispatch({
            type: ARM_MORTGAGE_CREATE_SECOND,
            payload: armMortgageCreateResponse.data,
          });
        })
        .catch((err) => {
       
        });
    };
  };
export const frm_mortgage_get_first = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/mortgage_programs/frm/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getFRMResponse) => {
        dispatch({
          type: FRM_MORTGAGE_GET_FIRST,
          payload: getFRMResponse.data.data[0],
        });
      })
      .catch((err) => {
       
      });
  };
};
export const frm_mortgage_get_second = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/mortgage_programs/frm/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getFRMResponse) => {
        dispatch({
          type: FRM_MORTGAGE_GET_SECOND,
          payload: getFRMResponse.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const arm_mortgage_get_first = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/mortgage_programs/arm/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getARMResponse) => {
        dispatch({
          type: ARM_MORTGAGE_GET_FIRST,
          payload: getARMResponse.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const arm_mortgage_get_second = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/mortgage_programs/arm/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getARMResponse) => {
        dispatch({
          type: ARM_MORTGAGE_GET_SECOND,
          payload: getARMResponse.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const frm_mortgage_update_first = (data,id) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/mortgage_programs/frm/${id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateFrmMortgageData) => {
        dispatch({
          type: FRM_MORTGAGE_UPDATE_FIRST,
          payload: updateFrmMortgageData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const frm_mortgage_update_second = (data,id) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/mortgage_programs/frm/${id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateFrmMortgageData) => {
        dispatch({
          type: FRM_MORTGAGE_UPDATE_SECOND,
          payload: updateFrmMortgageData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const arm_mortgage_update_first = (data,id) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/mortgage_programs/arm/${id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateArmMortgageData) => {
        dispatch({
          type: ARM_MORTGAGE_UPDATE_FIRST,
          payload: updateArmMortgageData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
export const arm_mortgage_update_second = (data,id) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/mortgage_programs/arm/${id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updateArmMortgageData) => {
        dispatch({
          type: ARM_MORTGAGE_UPDATE_SECOND,
          payload: updateArmMortgageData.data.data[0],
        });
      })
      .catch((err) => {
        
      });
  };
};
