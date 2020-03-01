export const LoginSchema = {
  id: "/LoginSchema",
  type: "object",
  properties: {
    login: {
      type: "string",
      required: true,
      pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      maxLength: 120,
      message: {
        required: "Email is required",
        maxLength: "Email length should not be greater than 120 characters",
        pattern: "Email format is not valid"
      }
    },
    password: {
      type: "string",
      required: true,
      minLength: 3,
      message: {
        required: "Password is required",
        minLength: "Password length should not be less than 6 characters"
      }
    }
  }
};
