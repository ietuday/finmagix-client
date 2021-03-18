const SigninValidator = {
    email: {
      rules: [
        {
          test: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, // eslint-disable-line
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
    }
  };
  export default SigninValidator;
  