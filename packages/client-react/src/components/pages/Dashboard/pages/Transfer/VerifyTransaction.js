import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Input from '../../../../common/Input';
import axios from '../../../../../utils/axios';
import Loading from '../../../../common/Loading';

const VerifyTransaction = props => {
  const { transactionId, refresh } = props;
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [otp, setOTP] = useState(null);
  const token = useSelector(state => state.customerAuth.token);
  const [loading, setLoading] = useState(false);

  const verifyTransaction = async () => {
    setLoading(true);
    setError(null);
    setVerifying(false);
    try {
      await axios.post(
        `/transaction/${transactionId}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      setVerifying(false);
      setError(_.get(err, 'response.data.message') || err.message);
    }
    setLoading(false);
  };

  const registerOTP = async () => {
    setLoading(true);
    setError(null);
    setVerifying(false);
    try {
      await axios.put(
        `/transaction/${transactionId}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      setVerifying(false);
      setError(_.get(err, 'response.data.message') || err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loading />}
      {success ? (
        <div className="text-green-500 font-bold text-center w-2/3">
          <p>Successfully transfer money</p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={refresh}
              className="border border-green-500 text-green-500 p-2 rounded m-2"
            >
              Continue transfering money
            </button>
          </div>
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
          <div className="flex flex-wrap w-2/3 justify-around">
            <div className="w-1/2 pr-2">
              <button
                type="button"
                className="bg-blue-900 text-white w-full rounded shadow-lg text-lg p-3 button"
                onClick={() => {
                  verifyTransaction();
                }}
              >
                Verify
              </button>
            </div>
            <div className="w-1/2 pl-2">
              <button
                type="button"
                className="bg-blue-900 text-white w-full rounded shadow-lg text-lg p-3 button"
                onClick={() => {
                  registerOTP();
                }}
              >
                Send another OTP
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-lg text-red-500">{error}</p>}
    </div>
  );
};

export default VerifyTransaction;
