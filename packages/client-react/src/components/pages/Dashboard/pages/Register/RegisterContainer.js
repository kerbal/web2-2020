import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useCustomerCheck from '../../utils/useCustomerCheck';
import RegisterComponent from './RegisterComponent';
import useForm from '../../../../../utils/useForm';
import useError from '../../../../../utils/useError';
import { registerFormSetup } from '../../../../../utils/formSetup';

const RegisterContainer = () => {
  const history = useHistory();
  const [
    registerForm,
    getRegisterData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
    [loading, setLoading],
  ] = useForm(registerFormSetup, true);
  const [errorMessage, setError] = useError();
  const onRegister = e => {
    e.preventDefault();
    setTouched();
    setError(null);
    if (checkFormValidity()) {
      setLoading(true);
      const url = 'https://piggy-bank-api.herokuapp.com/api/auth/register';
      axios
        .post(url, getRegisterData())
        .then(() => {
          history.replace('/dashboard/login');
          setLoading(false);
        })
        .catch(({ response }) => {
          setError(response.data.error);
          setLoading(false);
        });
    }
  };
  useCustomerCheck(customer => customer, '/dashboard/overview');
  return (
    <RegisterComponent
      onRegister={onRegister}
      registerForm={registerForm}
      formValidator={formValidator}
      onFormChange={key => e => {
          setError(null);
          onFormChange(key)(e);
        }}
      loadingForm={loading}
      errorMessage={errorMessage}
    />
  );
};

export default RegisterContainer;
