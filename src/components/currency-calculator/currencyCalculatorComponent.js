
import React from 'react';
import AdditionalInformationPopover from '../additional-information/additionalInformationPopover';


const CurrencyCalculatorComponent = ({ displayValues, calculateCurrency, toggleDisclaimer, setFromType, setToType, dropDownItems, index, self }) => {
  const currencyCalculatorWrapper = (input) => {
    calculateCurrency(index, input);
  }

  const popover = (() => {
    return displayValues.showPopover ?
      <AdditionalInformationPopover /> : null;
  })();

  return (
    <article className="grid-content grid-wrapper">
      <div className="grid-content">
        <div className="currency-input-container">
          <span className="grid-label content-wrapper"> <p> Type in amount and select currency </p> </span>
          <span> <input id="currency-input" type="number" className="input-container content-wrapper" onBlur={currencyCalculatorWrapper} placeholder={displayValues.fromValue} defaultValue={displayValues.fromValue} />
            <select className="select-container content-wrapper" onChange={setFromType.bind(this, index)}>
              {dropDownItems.map(item => {
                return <option key={item} value={item}> {item} </option>
              })}
            </select>
          </span>

          <div className="currency-input-container">
            <span className="grid-label content-wrapper"> <p> Converted Value </p> <input type="number" className="input-container content-wrapper" readOnly value={displayValues.toValue} />
              <select className="select-container content-wrapper" onChange={setToType.bind(this, index)} placeholder="USD" defaultValue="USD">
                {dropDownItems.map(item => {
                  return <option key={item} value={item}> {item} </option>
                })}
              </select>
            </span>
            <span className="open-popover-container"> <a href="javascript:void(0)" id="popover" onClick={toggleDisclaimer.bind(this, index)}>Disclaimer</a> </span>
            {popover}
          </div>
        </div>
      </div>
    </article>

  );
}

export default CurrencyCalculatorComponent;
