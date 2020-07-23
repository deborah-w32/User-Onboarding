import React, { useState, useEffect } from 'react';
import Form from './Components/Form'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './Validation/FormSchema'
import Users from './Components/Users'
import './App.css';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialUser = []
const initialDisabled = true

function App() {
  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUser([res.data, ...user])
      setFormValues(initialFormValues)
    })
    .catch(err => {
      debugger
    })
  }

  const inputChange = (term, value) =>{
    yup
      .reach(formSchema, term)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [term]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [term]: err.errors[0]
        })
      })
      setFormValues({
        ...formValues,
        [term]: value
      })
  }

  const checkboxChange = (term, isChecked) => {
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [term]: isChecked,
      }
    })
  }

  const submit =() => {
    const newUser ={
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms)
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect (() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return(
    <div className='container'>
      <header><h1>User Onboarding</h1></header>
      
      <Form
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        user.map(users => {
          return(
            <Users key={users.id} details={users}/>
          )
        })
      }
    </div>
  )
}

export default App;
