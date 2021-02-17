import { GET_PRELIM_REPORT} from "../actions/action-types";
import Axios from "axios";
import { config } from "../../config/default";
const { baseURL } = config;

export const get_prelim_report = data => {
  
  localStorage.setItem('rec_mortgage', JSON.stringify(data))
  return dispatch => {
    Axios.post(`${baseURL}/calculator/recommended_mortgage`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(reportResponse => {
        dispatch({ type: GET_PRELIM_REPORT, payload: reportResponse.data });
      })
      .catch(err => {
       
      });
  };
};




