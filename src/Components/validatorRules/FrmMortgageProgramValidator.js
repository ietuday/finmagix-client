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
        // {
        //   // test: /^[0-9,]*$/,
        //   test:/^(\d{1,3}(\,?\d{3}){1,2})$/,
        //   message: "only numbers are allowed!",
        // },
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
        // {
        //   test: (value) => {
        //     return (
        //       console.log("lkjlgsjgsljsgl",  parseInt(String(value).replace(/%/g, '')) < 10),
        //       parseInt(String(value).replace(/%/g, '')) < 10
        //     );
           
        //   },
        //   message: "If the interest rate is greater than 10%, ask ' Is the interest rate input accurate?'",
        // },
        // {
         
        //   //test: /^[0-9]\d*(\.\d+)*$/,
        //   test:/^(0*100{1,1}\.?((?<=\.)0*)?%?$)|(^0*\d{0,2}\.?((?<=\.)\d*)?%?)$/,
        //   message: "only numbers are allowed!",
        // },
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
  