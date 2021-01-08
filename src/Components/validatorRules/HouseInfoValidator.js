const   HouseInfoValidator = {
  property_price: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Property Price cannot be empty",
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

  downpayment_amount: {
    rules: [
      {
        test: (value) => {
          return (
            Number(value) <= Number(HouseInfoValidator.property_price.state)
          );
        },
        message: "Downpayment Amount cannot exceed Home Price",
      },
      {
        test: /^[0-9,]*$/,
        message: "only numbers are allowed!",
      },
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Downpayment amount cannot be empty",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  area_of_the_house: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Area of the house cannot be empty",
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
  annual_property_tax: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Annual Property Tax cannot be empty",
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
  annual_home_owner_association_dues: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Annual home owner association dues cannot be empty",
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
  home_owner_insurance: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Home owner insurance cannot be empty",
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

/* add new validations  */ 

  home_price_growth: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Home Price growth cannot be empty",
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



  // office_address: {
  //   rules: [
  //     {
  //       test: (value) => {
  //         return Object.keys(value).length !== 0;
  //       },
  //       message: "Office Address cannot be empty",
  //     },
  //   ],
  //   errors: [],
  //   valid: false,
  //   state: "",
  // },
  // office_zip_code: {
  //   rules: [
  //     {
  //       test: (value) => {
  //         return Object.keys(value).length !== 0;
  //       },
  //       message: "Office Zip code cannot be empty",
  //     },
  //     {
  //       test: /^[0-9,]*$/,
  //       // test: /^[0-9]\d*(\.\d+)*$/,
  //       message: "only numbers are allowed!",
  //     },
  //   ],
  //   errors: [],
  //   valid: false,
  //   state: "",
  // },
  // office_state_name: {
  //   rules: [
  //     {
  //       test: (value) => {
  //         return Object.keys(value).length !== 0;
  //       },
  //       message: "Office Address cannot be empty",
  //     },
  //   ],
  //   errors: [],
  //   valid: false,
  //   state: "",
  // },

/* end new validations  */ 


};




export default HouseInfoValidator;
