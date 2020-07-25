import React from 'react';
import ComboBox from '../../../../common/ComboBox';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

const Container = props => {
  return <div className="flex-1 p-6">{props.children}</div>;
};

const Transfer = () => {
  let options = ['A', 'B'];
  return (
    <Container>
      <div className="pb-6 font-bold text-xl">Create a Transfer</div>
      <div className="flex">
        <div className="w-1/3">
          <ComboBox label="Source Account" options={options} />
        </div>
        <div className="pl-6 w-1/3">
          <Input label="Remaining Balance" disabled />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3">
          <ComboBox label="Destination Bank" options={options} />
        </div>
        <div className="pl-6 w-1/3">
          <Input label="Destination Account Number" />
        </div>
      </div>
      <div className="w-2/3">
        <Input label="Amount" />
      </div>
      <div className="w-2/3">
        <Input label="Note" />
      </div>
      <div className="w-2/3 flex">
        <div className="w-3/4">
          <Input label="Verified OTP" />
        </div>
        <div className="align-text-bottom self-end pb-2 pl-6">Get OTP Code</div>
      </div>
      <div className="w-2/3 flex">
        <div className="w-1/3">
          <Button label="Make Transfer" />
        </div>
        <div className="w-1/3 pl-6">
          <Button label="Reset All" secondary />
        </div>
      </div>
    </Container>
  );
};

export default Transfer;
