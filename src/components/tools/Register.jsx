import {useState, useContext } from 'react';

import { useForm } from "react-hook-form";

import {InputField, EmailField, PasswordField} from './components/Input';
import {Submit} from './components/Button';

import AuthService from '../../services/AuthService';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

const RegisterForm = () => {

  const [isSubmitted, setIsSubmitted] = useState();

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Password should contains a lowercase, a uppercase character and a digit.')
  });

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsSubmitted(true)

    toast.promise(
        AuthService.register(data),
        {
          loading: 'Registering...',
          success: (result) => {
            try {
              console.log('Result: ', result.data.message);
              return result.data.message;
            } catch (error) {
              throw new Error(error);
            }
          },
          error: (error) => {
            console.error('ERROR');
            console.log(error);
            if(error && error.data.hasOwnProperty('message')){
              return error.data.message;
            }
            else{
              return "There's something wrong, Please try again!";
            }
          }
        }
    );



    setIsSubmitted(false)
  };

  return (
    <>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                register={register}
                name="name"
                placeholder="Name"
                isRequired={true}
                errors={errors}
                stringOnly={true}
              />
              <EmailField
                register={register}
                name="email"
                placeholder="Email"
                isRequired={true}
                errors={errors}
              />
              <PasswordField
                register={register}
                name="password"
                placeholder="Password"
                isRequired={true}
                errors={errors}
              />
              <Submit 
              value='Sign Up' 
              disabled={isSubmitted || !isDirty || !isValid} 
              />
        </form>
    </>
  )
}

export {
  RegisterForm
};