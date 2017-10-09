
/* eslint camelcase : 0, no-use-before-define: 0*/
import { SET_FROM_AMOUNT, SET_FROM_CURRENCY_TYPE, SET_TO_CURRENCY_TYPE, SET_EXCHANGE_RATES, TOGGLE_DISCLAIMER } from '../constants/action-types/ActionTypes';
import { initialCalculationState } from '../constants/initial-state/initialState';
import { stateUtils } from './utils/stateUtils';


export default function currencyReducer(state = initialCalculationState, action) {
  switch (action.type) {

    case TOGGLE_DISCLAIMER:
      return stateUtils.toggleDisclaimer(state, action.index);

    case SET_FROM_AMOUNT:
      state = stateUtils.setFromAmount(state, action.amount, action.index);
      return stateUtils.calculateCurrency(state, action.amount, action.index);

    case SET_TO_CURRENCY_TYPE:
      state = stateUtils.setToCurrencyType(state, action.typeToSet, action.index);
      return stateUtils.calculateCurrency(state, state.displayValues[action.index].fromValue, action.index);

    case SET_FROM_CURRENCY_TYPE:
      state = stateUtils.setFromCurrencyType(state, action.typeToSet, action.index);
      return stateUtils.calculateCurrency(state, state.displayValues[action.index].fromValue, action.index);

    case SET_EXCHANGE_RATES:
      state = stateUtils.setExchangeRates(state, action.data, action.index);
      return stateUtils.calculateCurrency(state, state.displayValues[action.index].fromValue, action.index);
    default:
      return state;
  }
}