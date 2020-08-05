import React from 'react';
import './style.css';

export const Spinner = () => {
  return (
    <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-gray-700 absolute top-0 bottom-0 left-0 right-0 opacity-50" />
      <Spinner />
    </div>
  );
};

export default Loading;
