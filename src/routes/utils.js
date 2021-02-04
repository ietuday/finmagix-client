const TOKEN_KEY = "accessToken";
const ID ="id";
const PROPERTY_ID = "property_id";
const LAST_LOGIN = "last_login";
const PERSONAL_FINANCE = "personal_finance_array";
const TAX_ARRAY = "tax_array";
const RENT_VS_BUY_STATUS="is_rent_vs_buy_filled";
const RENT_VS_BUY_SELECT_STATUS="is_rent_vs_buy_selected";
const TAX_SELECT_STATUS="is_tax_selected";

export const login = (token,id,data) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ID, id);
  localStorage.setItem(LAST_LOGIN,data.last_login);
  // data.personal_finances.marginal_tax_rate
  data.personal_finances.marginal_tax_rate = String(Number(data.personal_finances.marginal_tax_rate)*100)
  localStorage.setItem(PERSONAL_FINANCE, JSON.stringify(data.personal_finances));
  localStorage.setItem(TAX_ARRAY,JSON.stringify(data.taxes))
};
export const savePropertyId = (id) => {
  localStorage.setItem(PROPERTY_ID, JSON.stringify(id))
};
export const saveSelectrentvsbuyStatus = (data) =>{
  localStorage.setItem(RENT_VS_BUY_SELECT_STATUS, data)
}
export const saveSelecttaxStatus = (data) =>{
  localStorage.setItem(TAX_SELECT_STATUS, data)
}
export const savePersonalFinanace = (data) => {
  localStorage.setItem(PERSONAL_FINANCE, JSON.stringify(data.data))
};
export const saveTax = (data) => {
  localStorage.setItem(TAX_ARRAY, JSON.stringify(data.data))
};
export const setRentvsBuyFilledStatus = (status) =>{
  localStorage.setItem(RENT_VS_BUY_STATUS, status)
};
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  localStorage.removeItem("last_login");
  localStorage.removeItem("property_id");
  localStorage.removeItem("personal_finance_array");
  localStorage.removeItem("tax_array");
  localStorage.removeItem("is_rent_vs_buy_filled");
  localStorage.removeItem("is_rent_vs_buy_selected")
  localStorage.removeItem("is_tax_selected")
  localStorage.clear();
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};
