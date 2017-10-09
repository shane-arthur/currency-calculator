import { inputUtils } from '../../common-utils/inputUtils';


export const stateUtils = {
    toggleDisclaimer: (state, index) => {
        let displayValues = { ...state.displayValues };
        //TODO abstract this until a util since its repeated for both types
        displayValues = {
            ...displayValues, [index]: {
                fromValue: state.displayValues[index].fromValue,
                toValue: state.displayValues[index].toValue,
                selectedFrom: state.displayValues[index].selectedFrom,
                selectedTo: state.displayValues[index].selectedTo,
                showPopover: !state.displayValues[index].showPopover
            }
        }
        return { ...state, displayValues };
    },

    setToCurrencyType: (state, value, index) => {
        let displayValues = { ...state.displayValues };
        //TODO abstract this until a util since its repeated for both types
        displayValues = {
            ...displayValues, [index]: {
                fromValue: state.displayValues[index].fromValue,
                toValue: state.displayValues[index].toValue,
                selectedFrom: state.displayValues[index].selectedFrom,
                selectedTo: value,
                showPopover: state.displayValues[index].showPopover
            }
        }
        return { ...state, displayValues };
    },

    setFromCurrencyType: (state, value, index) => {
        let displayValues = { ...state.displayValues };
        displayValues = {
            ...displayValues, [index]: {
                fromValue: state.displayValues[index].fromValue,
                toValue: state.displayValues[index].toValue,
                selectedTo: state.displayValues[index].selectedTo,
                selectedFrom: value,
                showPopover: state.displayValues[index].showPopover
            }
        }
        return { ...state, displayValues };
    },

    setExchangeRates: (state, exchangeInfo) => {
        const exchangeRates = state.exchangeRates;

        Object.keys(exchangeInfo.rates).forEach(key => {
            exchangeRates[key] = exchangeInfo.rates[key];
        });

        return { ...state, exchangeRates }
    },

    calculateCurrency: (state, fromValue, index) => {
        if (Number(fromValue) !== 0) {
            const to = ([state.displayValues[index].selectedTo][0]);
            const from = ([state.displayValues[index].selectedFrom][0]);
            const rate = Number(state.exchangeRates[to] / state.exchangeRates[from]);
            let displayValues = { ...state.displayValues };

            if (rate && typeof rate !== 'Nan') {
                const newOutput = inputUtils.formatValue(fromValue * rate);
                displayValues = {
                    ...displayValues, [index]: {
                        selectedFrom: state.displayValues[index].selectedFrom,
                        selectedTo: state.displayValues[index].selectedTo,
                        toValue: newOutput,
                        fromValue,
                        showPopover: state.displayValues[index].showPopover
                    }
                }

            }
            return { ...state, displayValues };
        }
        return { ...state };
    }
}

