import React, { useState } from 'react';
import Input from '../../../../common/Input';

const VerifyTransaction = props => {
  const { transaction } = props;
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [otp, setOTP] = useState(null);

  const verifyTransaction = () => {
    return false;
  };

  return (
    <div>
      {success ? (
        <div className="text-green-500 font-bold text-center w-2/3">
          Successfully transfer money
        </div>
      ) : (
        <div>
          <div className="w-2/3 mb-4">
            <Input
              label="OTP"
              value={otp}
              disabled={verifying}
              onValueChange={value => setOTP(value)}
            />
          </div>
          <button
            type="button"
            className="bg-blue-900 text-white w-2/3 rounded shadow-lg text-lg p-3 button"
            onClick={() => {
              setVerifying(true);
              setSuccess(true);
              verifyTransaction();
            }}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyTransaction;
