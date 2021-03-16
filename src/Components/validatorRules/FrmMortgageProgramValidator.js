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
          test: (value) => {
            return (
              parseFloat(String(value).replace(/,/g, '')) <= parseFloat(String(HouseInfoValidator.property_price.state).replace(/,/g, ''))
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
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "interest cannot be empty",
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
  