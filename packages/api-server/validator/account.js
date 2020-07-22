import ACCOUNT_TYPE from '../constants/accountType';
const accountId = {
  notEmpty: {
    errorMessage: 'Account ID is required.',
  },
};
const customerCreateValidator = (req, res, next) => {
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
    const firstError = errors[0];
    return res.status(400).json({
      error: firstError.msg,
    });
  }
  next();
};
const customerToggleStatusValidator = (req, res, next) => {
  req.checkBody({
    accountId,
  });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors[0];
    return res.status(400).json({
      error: firstError.msg,
    });
  }
  next();
};
export {
  customerCreateValidator,
  customerToggleStatusValidator,
};
