import {useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {EmailField, PasswordField} from './components/Input';
import {Submit} from './components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from '../../services/AuthService';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  const { register, handleSubmit, watch, formState: { errors, isDirty, isValid  } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });


  const onSubmit = async (data) => {
    setIsSubmitted(true)

    toast.promise(
        AuthService.login(data),
        {
          loading: 'Login...',
          success: (result) => {
            try {
              navigate("/auth");
              return "Login Success!"
            } catch (error) {
              console.log('ERROR INSIDE: ', error);
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

    // const result = await axios.post(
    //   `${server}/login`,
    //   data
    // );

    // console.log(result);

    // if(result.data.hasOwnProperty('status')){
    //   if(result.data.status){
    //     setUser(result.data.user);
    //     navigate("/dashboard");
    //   }
    //   else{
    //     window.alert(result.data.message);
    //   }
    // }
    // else{
    //   window.alert('An error encountered!');
    //   console.log(result);
    // }

  };


  return (
    <>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              value='Sign In' 
              disabled={isSubmitted || !isDirty || !isValid} 
              />
        </form>
    </>
  )
}

export {
  LoginForm
}