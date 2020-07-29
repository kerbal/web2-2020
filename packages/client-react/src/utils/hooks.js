import { useState } from 'react';
import { checkValidity } from './index';

export const useForm = initialState => {
  const [form, setForm] = useState(initialState);

  const setTouched = () => {
    const touchedForm = Object.entries(form)
      .map(([key, data]) => {
        return [
          key,
          {
            ...data,
            touched: true,
          },
        ];
      })
      .reduce((p, [key, value]) => {
        const prevObject = p;
        prevObject[key] = value;
        return p;
      }, {});
    setForm(touchedForm);
  };

  const onFormChange = field => {
    return value => {
      const newField = {
        ...form[field],
        value,
        touched: true,
      };
      const newForm = {
        ...form,
        [field]: newField,
      };
      setForm(newForm);
    };
  };

  const formValidator = field => {
    const { value, rules } = form[field];
    return () => {
      return checkValidity(value, rules);
    };
  };

  const checkFormValidity = () => {
    const isFormValid = Object.values(form).every(({ value, rules }) => {
      return checkValidity(value, rules);
    });
    return isFormValid;
  };

  const getFormData = () => {
    return Object.keys(form).reduce((p, key) => {
      const dataObject = p;
      const keyData = form[key].mapToData || key;
      dataObject[keyData] = form[key].value;
      return dataObject;
    }, {});
  };

  return [
    form,
    getFormData,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ];
};

export default {
  useForm,
};
