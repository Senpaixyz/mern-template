import {useState} from 'react';

const ErrorMessage = ({ message}) => {
  return <span>{message}</span>
}

const ErrorMessageHandler = (errors) => {
    const messages = []
    if(errors.type == 'required'){
        messages.push("This is a required Field!");
    }
    if(errors.type == 'pattern'){
      messages.push("Invalid Input Pattern");
  }

  return (
    <>
      {messages.map((e, index) => {
        return <ErrorMessage key={index} message={e} />
      })}
    </>
  )
}


const InputField = (props) => {
  const StringOnly = props.stringOnly  ? { pattern: /^[A-Za-z]+$/i } : {};
  const errors = props.errors[props.name];
  return (
    <>
        <input 
        {...props.register(props.name, { required: props.isRequired, ...StringOnly })} 
        placeholder={props.placeholder} 
        type="text"
        aria-invalid={errors ? "true" : "false"}
        />
        {errors && ErrorMessageHandler(errors)}
    </>
  )
}

const EmailField = (props) => {
  const errors = props.errors[props.name];
  return (
    <>
        <input 
        {...props.register(props.name, { required: props.isRequired })} 
        placeholder={props.placeholder} 
        type="email" 
        aria-invalid={errors ? "true" : "false"}
        />
        {errors && ErrorMessageHandler(errors)}
    </>
  )
}

const PasswordField = (props) => {
  const errors = props.errors[props.name];
  return (
    <>
        <input 
        {...props.register(props.name, { required: props.isRequired })} 
        placeholder={props.placeholder} 
        type="password"
        aria-invalid={errors ? "true" : "false"
      } 
        />
        {errors && ErrorMessageHandler(errors)}
    </>
  )
}

export {
  InputField,
  EmailField,
  PasswordField
}