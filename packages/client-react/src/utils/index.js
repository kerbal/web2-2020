import Moment from 'moment';

export const getCurrentDatetime = () => {
  return new Moment().format('DD/MM/YYYY HH:mm');
};

export const formatDatetime = datetime => {
  return datetime ? new Moment(datetime).format('DD/MM/YYYY HH:mm') : null;
};

export const formatCurrency = (
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) => {
  let absDecimalCount = Math.abs(decimalCount);
  absDecimalCount = Number.isNaN(absDecimalCount) ? 2 : absDecimalCount;

  const negativeSign = amount < 0 ? '-' : '';
  const absAmount = Math.abs(Number(amount) || 0).toFixed(absDecimalCount);
  const i = parseInt(absAmount, 10).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
    (decimalCount
      ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
      : '')
  );
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return isValid;
  }
  if (!value && rules.noTouched) {
    return isValid;
  }
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.haveDigit) {
    const pattern = /\d/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.dob) {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) isValid = Number.isNaN(timestamp) && isValid;
    else {
      const date = new Date(value);
      isValid = date < new Date() && date > new Date('1900-1-1') && isValid;
    }
  }
  return isValid;
};
