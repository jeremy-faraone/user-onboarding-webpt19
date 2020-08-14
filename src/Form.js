import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import "./form.css";

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    why: "",
    terms: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    why: "",
    terms: "",
  });

  const [post, setPost] = useState([]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data);
        setFormState({
          name: "",
          email: "",
          password: "",
          why: "",
          terms: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  const inputChange = (e) => {
    e.persist();
    console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    validateChange(e);
    setFormState(newFormData);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include email"),
    password: yup.string().required("Please enter password"),
    why: yup.string().required("Please let us know why you want to join"),
    terms: yup.boolean().oneOf([true], "Please agree to Terms amd Conditions"),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  }, [formState]);

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name" className="titles">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="email" className="titles">
        Email
        <input
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>

      <label htmlFor="password" className="titles">
        Password
        <input
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={inputChange}
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>

      <label htmlFor="why" className="titles">
        Why would you like to join our program?
        <textarea
          id="why"
          name="why"
          value={formState.why}
          onChange={inputChange}
        />
        {errors.why.length > 0 ? <p className="error">{errors.why}</p> : null}
      </label>

      <label htmlFor="terms" className="titles">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
        Terms and Conditions
      </label>

      <button disabled={buttonDisabled} type="submit">
        Submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}
