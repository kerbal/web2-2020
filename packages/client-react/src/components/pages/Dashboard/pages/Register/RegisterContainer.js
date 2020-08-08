import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useCustomerCheck from '../../utils/useCustomerCheck';
import RegisterComponent from './RegisterComponent';
import useForm from '../../../../../utils/useForm';
import { registerFormSetup } from '../../../../../utils/formSetup';

const RegisterContainer = () => {
  const history = useHistory();
  const [
    registerForm,
    getRegisterData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
    [loading, setLoading],
  ] = useForm(registerFormSetup, true);

  const onRegister = () => {
    setTouched();
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
          console.log(response);
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
      onFormChange={onFormChange}
      loadingForm={loading}
    />
  );
};

export default RegisterContainer;
