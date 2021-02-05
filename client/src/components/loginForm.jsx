import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { apiEndpoint } from "../config.json";
import Form from "./common/Form";

// inherit all the methods we have defined in it's base class
class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {}, //key will be name of the target property and value is the error message
  };

  schema = {
    email: Joi.string().required().label("email").email(),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await axios.post(`${apiEndpoint}login`, data);
      localStorage.setItem("token", jwt);
      console.log("loged In", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
