import React from 'react';
import Dropdown from '../../../../common/Dropdown';
import Input from '../../../../common/Input';
import { formatCurrency } from '../../../../../utils';
import Loading from '../../../../common/Loading';

const TopupComponent = props => {
  const {
    accountData,
    selectedAccount,
    setSelectedAccount,
    loading,
    amount,
    setAmount,
  } = props;

  const FieldContainer = props => {
    const { children } = props;
    return <div className="flex items-center">{children}</div>;
  };

  const FieldText = props => {
    const { children } = props;
    return <div className="">{children}</div>;
  };

  const FieldContent = props => {
    const { children } = props;
    return <div className="pl-6">{children}</div>;
  };

  const TopupForm = () => {
    return (
      <div>
        <FieldContainer>
          <FieldText>Account:</FieldText>
          <FieldContent>
            <div className="w-full">
              <Dropdown
                selectedItem={selectedAccount}
                setSelectedItem={setSelectedAccount}
                data={accountData.map(
                  item =>
                    `Account Number: ${
                    item.account_number
                    } - Balance: ${formatCurrency(item.balance)}`
                )}
                placeholder="Choose an account    "
              />
            </div>
          </FieldContent>
        </FieldContainer>
        <FieldContainer>
          <div className="pt-4">
            <FieldText>Amount:</FieldText>
          </div>
          <FieldContent>
            <div className="pt-6">
              <Input
                type="text"
                value={amount}
                onValueChange={value => setAmount(value)}
              />
            </div>
          </FieldContent>
        </FieldContainer>
        {loading && <Loading />}
      </div>
    );
  };

  return <TopupForm />;
};

export default TopupComponent;
