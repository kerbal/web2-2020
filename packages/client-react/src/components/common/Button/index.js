import React, { memo } from 'react';

export default memo(function Button(props) {
  const { label, onClick } = props;
  return (
    <div
      role="button"
      className="bg-black text-white text-center font-bold text-lg hover:bg-gray-700 p-2 mt-8"
      onClick={() => onClick && onClick()}
    >
      {label}
    </div>
  );
});
