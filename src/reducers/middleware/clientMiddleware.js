import { getData } from '../../data/dataFetcher';
import { API_MAPPINGS } from '../../constants/api/apiMappings';
import * as actionTypes from '../../constants/action-types/actionTypes';

const fetchActions = [actionTypes.SET_TO_CURRENCY_TYPE, actionTypes.SET_FROM_CURRENCY_TYPE];

export const thunk = store => {
  const dispatch = store.dispatch;
  const getState = store.getState;

  const checkForNoRates = (rates) => {
    let nullRate = false;
    Object.keys(rates).forEach(key => {
      if (!rates[key]) {
        nullRate = true;
      }
    });
    return nullRate;
  }

  const getRates = (existingRates, index) => {
    const rates = { cad: 'CAD', usd: 'USD' };
    getData(API_MAPPINGS.GET_RATES(rates.cad, rates.usd)).then(data => {
      store.dispatch({ type: actionTypes.SET_EXCHANGE_RATES, data, index });
      return;
    });
  };

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    switch (fetchActions.includes(action.type)) {
      case true: {
        const state = getState();
        if (checkForNoRates(state.currency.exchangeRates)) {
          getRates(state.currency.exchangeRates, action.index);
        }
        break;
      }

      case false: {
        const state = getState();
        if (checkForNoRates(state.currency.exchangeRates)) {
          getRates(state.currency.exchangeRates, action.index);
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
