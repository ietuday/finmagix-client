import { PERSONAL_FINANCE_CREATE, DETAIL_EXPENSE_GET,DETAIL_EXPENSE_UPDATE, SURVEY_CREATE,RENT_VS_BUY_CREATE, TAX_CREATE, PERSONAL_FINANCE_GET, PROPERTY_INFO_CREATE, FRM_MORTGAGE_CREATE, ARM_MORTGAGE_CREATE, PROPERTY_INFO_GET,RENT_VS_BUY_GET, TAX_GET, FRM_MORTGAGE_GET, ARM_MORTGAGE_GET, PROPERTY_INFO_UPDATE, PERSONAL_FINANCE_UPDATE, FRM_MORTGAGE_UPDATE, ARM_MORTGAGE_UPDATE, RENT_VS_BUY_UPDATE, TAX_UPDATE, FRM_MORTGAGE_CREATE_FIRST, FRM_MORTGAGE_CREATE_SECOND, ARM_MORTGAGE_CREATE_FIRST, ARM_MORTGAGE_CREATE_SECOND, FRM_MORTGAGE_UPDATE_FIRST, FRM_MORTGAGE_UPDATE_SECOND, ARM_MORTGAGE_UPDATE_SECOND, FRM_MORTGAGE_GET_FIRST, FRM_MORTGAGE_GET_SECOND, ARM_MORTGAGE_GET_FIRST, ARM_MORTGAGE_GET_SECOND, ARM_MORTGAGE_UPDATE_FIRST, DETAIL_EXPENSE_CREATE } from "../actions/action-types";


export const property_info_create = (state = {}, { type, payload }) => {
  switch (type) {
    case PROPERTY_INFO_CREATE:
      return payload;
    default:
      return state;
  }
};
export const survey_create = (state = {}, { type, payload }) => {
  switch (type) {
    case SURVEY_CREATE:
      return payload;
    default:
      return state;
  }
};
export const property_info_update = (state = {}, { type, payload }) => {
  switch (type) {
    case PROPERTY_INFO_UPDATE:
      return payload;
    default:
      return state;
  }
};
export const get_property_info = (state = {}, { type, payload }) => {
  switch (type) {
    case PROPERTY_INFO_GET:
      return payload;
    default:
      return state;
  }
};
export const personal_finance_create = (state = {}, { type, payload }) => {
  switch (type) {
    case PERSONAL_FINANCE_CREATE:
      return payload;
    default:
      return state;
  }
};
export const detail_expense_create = (state = {}, { type, payload }) => {
  switch (type) {
    case DETAIL_EXPENSE_CREATE:
      return payload;
    default:
      return state;
  }
};
export const update_detail_expense = (state = {}, { type, payload }) => {
  switch (type) {
    case DETAIL_EXPENSE_UPDATE :
      return payload;
    default:
      return state;
  }
};
export const get_detail_expense = (state = {}, { type, payload }) => {
  switch (type) {
    case DETAIL_EXPENSE_GET :
      return payload;
    default:
      return state;
  }
};
export const personal_finance_update = (state = {}, { type, payload }) => {
  switch (type) {
    case PERSONAL_FINANCE_UPDATE:
      return payload;
    default:
      return state;
  }
};
export const get_personal_finance_data = (state = {}, { type, payload }) => {
  switch (type) {
    case PERSONAL_FINANCE_GET:
      return payload;
    default:
      return state;
  }
};

export const rent_vs_buy_create = (state = {}, { type, payload }) => {
  switch (type) {
    case RENT_VS_BUY_CREATE:
      return payload;
    default:
      return state;
  }
};
export const rent_vs_buy_update = (state = {}, { type, payload }) => {
  switch (type) {
    case RENT_VS_BUY_UPDATE:
      return payload;
    default:
      return state;
  }
};

export const get_rent_vs_buy_data = (state = {}, { type, payload }) => {
  switch (type) {
    case RENT_VS_BUY_GET:
      return payload;
    default:
      return state;
  }
};

export const tax_create = (state = {}, { type, payload }) => {
  switch (type) {
    case TAX_CREATE:
      return payload;
    default:
      return state;
  }
};
export const tax_update = (state = {}, { type, payload }) => {
  switch (type) {
    case TAX_UPDATE:
      return payload;
    default:
      return state;
  }
};
export const get_tax_data = (state = {}, { type, payload }) => {
  switch (type) {
    case TAX_GET:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_create_first = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_CREATE_FIRST:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_create_second = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_CREATE_SECOND:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_create_first = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_CREATE_FIRST:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_create_second = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_CREATE_SECOND:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_update_first = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_UPDATE_FIRST:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_update_second = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_UPDATE_SECOND:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_update_first = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_UPDATE_FIRST:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_update_second = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_UPDATE_SECOND:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_get_first = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_GET_FIRST:
      return payload;
    default:
      return state;
  }
};
export const frm_mortgage_get_second = (state = {}, { type, payload }) => {
  switch (type) {
    case FRM_MORTGAGE_GET_SECOND:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_get_first = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_GET_FIRST:
      return payload;
    default:
      return state;
  }
};
export const arm_mortgage_get_second = (state = {}, { type, payload }) => {
  switch (type) {
    case ARM_MORTGAGE_GET_SECOND:
      return payload;
    default:
      return state;
  }
};
