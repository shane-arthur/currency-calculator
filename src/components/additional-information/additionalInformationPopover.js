import React, { Component } from 'react';

export default class AdditionalInformationPopover extends Component {

    _formInformation() {
        const base = (() => {
            let baseKey = '';
            Object.keys(this.props.exchangeInfo).forEach(key => {
                if (this.props.exchangeInfo[key] === 1) {
                    baseKey = key;
                }
            });
            return baseKey;
        })();

        return (
          <div>
            <span className="information-item"> Date Fetched: {this.props.exchangeInfo.date}</span>
            <span className="information-item"> Base : {base} </span>
            <span className="information-item"> USD : {this.props.exchangeInfo.USD} </span>
            <span className="information-item"> CAD : {this.props.exchangeInfo.CAD} </span>
          </div>
        );
    }

    _formPopoverContent() {
        return this.props.exchangeInfo.date ? this._formInformation() :
            'Exchange Information Has Yet To Be Fetched';
    }

    render() {
        return (
          <div className="slds-form-element popover-container">
            <div className="slds-popover slds-popover_tooltip slds-nubbin_top-left">
              <div className="slds-popover__body">
                {this._formPopoverContent()}
              </div>
            </div>
          </div>
        );
    }
}
