import React, { Component } from "react";

import Input from "./Input";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //pick the error property of result object from Joi if there are no error then the error property will not exsit
    if (!error) return null;

    //map the errror.details[0].messsage  array and create a create a new object with the key is the target property we want to get that from the path error.details.path
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //eg.{username:value }
    const schema = { [name]: this.schema[name] }; //schema for only one property we are getting and we should get the value from the SCHEMA we created in the form
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); // disable the default behaviour(we don't want to post to the server every time we submit the form)

    //validate the entire form
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call the server to submit the form after all validaiton is done
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty(input);
    const errors = { ...this.state.errors };
    //update the input feild errors
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // update the state as user types somthing in the input feild
    this.setState({ errors });

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderButton = (label) => {
    return (
      <button
        onClick={this.handleSubmit}
        disabled={this.validate()} //this.validate() will either return null or and object, null considers as false and object considers as true
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
