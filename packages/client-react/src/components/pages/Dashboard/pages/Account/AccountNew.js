import React, { useState } from 'react';
import ComboBox from '../../../../common/ComboBox';

export default ({ onConfirm }) => {
  const [type, setType] = useState('CHECKING');
  const [depositType, setDepositType] = useState(2);
  const [cU, setCU] = useState('VND');
  return (
    <>
      <div className="px-2" style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}>
        <ComboBox
          label="Type"
          onValueChange={type => {
            setType(type);
          }}
          value={type}
        >
          <option value="DEPOSIT">DEPOSIT</option>
          <option value="CHECKING">CHECKING</option>
        </ComboBox>
      </div>
      <div className="px-2" style={{ flex: '1 1 33.33%', maxWidth: '33.33%' }}>
        <ComboBox
          label="Deposit Type"
          onValueChange={type => {
            setDepositType(type);
          }}
          value={depositType}
          disabled={type !== 'DEPOSIT'}
        >
          <option value={1}>3 months, 1%/month</option>
          <option value={2}>6 months, 3%/month</option>
          <option value={3}>12 months, 6%/month</option>
        </ComboBox>
      </div>
      <div className="px-2 flex items-end flex-initial">
        <div>
          <ComboBox
            label="Currency Unit"
            onValueChange={currencyUnit => {
              setCU(currencyUnit);
            }}
            value={cU}
          >
            <option value={'VND'}>VND</option>
            <option value={'USD'}>USD</option>
          </ComboBox>
        </div>
        <div className="p-4">
          <button
            onClick={() => onConfirm(type, depositType, cU)}
            className="rounded w-full inline-block cursor-pointer bg-black text-white text-center font-bold text-lg hover:bg-gray-700 pb-1 pt-2 mt-1 px-3"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};
