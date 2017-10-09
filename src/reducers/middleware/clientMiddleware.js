import { getData } from '../../data/dataFetcher';
import { API_MAPPINGS } from '../../constants/api/apiMappings';
import * as actionTypes from '../../constants/action-types/actionTypes';

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
    }).catch(() => {
      store.dispatch({ type: actionTypes.CALCULATE_CURRENCY, index });
    });
  };

  const getDataIfNeeded = (action) => {
    const rates = { cad: 'CAD', usd: 'USD' };
    getData(API_MAPPINGS.GET_RATES(rates.cad, rates.usd)).then(data => {
      store.dispatch({ type: actionTypes.SET_EXCHANGE_RATES, data, index: action.index });
      return;
    });
  }


  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    switch (action.type) {
      case actionTypes.SET_FROM_CURRENCY_TYPE: {
        const state = getState();
        getDataIfNeeded(action);
        break;
      }

      case actionTypes.SET_TO_CURRENCY_TYPE: {
        const state = getState();
        getDataIfNeeded(action);
        break;
      }

      case actionTypes.SET_FROM_AMOUNT: {
        const state = getState();
        getDataIfNeeded(action);
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};

