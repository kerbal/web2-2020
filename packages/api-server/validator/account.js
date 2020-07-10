import ACCOUNT_TYPE from '../constants/accountType';
import ACCOUNT_STATUS from '../constants/accountStatus';
const sourceAccountNumber = {
  isString: {
    errorMessage: 'Source account id must be a string.',
  },
  isLength: {
    options: { max: 16, min:16 },
    errorMessage: 'Source account id must contain 16 numbers.',
  },
};
const userCreateAccountValidator = (req, res, next) => {
  req.checkBody({
    accountType: {
      notEmpty: {
        errorMessage: 'Account type is required.',
      },
      custom: {
        options: (value) => {
          return [ACCOUNT_TYPE.CHECKING, ACCOUNT_TYPE.DEPOSIT].includes(value);
        },
        errorMessage: 'Invalid account type.',
      },
    },
    amount: {
      notEmpty: {
        errorMessage: 'Amount is required.',
      },
      isDecimal: {
        errorMessage: 'Amount is decimal.',
      },
      toFloat: true,
    },
    sourceAccountNumber,
  });
  if(req.body.accountType === ACCOUNT_TYPE.DEPOSIT) {
    req.checkBody({
      depositAccountTypeId: {
        custom: {
          options: (value) => {
            return [1, 2, 3].includes(value);
          },
          errorMessage: 'Invalid deposit account type id.',
        },
      },
    });
  }
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  }
  next();
};
const userChangeAccountStatusValidator = (req, res, next) => {
  req.checkBody({
    sourceAccountNumber,
    newStatus: {
      custom: {
        options: (value) => {
          return [ACCOUNT_STATUS.NORMAL, ACCOUNT_STATUS.LOCKED].includes(value);
        },
        errorMessage: 'Invalid account type.',
      },
    },
  });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({
      error: firstError,
    });
  }
  next();
};
export {
  userCreateAccountValidator,
  userChangeAccountStatusValidator,
};
