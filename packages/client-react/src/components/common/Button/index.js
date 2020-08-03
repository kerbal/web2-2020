import React, { memo } from 'react';

export default memo(function Button(props) {
  const { label, onClick, secondary = false, type, children } = props;
  let content = label;
  if (children) content = children;
  const className = [
    'relative w-full inline-block cursor-pointer',
    'font-bold text-center text-lg',
    'rounded border-2 border-black p-2 mt-8',
    secondary
      ? 'text-black hover:bg-gray-100 bg-white'
      : 'bg-black text-white hover:bg-gray-700',
  ].join(' ');
  return secondary ? (
    <button type={type || 'button'} className={className} onClick={onClick}>
      {content}
    </button>
  ) : (
    <button type={type || 'button'} className={className} onClick={onClick}>
      {content}
    </button>
  );
});
