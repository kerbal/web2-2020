import React, { memo } from 'react';

export default memo(function Input(props) {
  const { label, type, id, placeholder, value, validator, onValueChange } = props;

  const onTextChange = (e) => {
    const text = e.target.value;
    if (validator && !validator(text)) {
      return;
    }
    onValueChange && onValueChange(text)
  }

  return (
    <div class="flex flex-col pt-4">
      <label for="email" class="text-lg text-left">
        {label}
      </label>
      <input
        value={value}
        onChange={onTextChange}
        type={type}
        id={id}
        placeholder={placeholder}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
});
