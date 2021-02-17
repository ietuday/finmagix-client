const Tax1Validator = {
  
    fedral_adjusted_gross_income: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Fedral gross income cannot be empty",
        },
        {
          test: /^[0-9,]*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    }
  };
  export default Tax1Validator;
  