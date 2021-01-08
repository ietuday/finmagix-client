const SignupValidator = {
  namefield: {
    rules: [
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Name cannot be empty",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  
  email: {
    rules: [
      {
        // test: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
        test: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        // test : /^[a-zA-Z0-9][-\._a-zA-Z0-9]*@[a-zA-Z0-9][-\.a-zA-Z0-9]*\.(com|edu|info|gov|int|mil|net|org|biz|name|museum|coop|aero|pro|tv|[a-zA-Z]{2})$/,
        message: "Email must be in the form of abc@xyz.com",
      },
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Email cannot be empty",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
 
  password: {
    rules: [
      {
        test: (value) => {
          return value.length >= 8;
        },
        message: "Password must not be shorter than 8 characters",
      },
      {
        test: (value) => {
          return Object.keys(value).length !== 0;
        },
        message: "Password cannot be empty",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
};
export default SignupValidator;
