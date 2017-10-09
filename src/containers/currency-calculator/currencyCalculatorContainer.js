import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { API_MAPPINGS } from '../../constants/api/apiMappings';
import React, { Component } from 'react'; // eslint-disable-line import/first
import * as ViewActions from '../../actions';
import * as actions from '../../constants/action-types/actionTypes'
import CurrencyCalculatorComponent from '../../components/currency-calculator/currencyCalculatorComponent';


class CurrencyCalculatorContainer extends Component {

  _formComponent(index) {
    const displayValues = this.props.currencyInfo.displayValues[index];
    return (<div className="child-item"><CurrencyCalculatorComponent
      displayValues={displayValues}
      calculateCurrency={this.props.actions.calculateConvertedCurrency}
      toggleDisclaimer={this.props.actions.toggleDisclaimer}
      setFromType={this.props.actions.setFromCurrencyType}
      setToType={this.props.actions.setToCurrencyType}
      dropDownItems={this.props.currencyInfo.dropDownItems}
      index={index}
      self={this}
    /></div>);
  }

  render() {
    const firstComponent = this._formComponent(1);
    const secondComponent = this._formComponent(2);
    const thirdComponent = this._formComponent(3);

    return (
      <div className="mainpage-container">
        {firstComponent}
        {secondComponent}
        {thirdComponent}
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


