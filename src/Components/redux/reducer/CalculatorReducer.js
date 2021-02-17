import { GET_CALCULATOR} from "../actions/action-types";

export const get_calculator = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_CALCULATOR:
      return payload;
    default:
      return state;
  }
};
