import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import RegisterComponent from './RegisterComponent';
import { useForm } from '../../../../../utils/hooks';
import { registerFormSetup } from '../../../../../utils/formSetup';
import withProtected from '../../withProtected';

const RegisterContainer = () => {
  const history = useHistory();
  const [
    registerForm,
    getRegisterData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm(registerFormSetup);
  const onRegister = () => {
    setTouched();
    if (checkFormValidity()) {
      const url = 'https://piggy-bank-api.herokuapp.com/api/auth/register';
      axios
        .post(url, getRegisterData())
        .then(() => {
          history.push('/dashboard/login');
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  };
  return (
    <RegisterComponent
      onRegister={onRegister}
      registerForm={registerForm}
      formValidator={formValidator}
      onFormChange={onFormChange}
    />
  );
};

export default withProtected(null, true)(RegisterContainer);
