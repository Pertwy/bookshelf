import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from './MyTextField';
import * as Yup from 'yup';
import axios from "axios"
import {useHistory} from 'react-router-dom';

export default function Signup(){
  
    const history = useHistory();
    function navigateHome(){    
      history.push("/")
    }


  const validate = Yup.object({
    userName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    givenName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    surname: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
    bio: Yup.string()
        .max(145, 'Must be 255 characters or less')
  })



  return (
    <Formik
      initialValues={{
        userName: '',
        givenName: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio:''
      }}

      validationSchema={validate}

      onSubmit={values => {
        // console.log(values)
        try{
          axios.post('http://localhost:5000/api/users/add', values )
            .then(()=>navigateHome());
          }catch(e){
            console.error(e)
          }
      }}
    >


      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            <MyTextField label="User Name" name="userName" type="text" />
            <MyTextField label="Given Name" name="givenName" type="text" />
            <MyTextField label="Surname" name="surname" type="text" />
            <MyTextField label="Email" name="email" type="email" />
            <MyTextField label="Password" name="password" type="password" />
            <MyTextField label="Confirm Password" name="confirmPassword" type="password" />
            <MyTextField label="Bio" name="bio" type="text" />
            <button className="btn btn-dark mt-3" type="submit">Register</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}


    </Formik>
  )
}