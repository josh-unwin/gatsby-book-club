import React, { useState, useContext } from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import {FirebaseContext} from '../components/Firebase'

import {Form, Button, Input, ErrorMessage} from '../components/common';

const Login = () => {
  const {firebase} = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
      setErrorMessage("We can't seem to find you on our records, are you sure it's the right email?")
    });
    console.log(errorMessage);
  }

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email" required />
        <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password" required />
        {errorMessage && 
        <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit" block>Submit</Button>
      </Form>
    </section>
  )
};

export default Login
