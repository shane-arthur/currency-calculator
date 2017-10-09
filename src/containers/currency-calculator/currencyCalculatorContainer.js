import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { API_MAPPINGS } from '../../constants/api/apiMappings';
import React, { Component } from 'react'; // eslint-disable-line import/first
import * as ViewActions from '../../actions';
import * as actions from '../../constants/action-types/actionTypes'
import CurrencyCalculatorComponent from '../../components/currency-calculator/currencyCalculatorComponent';


class CurrencyCalculatorContainer extends Component {

  _formComponents() {
    return Object.keys(this.props.currencyInfo.displayValues).map(key => {
      const displayValues = this.props.currencyInfo.displayValues[key];
      return (
        <div key={key} className="child-item"><CurrencyCalculatorComponent
          displayValues={displayValues}
          calculateCurrency={this.props.actions.setFromAmount}
          toggleDisclaimer={this.props.actions.toggleDisclaimer}
          setFromType={this.props.actions.setFromCurrencyType}
          setToType={this.props.actions.setToCurrencyType}
          dropDownItems={this.props.currencyInfo.dropDownItems}
          exchangeInfo={this.props.currencyInfo.exchangeRates}
          index={key}
          self={this} />
        </div>);
    });
  }

  render() {
    const components = this._formComponents();

    return (
      <div className="mainpage-container">
        {components}
      </div>
    );
  }
}

function
  mapStateToProps(state) {
  return {
    currencyInfo: state.currency
  };
}

function
mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ViewActions, dispatch),
  };
}

export default connect(mapStateToProps,
  mapDispatchToProps)(CurrencyCalculatorContainer);


