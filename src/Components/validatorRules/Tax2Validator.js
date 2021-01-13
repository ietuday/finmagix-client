const Tax2Validator = {
  
    avg_loan_balance_for_grandfathered_debt: {
      rules: [
        {
          // test: /^[0-9,]*$/,
          test:/^(\d{1,3}(\,?\d{3}){1,2})$/,
          message: "only numbers are allowed!",
        },
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Average loan balance for grandfathered debt amount cannot be empty",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
    avg_loan_balance_for_home_acquisition_debt: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Average loan balance for home acquisition debt cannot be empty",
        },
        {
          // test:/^[0-9,]*$/,
          test:/^(\d{1,3}(\,?\d{3}){1,2})$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
    paid_mortgage_on_gf_ha_debt: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Paid mortgage of tax cannot be empty",
        },
        {
          test: /^[0-9]\d*(\.\d+)*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
  
  };
  export default Tax2Validator;
  