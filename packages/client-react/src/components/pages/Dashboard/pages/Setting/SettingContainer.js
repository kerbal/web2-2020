import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import withDashboardFrame from '../../withDashboardFrame';
import useForm from '../../../../../utils/useForm';
import Input from '../../../../common/Input';
import { updatePassword } from '../../slice/customerAuthSlice';

const SettingContainer = () => {
  const {
    token,
    user: { email, fullname, address, status },
  } = useSelector(state => state.customerAuth || {});
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const [
    newPassword,
    getNewPassword,
    { onFormChange, formValidator, setTouched, checkFormValidity },
  ] = useForm({
    password: {
      type: 'password',
      value: '',
      rules: {
        required: true,
        minLength: 6,
        haveDigit: true,
        noTouched: true,
      },
      validationError:
        'Please enter your password (at least 6 characters, 1 digit)',
      touched: false,
      placeholder: 'Password',
    },
    confirmPassword: {
      type: 'password',
      value: '',
      touched: false,
      placeholder: 'Re-enter password',
      validationError: 'Password and re-enter password are not matched',
    },
  });
  const key = 'password';
  const { type, value, placeholder, validationError, touched } = newPassword[
    key
  ];

  const confirmPasswordValidator = () => {
    return newPassword.confirmPassword.value === value;
  };

  const onChangePassword = () => {
    setTouched();
    if (checkFormValidity() && confirmPasswordValidator()) {
      dispatch(
        updatePassword(token, getNewPassword().password, error =>
          console.log(error)
        )
      );
    }
    setError(null);
  };

  return (
    <div style={{ flex: '1 1 66.67%', maxWidth: '66.67%' }}>
      {status !== 'VERIFIED' ? (
        <div className="pt-12 font-bold text-4xl text-center">
          <Link
            className="text-red-500 underline font-semibold cursor-pointer"
            to="/dashboard/verify"
          >
            Verify your account here
          </Link>
        </div>
      ) : null}
      <div className="pt-6 font-bold text-xl">Your information</div>
      <div className="flex">
        <div className="flex-1 pr-16">
          <Input disabled label="Email" value={email} />
        </div>
        <div className="flex-1 pr-16">
          <Input disabled label="Fullname" value={fullname} />
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 pr-16">
          <Input disabled label="Address" value={address} />
        </div>
      </div>
      <div className="pt-6 font-bold text-xl">Change password</div>
      <div className="flex">
        <div className="flex-1 pr-16 text-center">
          <Input
            key={key}
            type={type}
            id={key}
            placeholder={placeholder}
            value={value}
            validationError={validationError}
            touched={touched}
            onValueChange={onFormChange(key)}
            validator={formValidator(key)}
            checkTouched={false}
          />
          <Input
            key={newPassword.confirmPassword.key}
            type="password"
            placeholder={newPassword.confirmPassword.placeholder}
            value={newPassword.confirmPassword.value}
            validator={confirmPasswordValidator}
            validationError={newPassword.confirmPassword.validationError}
            touched={newPassword.confirmPassword.touched}
            onValueChange={onFormChange('confirmPassword')}
            checkTouched={false}
          />
          {error && (
            <p className="text-lg text-left text-red-500 mb-4">{error}</p>
          )}
          <button
            className={`${
              !value ? 'opacity-50 cursor-not-allowed' : ''
            } rounded cursor-pointer bg-black text-white text-center font-bold text-lg hover:bg-gray-700 p-2`}
            type="submit"
            onClick={onChangePassword}
            label="Login"
            disabled={!value}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default withDashboardFrame(SettingContainer);
