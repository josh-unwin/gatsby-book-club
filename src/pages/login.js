import React, { useState, useContext } from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import {FirebaseContext} from '../components/Firebase'

import {Form} from '../components/common/Form';
import {Input} from '../components/common/Input';
import {Button} from '../components/common/Button';

const Login = () => {
  const {firebase} = useContext(FirebaseContext);
  const [formValues, setFormValues] = useState({email: '', password: ''});

  function handleSubmit(e) {
    e.preventDefault();
    firebase.login({email: formValues.email, password: formValues.password})
  }

  function handleInputChange(e) {
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} name="email" onChange={handleInputChange} placeholder="email" type="email"/>
        <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="password" type="password"/>
        <Button type="submit" block>Submit</Button>
      </Form>
    </section>
  )
};

export default Login
