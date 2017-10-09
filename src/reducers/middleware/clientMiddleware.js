import { getData } from '../../data/dataFetcher';
import { API_MAPPINGS } from '../../constants/api/apiMappings';
import * as actionTypes from '../../constants/action-types/actionTypes';

export const thunk = store => {
  const dispatch = store.dispatch;
  const getState = store.getState;


  const checkForNoRates = (rates) => rates.default;

  const getRates = (existingRates, index) => {
    const rates = { cad: 'CAD', usd: 'USD' };
    getData(API_MAPPINGS.GET_RATES(rates.cad, rates.usd)).then(data => {
      store.dispatch({ type: actionTypes.SET_EXCHANGE_RATES, data, index });
    }).catch(() => {
      store.dispatch({ type: actionTypes.CALCULATE_CURRENCY, index });
    });
  };

  const getDataIfNeeded = (action, state) => {
    const exchangeRates = state.currency.exchangeRates;
    if (checkForNoRates(exchangeRates)) {
      getRates(exchangeRates, action.index);
    }
  };

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    switch (action.type) {
      case actionTypes.SET_FROM_CURRENCY_TYPE: {
        const state = getState();
        getDataIfNeeded(action, state);
        break;
      }

      case actionTypes.SET_TO_CURRENCY_TYPE: {
        const state = getState();
        getDataIfNeeded(action, state);
        break;
      }

      case actionTypes.SET_FROM_AMOUNT: {
        const state = getState();
        getDataIfNeeded(action, state);
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};

