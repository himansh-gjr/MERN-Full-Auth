import React from "react";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./common/Form";
import { apiEndpoint } from "../config.json";

class ProfileUpdateForm extends Form {
  state = {
    data: {
      email: this.props.user.email,
      password: "",
      name: this.props.user.name,
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email(),
    password: Joi.string().min(5),
    name: Joi.string(),
  };

  doSubmit = async () => {
    try {
      const response = await axios.put(
        `${apiEndpoint}profile/update`,
        this.state.data
      );
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
        <h1>Update Profile</h1>
        <form>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("name", "Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Update Profile")}
        </form>
      </div>
    );
  }
}

export default ProfileUpdateForm;
