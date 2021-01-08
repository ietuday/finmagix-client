import { GET_PROPERTY_LISTING, GET_SINGLE_PROPERTY} from "../actions/action-types";

export const get_property_listing = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PROPERTY_LISTING:
      return payload;
    default:
      return state;
  }
};

export const get_single_property = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_SINGLE_PROPERTY:
      return payload;
    default:
      return state;
  }
};
