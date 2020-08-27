import React,{ useState } from 'react';

export default () => {
  const [error, setError] = useState(null);
  const errorMessage = error ? (
    <div className="text-center text-lg text-left text-red-500">{error}</div>
  ) : null;
  return [errorMessage,setError,error];
};
