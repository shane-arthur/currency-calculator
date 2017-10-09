
import * as types from '../constants/action-types/ActionTypes';
import { inputUtils } from '../common-utils/inputUtils';

export function setFromAmount(index, amount) {
  const newAmount = inputUtils.formatValue(amount.target.value);
  return { type: types.SET_FROM_AMOUNT, amount: newAmount, index };
}

export function setFromCurrencyType(index, typeToSet) {
  return { type: types.SET_FROM_CURRENCY_TYPE, typeToSet: typeToSet.target.value, index };
}

export function setToCurrencyType(index, typeToSet) {
  return { type: types.SET_TO_CURRENCY_TYPE, typeToSet: typeToSet.target.value, index };
}

export function toggleDisclaimer(index) {
  return { type: types.TOGGLE_DISCLAIMER, index };
}

export function setExchangeRates(rates) {
  return { type: types.SET_EXCHANGE_RATES, rates };
}
