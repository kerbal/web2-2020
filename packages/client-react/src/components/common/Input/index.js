import React, { memo } from 'react';

export default memo(function Input(props) {
  const {
    label,
    type,
    id,
    placeholder,
    value,
    validator,
    onValueChange,
    disabled = false,
  } = props;

  const onTextChange = e => {
    const text = e.target.value;
    if (validator && !validator(text)) {
      return;
    }
    if (onValueChange) onValueChange(text);
  };

  return (
    <div className="flex flex-col pt-4">
      <label htmlFor="email" className="text-lg text-left">
        {label}
      </label>
      <input
        disabled={disabled}
        value={value}
        onChange={onTextChange}
        type={type}
        id={id}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
});
