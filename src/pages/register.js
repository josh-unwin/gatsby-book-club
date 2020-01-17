import React, {useState, useContext} from 'react';
import {Form, Button, Input, ErrorMessage} from '../components/common';
import {FirebaseContext} from '../components/Firebase';

const Register = () => {
  const {firebase} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  function handleInputChange(e) {
    e.persist();
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues);

    if(formValues.password === formValues.confirmPassword) {
      firebase.register(formValues.email, formValues.password, formValues.username).catch(error => {
        setErrorMessage(error.message)
      })
    } else {
      setErrorMessage("Passwords do not match")
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input onChange={handleInputChange} value={formValues.email} type="email" placeholder="email" required name="email" />
      <Input onChange={handleInputChange} value={formValues.username} type="text" placeholder="username" required name="username" />
      <Input onChange={handleInputChange} value={formValues.password} type="password" placeholder="password" required minLength={6} name="password" />
      <Input onChange={handleInputChange} value={formValues.confirmPassword} type="password" placeholder="confirm password" required minLength={6} name="confirmPassword" />
      {!!errorMessage && 
        <ErrorMessage>{errorMessage}</ErrorMessage>
      }
      <Button type="submit" block>Submit</Button>
    </Form>
  )
}

export default Register