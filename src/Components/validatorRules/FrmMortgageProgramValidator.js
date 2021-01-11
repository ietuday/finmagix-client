import HouseInfoValidator from "./HouseInfoValidator";
const FrmMortgageProgramValidator = {
    loan_amount: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Loan amount cannot be empty",
        },
        {
          // test: /^[0-9,]*$/,
          test:/^(\d{1,3}(\,?\d{3}){1,2})$/,
          message: "only numbers are allowed!",
        },
        {
          test: (value) => {
            return (
              value <= HouseInfoValidator.property_price.state
            );
          },
          message: "Loan value should not be greater than property price!",
        }
      ],
      
      errors: [],
      valid: false,
      state: "",
    },
  
    interest: {
      rules: [
        {
          // test: /^[0-9,]*$/,
          test: /^[0-9]\d*(\.\d+)*$/,
          message: "only numbers are allowed!",
        },
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Interest rate cannot be empty",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
    points: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Points cannot be empty",
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
    closing_costs: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "closing cost cannot be empty",
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
   
  };
  export default FrmMortgageProgramValidator;
  