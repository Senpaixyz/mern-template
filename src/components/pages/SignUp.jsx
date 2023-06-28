import {useState, useContext } from 'react';
import {ApplicationContext} from '../../utils/AppContext'

import {RegisterForm} from '../tools/Register';
import {LoginForm} from '../tools/Login';

const SignUp = () => {

  return (
    <>
        <RegisterForm />
        <LoginForm />
    </>
  )
}

export default SignUp;