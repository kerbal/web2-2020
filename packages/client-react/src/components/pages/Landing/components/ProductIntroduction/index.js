import React from 'react';
import { icons } from '../../../../../assets';

const Container = ({ children }) => {
  return (
    <div className="container px-12 mx-auto justify-center content-center items-center w-full flex flex-col">
      {children}
    </div>
  );
};

const PersonalAccountIcons = () => {
  return (
    <div
      id="personal-account"
      className="flex flex-row w-1/3 justify-center sm:justify-between opacity-50"
    >
      <img width={64} height="auto" alt="" src={icons.landing_cc_visa_brands} />
      <img
        width={64}
        height="auto"
        alt=""
        src={icons.landing_cc_mastercard_brands}
      />
      <img width={64} height="auto" alt="" src={icons.landing_cc_jcb_brands} />
    </div>
  );
};

const PersonalAccount = () => {
  return (
    <div>
      <div className="text-3xl py-6 text-center">
        explore our personal account package
      </div>
      <div className="max-w-3xl">
        <p className="text-xl font-light text-center">
          Using our personal account, you can transfer your money at lightning
          speed. The moment you’re done with it, the money will come to the
          destination account in no time!
        </p>
      </div>
    </div>
  );
};

const SavingAccountIcon = () => {
  return (
    <div
      id="saving-account"
      className="flex flex-row justify-between opacity-50 pt-6"
    >
      <img
        width={48}
        height="auto"
        alt=""
        src={icons.landing_dollar_sign_solid}
      />
    </div>
  );
};

const SavingAccount = () => {
  return (
    <div>
      <div className="text-3xl py-6 text-center">
        explore our saving account package
      </div>
      <div className="max-w-3xl">
        <p className="text-xl font-light text-center">
          Using our saving account, you money is safely saved with an appealing
          interest! (Up to 12%/month)
        </p>
      </div>
    </div>
  );
};

const OpenAccountButton = props => {
  const { onRegisterAccount } = props;
  return (
    <button
      className="my-12 p-6 shadow-2xl text-xl rounded-lg"
      onClick={() => onRegisterAccount && onRegisterAccount()}
      type="button"
    >
      Open an Account Now
    </button>
  );
};

const ProductIntroduction = props => {
  return (
    <Container>
      <PersonalAccountIcons />
      <PersonalAccount />
      <SavingAccountIcon />
      <SavingAccount />
      <OpenAccountButton {...props} />
    </Container>
  );
};

export default ProductIntroduction;
