import HouseInfoValidator from "./HouseInfoValidator";
const ArmMortgageProgramValidator = {
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
              value <= HouseInfoValidator.property_price.state
            );
          },
          message: "Loan value should not be greater than property price!",
        },
        {
          // test: /^[0-9,]*$/,
          test:/^(\d{1,3}(\,?\d{3}){1,2})$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
  
    // initial_interest_rate: {
    //   rules: [
    //     {
    //       // test: /^[0-9,]*$/,
    //       test: /^[0-9]\d*(\.\d+)*$/,
    //       message: "only numbers are allowed!",
    //     },
    //     {
    //       test: (value) => {
    //         return Object.keys(value).length !== 0;
    //       },
    //       message: "Interest rate cannot be empty",
    //     },
    //   ],
    //   errors: [],
    //   valid: false,
    //   state: "",
    // },

    first_interest_rate_adj_cap: {
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
            message: "First interest rate adj cap cannot be empty",
          },
        ],
        errors: [],
        valid: false,
        state: "",
      },
      floor_interest_rate: {
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
            message: "Floor interest rate cannot be empty",
          },
        ],
        errors: [],
        valid: false,
        state: "",
      },
      ceiling_interest_rate: {
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
            message: "Ceiling Interest rate cannot be empty",
          },
        ],
        errors: [],
        valid: false,
        state: "",
      },
      period_cap: {
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
            message: "Period cap rate cannot be empty",
          },
        ],
        errors: [],
        valid: false,
        state: "",
      },
      rate_add: {
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
            message: "Rate add rate cannot be empty",
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
          test:/^[0-9,]*$/,
          message: "only numbers are allowed!",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },

    first_interest_rate_adj_cap: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "First interest rate adjustment cap cannot be empty",
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

    floor_interest_rate: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Floor interest rate cannot be empty",
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

    ceiling_interest_rate: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Ceiling interest rate cannot be empty",
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
  

    ARM1rate: {
      rules: [
        {
          test: (value) => {
            return Object.keys(value).length !== 0;
          },
          message: "Ceiling interest rate cannot be empty",
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
  export default ArmMortgageProgramValidator;
  