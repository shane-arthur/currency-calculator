import React from 'react';
import { Router, Route } from 'react-router';
import CurrencyCalculatorContainer from '../containers/currency-calculator/currencyCalculatorContainer';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={CurrencyCalculatorContainer} />
    </Router>
  );
}
