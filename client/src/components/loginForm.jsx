import React from "react";
import Joi from "joi-browser";

import Form from "./common/Form";

// inherit all the methods we have defined in it's base class
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {}, //key will be name of the target property and value is the error message
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("form subbmited");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
