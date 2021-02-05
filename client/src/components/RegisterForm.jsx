import React from "react";

import Joi from "joi-browser";
import Form from "./common/Form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  };

  doSubmit = () => {
    console.log("submited");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
