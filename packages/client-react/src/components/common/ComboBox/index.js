import React, { memo } from 'react';
import { icons } from '../../../assets';

export default memo(function ComboBox(props) {
  const { label, validator, onValueChange, value, disabled } = props;

  const onTextChange = e => {
    const text = e.target.value;
    if (validator && !validator(text)) {
      return;
    }
    if (onValueChange) {
      onValueChange(text);
    }
  };

  return (
    <div className="flex flex-col pb-4 w-full">
      <label htmlFor="email" className="text-lg text-left">
        {label}
      </label>
      <div className="relative">
        <select
          disabled={disabled}
          value={value}
          name="example"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onTextChange}
        >
          {props.children}
        </select>
        <div className="absolute opacity-50" style={{ right: 20, top: 15 }}>
          <img src={icons.combobox_arrowdown} alt="" width={14} height="auto" />
        </div>
      </div>
    </div>
  );
});
