import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from './MyTextField';
import * as Yup from 'yup';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function SignIn(){

  const history = useHistory();
  function navigateHome(){    
    history.push("/")
    window.location.reload();
  }


  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })  


  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}

      validationSchema={validate}

      onSubmit={values => {
        try{
          axios.post('http://localhost:5000/api/auth/', values, {withCredentials: true, credentials: 'include'})
            .then(()=>navigateHome());
          }catch(e){
            console.error(e)
          }
      }}
    >


      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
          <Form>
            <MyTextField label="Email" name="email" type="email" />
            <MyTextField label="Password" name="password" type="password" />
            <button className="btn btn-dark mt-3" type="submit">Sign In</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}


    </Formik>
  )
}