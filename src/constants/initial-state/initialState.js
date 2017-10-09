const CURRENCY_TYPES = {
    CAD: 'CAD',
    USD: 'USD',
    EUR: 'EUR'
};

const componentIndexes = [1, 2, 3];
const initialDisplay = { fromValue: 0, toValue: 0, selectedFrom: CURRENCY_TYPES.CAD, selectedTo: CURRENCY_TYPES.USD, showPopover: false };

const dropDownDisplayItems = (() => {
    return Object.keys(CURRENCY_TYPES).map(key => { return CURRENCY_TYPES[key]; });
})();

const formDisplayValues = () => {
    const displayValues = {};
    componentIndexes.forEach(index => {
        displayValues[index] = initialDisplay;
    });
    return displayValues;
};

export const initialCalculationState = {
    dropDownItems: dropDownDisplayItems,
    displayValues: formDisplayValues(),
    exchangeRates: { [CURRENCY_TYPES.CAD]: 1.4731, [CURRENCY_TYPES.USD]: 1.1746, [CURRENCY_TYPES.EUR]: 1, default: true }
};
