import { inputUtils } from '../../common-utils/inputUtils';


export const stateUtils = {
    toggleDisclaimer: (state, index) => {
        let displayValues = { ...state.displayValues };
        let ourSlice = { ...displayValues[index] };
        ourSlice = { ...ourSlice, showPopover: !state.displayValues[index].showPopover };
        displayValues = { ...displayValues, [index]: ourSlice };

        return { ...state, displayValues };
    },

    setFromAmount: (state, amount, index) => {
        let displayValues = { ...state.displayValues };
        let ourSlice = { ...displayValues[index] };
        ourSlice = { ...ourSlice, fromValue: amount };
        displayValues = { ...displayValues, [index]: ourSlice };

        return { ...state, displayValues };
    },

    setToCurrencyType: (state, value, index) => {
        let displayValues = { ...state.displayValues };
        let ourSlice = { ...displayValues[index] };
        ourSlice = { ...ourSlice, selectedTo: value };
        displayValues = { ...displayValues, [index]: ourSlice };

        return { ...state, displayValues };
    },

    setFromCurrencyType: (state, value, index) => {
        let displayValues = { ...state.displayValues };
        let ourSlice = { ...displayValues[index] };
        ourSlice = { ...ourSlice, selectedFrom: value };
        displayValues = { ...displayValues, [index]: ourSlice };

        return { ...state, displayValues };
    },

    setExchangeRates: (state, exchangeInfo) => {
        const exchangeRates = { ...state.exchangeRates };

        Object.keys(exchangeInfo.rates).forEach(key => {
            exchangeRates[key] = exchangeInfo.rates[key];
        });

        exchangeRates.date = exchangeInfo.date;
        exchangeRates.default = false;

        return { ...state, exchangeRates };
    },

    calculateCurrency: (state, fromValue, index) => {
        const maxInput = 999999;
        const valueToCalculate = Number(fromValue);

        if (valueToCalculate !== 0 && valueToCalculate < maxInput) {
            const to = ([state.displayValues[index].selectedTo][0]);
            const from = ([state.displayValues[index].selectedFrom][0]);
            const rate = Number(state.exchangeRates[to] / state.exchangeRates[from]);
            let displayValues = { ...state.displayValues };

            if (rate && typeof rate !== 'NaN') {
                const newOutput = inputUtils.formatValue(fromValue * rate);
                displayValues = {
                    ...displayValues,
                    [index]: {
                        selectedFrom: state.displayValues[index].selectedFrom,
                        selectedTo: state.displayValues[index].selectedTo,
                        toValue: newOutput,
                        fromValue,
                        showPopover: state.displayValues[index].showPopover
                    }
                };
            }

            return { ...state, displayValues };
        }

        else if (maxInput < valueToCalculate) {
            let displayValues = { ...state.displayValues };
            let ourSlice = { ...displayValues[index] };
            ourSlice = { ...ourSlice, toValue : 0 };
            displayValues = { ...displayValues, [index]: ourSlice };

            return { ...state, displayValues };
        }
        else {
            return { ...state };
        }
    }
};
