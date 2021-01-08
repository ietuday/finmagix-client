const RentvsBuyValidator = {

current_monthly_rent_payment: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Current monthly rent payment cannot be empty",
        },
        {
          test: /^[0-9,]*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
   
    annual_rent_insurance: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Annual rent insurance cannot be empty",
        },
        {
          test: /^[0-9,]*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
    rate_of_investment: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Rate of investment cannot be empty",
        },
        {
          // test: /^[0-9]\d*(\.\d+)*$/,
          test: /^[0-9]\d*(\.\d+)*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },


    rentinflation: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Rate Inflation cannot be empty",
        },
        {
          // test: /^[0-9,]*$/,
          test: /^[0-9]\d*(\.\d+)*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },



    };
    export default RentvsBuyValidator;
    