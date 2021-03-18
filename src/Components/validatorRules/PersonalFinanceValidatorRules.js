const PersonalFinanceValidator = {
  annual_gross_income: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Annual gross income cannot be empty",
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

  monthly_debt_payments: {
    rules: [
      {
        test: (value) => {
          return (
            parseInt(String(value).replace(/,/g, "")) <=
            parseFloat(
              String(PersonalFinanceValidator.federal_income.state).replace(
                /,/g,
                ""
              )
            )
          );
        },
        message: "Cannot exceed Federal Income",
      },

      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Monthly debt payments cannot be empty",
      },

      // {
      //   // test: /^[0-9,]*$/,
      //   test:/^(\d{1,3}(\,?\d{2,3}){1,2})$/,
      //   message: "only numbers are allowed!",
      // },
    ],
    errors: [],
    valid: false,
    state: "",
  },

  marginal_tax_rate: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Marginal tax rate cannot be empty",
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

  monthly_non_housing_expenses: {
    rules: [
      {
        test: (value) => {
          return (
            parseInt(String(value).replace(/,/g, "")) <=
            parseFloat(
              String(PersonalFinanceValidator.federal_income.state).replace(
                /,/g,
                ""
              )
            )
          );
        },
        message: "Cannot exceed Federal Income",
      },

      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Monthly Non Housing Expenses cannot be empty",
      },

      // {
      //   // test: /^[0-9,]*$/,
      //   test:/^(\d{1,3}(\,?\d{2,3}){1,2})$/,
      //   message: "only numbers are allowed!",
      // },
    ],
    errors: [],
    valid: false,
    state: "",
  },

  // federal_income: {
  //   rules: [
  //     {
  //       test: (value) => {
  //         return Object.keys(value).length !== 0;
  //       },
  //       message: "Federal income cannot be empty",
  //     },
  //     {
  //       // test: /^[0-9,]*$/,
  //       test: /^(\d{1,3}(\,?\d{3}){1,2})$/,
  //       message: "only numbers are allowed!",
  //     },
  //   ],
  //   errors: [],
  //   valid: false,
  //   state: "",
  // },
};

export default PersonalFinanceValidator;
