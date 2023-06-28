import {useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import {Submit} from './components/Button';
import AuthService from '../../services/AuthService';

const Logout = ({form}) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleSubmit, formState: { errors, isDirty, isValid  } } = useForm({
    mode: 'all'
  });

  const onSubmit = async () => {
    setIsSubmitted(true)

    toast.promise(
        AuthService.logout(),
        {
          loading: 'Logout...',
          success: (result) => {
            try {
              setTimeout(()=> {
                // add delay before doing some redirect stuff..
                navigate("/signup");
              },2000);
              return "Redirecting...";
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
  }


  return (
    <>
        {!form &&
          <form onSubmit={handleSubmit(onSubmit)}>
                <Submit 
                value='Logout' 
                disabled={isSubmitted || !isDirty || !isValid} 
                />
          </form> 
          ||
          <button onClick={onSubmit}
            disabled={isSubmitted || !isDirty || !isValid} 
          >Logoutss</button>
        } 
    </>
  )
}

export default Logout;