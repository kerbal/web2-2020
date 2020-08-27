import React, { useState } from 'react';
import ComboBox from '../../../../common/ComboBox';

export default ({ onConfirm }) => {
  const [type, setType] = useState('CHECKING');
  const [depositTypeID, setDepositTypeID] = useState(2);
  const [cU, setCU] = useState('VND');
  const [isCreating, setIsCreating] = useState(false);
  const showButton = (
    <div className="px-2">
      <button
        onClick={() => setIsCreating(true)}
        className="w-full rounded bg-black text-white text-center font-bold text-lg hover:bg-gray-700 py-1 px-3 border-2 border-black"
      >
        Create account
      </button>
    </div>
  );

  const createForm = (
    <>
      <div className="px-2" style={{ flex: '1 1 33.33%', maxWidth: '33.33%', flexWrap: "warp" }}>
        <ComboBox
          label="Type"
          onValueChange={typeDeposit => {
            setType(typeDeposit);
          }}
          value={type}
        >
          <option value="DEPOSIT">DEPOSIT</option>
          <option value="CHECKING">CHECKING</option>
        </ComboBox>
      </div>
      {type === 'DEPOSIT' ? (
        <div
          className="px-2"
          style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
        >
          <ComboBox
            label="Deposit Type"
            onValueChange={id => {
              setDepositTypeID(+id);
            }}
            value={depositTypeID}
            disabled={type !== 'DEPOSIT'}
          >
            <option value={1}>3 months, 1%/month</option>
            <option value={2}>6 months, 3%/month</option>
            <option value={3}>12 months, 6%/month</option>
          </ComboBox>
        </div>
      ) : null}
      <div
        className="px-2 flex"
        style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}
      >
        <ComboBox
          label="Currency"
          onValueChange={currencyUnit => {
            setCU(currencyUnit);
          }}
          value={cU}
        >
          <option value="VND">VND </option>
          <option value="USD">USD</option>
        </ComboBox>
      </div>
      <div
        className="px-2 flex pb-4"
        style={{ flex: '1 1 25%' }}
      >
        <div className="flex-1 mt-auto pr-4">
          <button
            onClick={() => onConfirm(type, depositTypeID, cU)}
            className="w-full rounded bg-black text-white text-center font-bold text-lg hover:bg-gray-700 py-1 px-3 border-2 border-black"
          >
            Confirm
          </button>
        </div>
        <div className="flex-1 mt-auto">
          <button
            onClick={() => setIsCreating(false)}
            className="w-full rounded bg-white text-black text-center font-bold text-lg hover:bg-gray-300 py-1 px-3 border-2 border-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
  return (
    <div className="flex flex-1 mb-2 pl-4">
      {isCreating ? createForm : showButton}
    </div>
  );
};
