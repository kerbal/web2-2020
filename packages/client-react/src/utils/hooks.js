import { useState } from 'react';
import { checkValidity } from './index';

export const useLoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    email: {
      value: '',
      rules: {
        required: true,
        isEmail: true,
      },
      validationError: 'Please enter a valid email',
      touched: false,
    },
    password: {
      value: '',
      rules: {
        required: true,
      },
      validationError: 'Please enter your password',
      touched: false,
    },
  });
  const onLoginFormChange = field => {
    return value => {
      const newField = {
        ...loginForm[field],
        value,
        touched: true,
      };
      const newLoginForm = {
        ...loginForm,
        [field]: newField,
      };
      setLoginForm(newLoginForm);
    };
  };

  const formValidator = field => {
    const { value, rules } = loginForm[field];
    return () => {
      return checkValidity(value, rules);
    };
  };
  return [
    loginForm,
    {
      email: loginForm.email.value,
      password: loginForm.password.value,
    },
    onLoginFormChange,
    formValidator,
  ];
};

export default {
  useLoginForm,
};
