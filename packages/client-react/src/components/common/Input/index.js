import React, { memo } from 'react';

export default memo(function Input(props) {
  const {
    label,
    type,
    id,
    name,
    placeholder,
    value,
    validator,
    validationError,
    onValueChange,
    touched,
    disabled = false,
    required = true,
  } = props;

  let errorMessage = null;
  if (validationError && touched && validator && !validator()) {
    errorMessage = (
      <label htmlFor={name} className="text-lg text-left text-red-500">
        {validationError}
      </label>
    );
  }

  const onTextChange = e => {
    const text = e.target.value;
    if (onValueChange) onValueChange(text);
  };

  return (
    <div className="flex flex-col pb-4">
      <label htmlFor={name} className="text-lg text-left">
        {label}
      </label>
      <input
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onTextChange}
        type={type}
        id={id}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
      />
      {errorMessage}
    </div>
  );
});
