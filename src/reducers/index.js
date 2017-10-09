/* eslint arrow-body-style: 0*/
import currency from './currencyReducer';

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key]( // eslint-disable-line no-param-reassign
          state[key],
          action,
        );
        return nextState;
      },
      {},
    );
  };
};

const rootReducer = combineReducers({
  currency
});

export default rootReducer;
