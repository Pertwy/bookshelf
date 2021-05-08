import React from 'react';
import { Formik, Form } from 'formik';
import MyTextField from './MyTextField';
import * as Yup from 'yup';

export default function SignIn(){
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
        lastName: '',
        email: '',
      }}

      validationSchema={validate}

      onSubmit={values => {
        console.log(values)
      }}
    >


      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
          <Form>
            <MyTextField label="Email" name="email" type="email" />
            <MyTextField label="Password" name="password" type="password" />
            <button className="btn btn-dark mt-3" type="submit">Register</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}


    </Formik>
  )
}