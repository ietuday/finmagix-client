import { PERSONAL_FINANCE_CREATE,DETAIL_EXPENSE_UPDATE, PERSONAL_FINANCE_GET, PERSONAL_FINANCE_UPDATE,DETAIL_EXPENSE_CREATE, DETAIL_EXPENSE_GET } from "../action-types";
import { savePersonalFinanace } from "../../../../routes/utils";
import Axios from "axios";
import { config } from "../../../config/default";
const { baseURL } = config;

export const personal_finance_create = (data) => {
  if(data && data.marginal_tax_rate){
    data.marginal_tax_rate = String(parseInt(String(data.marginal_tax_rate_percentage).replace(/%/g, ""))/100)
  }
  return (dispatch) => {
    Axios.post(`${baseURL}/personal_finances/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((personalFinanceCreateResponse) => {
        dispatch({
          type: PERSONAL_FINANCE_CREATE,
          payload: personalFinanceCreateResponse.data,
        });
        savePersonalFinanace(personalFinanceCreateResponse.data);
      })
      .catch((err) => {
       
      });
  };
};
export const detail_expense_create = (data) => {
  return (dispatch) => {
    Axios.post(`${baseURL}/personal_finances/detail_non_housing/list_or_create`, data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((detailedExpenseResponse) => {
        dispatch({
          type: DETAIL_EXPENSE_CREATE,
          payload: detailedExpenseResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};
export const get_detail_expense = (id) => {
  return (dispatch) => {
    Axios.get(`${baseURL}/personal_finances/detail_non_housing/${id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((detailedExpenseResponse) => {
        dispatch({
          type: DETAIL_EXPENSE_GET,
          payload: detailedExpenseResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};
export const update_detail_expense = (data) => {
  return (dispatch) => {
    Axios.put(`${baseURL}/personal_finances/detail_non_housing/${data.id}`,data, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((detailedExpenseResponse) => {
        dispatch({
          type: DETAIL_EXPENSE_UPDATE,
          payload: detailedExpenseResponse.data,
        });
      })
      .catch((err) => {
       
      });
  };
};
export const get_personal_finance_data = () => {
  return (dispatch) => {
    Axios.get(`${baseURL}/personal_finances/${JSON.parse(localStorage.getItem('personal_finance_array')).id}`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((getPersonalfinanceData) => {
        dispatch({
          type: PERSONAL_FINANCE_GET,
          payload: getPersonalfinanceData.data.data[0],
        });
      })
      .catch((err) => {
       
      });
  };
};
export const personal_finance_update = (data) => {
  
  if(data && data.marginal_tax_rate){
    data.marginal_tax_rate = String(parseInt(String(data.marginal_tax_rate_percentage).replace(/%/g, ""))/100)
  }
  return (dispatch) => {
    Axios.put(`${baseURL}/personal_finances/${JSON.parse(localStorage.getItem('personal_finance_array')).id}`, data,{
      headers: {
        "Content-type": "Application/json",
        Authorization: `JWT ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((updatePersonalFinanceData) => {
       
        dispatch({
          type: PERSONAL_FINANCE_UPDATE,
          payload: updatePersonalFinanceData.data.data,
        });

        savePersonalFinanace(updatePersonalFinanceData.data);
      })
      .catch((err) => {
       
      });
  };
};
