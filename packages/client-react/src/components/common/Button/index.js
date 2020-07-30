import React, { memo } from 'react';

export default memo(function Button(props) {
  const { label, onClick, secondary = false, type } = props;
  return secondary ? (
    <div
      type={type || 'button'}
      className="cursor-pointer border-2 border-black text-black text-center font-bold text-lg hover:bg-gray-100 p-2 mt-8 bg-white"
      onClick={e => onClick && onClick(e)}
    >
      {label}
    </div>
  ) : (
    <div
      type={type || 'button'}
      className="cursor-pointer bg-black text-white text-center font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      onClick={e => onClick && onClick(e)}
    >
      {label}
    </div>
  );
});
