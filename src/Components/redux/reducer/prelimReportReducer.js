import { GET_PRELIM_REPORT} from "../actions/action-types";

export const get_prelim_report = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PRELIM_REPORT:
      return payload;

    default:
      return state;
  }
};
