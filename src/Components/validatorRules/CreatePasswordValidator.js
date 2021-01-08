
const CreatePasswordValidator = {
 
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



confirmPassword: {

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


  export default CreatePasswordValidator;

  