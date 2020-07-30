import React, { memo } from 'react';

export default memo(function Button(props) {
  const { label, onClick, secondary = false, type } = props;
  return secondary ? (
    <button
      type={type || 'button'}
      className="w-full block cursor-pointer border-2 border-black text-black text-center font-bold text-lg hover:bg-gray-100 p-2 mt-8 bg-white"
      onClick={onClick}
    >
      {label}
    </button>
  ) : (
    <button
      type={type || 'button'}
      className="w-full block cursor-pointer bg-black text-white text-center font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      onClick={onClick}
    >
      {label}
    </button>
  );
});
