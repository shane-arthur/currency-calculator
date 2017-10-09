// eslint-disable-next-line import/prefer-default-export
export const API_MAPPINGS = {
  GET_RATES: (firstCurrency, secondCurrency) => { return `api.fixer.io/latest?symbols=${firstCurrency},${secondCurrency}`; }
};
