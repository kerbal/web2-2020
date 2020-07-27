import Moment from 'moment';

export const getCurrentDatetime = () => {
  return new Moment().format('DD/MM/YYYY HH:mm');
};

export const formatDatetime = datetime => {
  return new Moment(datetime).format('DD/MM/YYYY HH:mm');
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
