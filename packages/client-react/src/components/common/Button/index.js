import React, { memo } from 'react';

export default memo(function Button(props) {
  const { label, onClick, secondary = false } = props;
  return secondary ? (
    <div
      role="button"
      className="text-black text-center font-bold text-lg hover:bg-gray-100 p-2 mt-8 bg-white"
      onClick={() => onClick && onClick()}
    >
      {label}
    </div>
  ) : (
    <div
      role="button"
      className={`bg-black text-white text-center font-bold text-lg hover:bg-gray-700 p-2 mt-8`}
      onClick={() => onClick && onClick()}
    >
      {label}
    </div>
  );
});
