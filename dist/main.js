var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Temperature_table, _TemperatureDifference_table;
/*
[FOR DEVELOPERS]

`temperatureUnitsMap` should do these in order to correctly generate lints:

- Follow `TemperatureUnitMetaInternal[]` pattern, but never assign `TemperatureUnitMetaInternal[]` when commit.
- End with `as const`.
*/
const temperatureUnitsMap = [
    {
        nameASCII: "Kelvin",
        nameStandard: "Kelvin",
        nameRegExp: /^[Kk]elvin$/u,
        symbolASCII: "K",
        symbolStandard: "K",
        symbolRegExp: /^K$/u,
        isSIUnit: true
    },
    {
        nameASCII: "Celsius",
        nameStandard: "Celsius",
        nameRegExp: /^[Cc]elsius$/u,
        symbolASCII: "C",
        symbolStandard: "°C",
        symbolRegExp: /^\u00b0?C$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return (valueSI - 273.15);
        },
        convertToSI: (valueCurrent) => {
            return (valueCurrent + 273.15);
        }
    },
    {
        nameASCII: "Delisle",
        nameStandard: "Delisle",
        nameRegExp: /^[Dd]elisle$/u,
        symbolASCII: "De",
        symbolStandard: "°De",
        symbolRegExp: /^\u00b0?De?$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return ((373.15 - valueSI) * 1.5);
        },
        convertToSI: (valueCurrent) => {
            return (373.15 - valueCurrent / 1.5);
        }
    },
    {
        nameASCII: "Fahrenheit",
        nameStandard: "Fahrenheit",
        nameRegExp: /^[Ff]ahrenheit$/u,
        symbolASCII: "F",
        symbolStandard: "°F",
        symbolRegExp: /^\u00b0?F$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return (valueSI * 1.8 - 459.67);
        },
        convertToSI: (valueCurrent) => {
            return ((valueCurrent + 459.67) / 1.8);
        }
    },
    {
        nameASCII: "Rankine",
        nameStandard: "Rankine",
        nameRegExp: /^[Rr]ankine$/u,
        symbolASCII: "R",
        symbolStandard: "°R",
        symbolRegExp: /^\u00b0?Ra?$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return (valueSI * 1.8);
        },
        convertToSI: (valueCurrent) => {
            return (valueCurrent / 1.8);
        }
    },
    {
        nameASCII: "Reaumur",
        nameStandard: "Réaumur",
        nameRegExp: /^[Rr][e\u00e9]aumur$/u,
        symbolASCII: "Re",
        symbolStandard: "°Ré",
        symbolRegExp: /^\u00b0?(?:Re|r)$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return ((valueSI - 273.15) * 0.8);
        },
        convertToSI: (valueCurrent) => {
            return (valueCurrent * 1.25 + 273.15);
        }
    },
    {
        nameASCII: "Roemer",
        nameStandard: "Rømer",
        nameRegExp: /^[Rr](?:oe?|\u00f8)mer$/u,
        symbolASCII: "Ro",
        symbolStandard: "°Rø",
        symbolRegExp: /^\u00b0?R[o\u00f8]$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return ((valueSI - 273.15) * 0.525 + 7.5);
        },
        convertToSI: (valueCurrent) => {
            return ((valueCurrent - 7.5) / 0.525 + 273.15);
        }
    },
    {
        nameASCII: "Newton",
        nameStandard: "Newton",
        nameRegExp: /^[Nn]ewton$/u,
        symbolASCII: "N",
        symbolStandard: "°N",
        symbolRegExp: /^\u00b0?N$/u,
        isSIUnit: false,
        convertFromSI: (valueSI) => {
            return ((valueSI - 273.15) * 0.33);
        },
        convertToSI: (valueCurrent) => {
            return (valueCurrent / 0.33 + 273.15);
        }
    }
];
const unitSI = temperatureUnitsMap.filter((unitMeta) => {
    return unitMeta.isSIUnit;
})[0];
const toJSONKeyType = [
    "nameASCII",
    "nameStandard",
    "symbolASCII",
    "symbolStandard"
];
/**
 * @access private
 * @function unitResolver
 * @param {TemperatureUnits | string} unit Unit.
 * @returns {TemperatureUnitMetaInternal} Unit meta.
 */
function unitResolver(unit) {
    if (typeof unit !== "string") {
        throw new TypeError(`Argument \`unit\` must be type of string!`);
    }
    for (let unitMeta of temperatureUnitsMap) {
        if (unit === unitMeta.nameASCII ||
            unit === unitMeta.nameStandard ||
            unit === unitMeta.symbolASCII ||
            unit === unitMeta.symbolStandard ||
            unitMeta.nameRegExp.test(unit) ||
            unitMeta.symbolRegExp.test(unit)) {
            return unitMeta;
        }
    }
    throw new SyntaxError(`\`${unit}\` is not a known temperature unit!`);
}
/**
 * @class Temperature
 * @description Convert temperature units.
 */
class Temperature {
    /**
     * @static
     * @method difference
     * @description Calculate temperature difference by units.
     * @param {Temperature} a
     * @param {Temperature} b
     * @returns {TemperatureDifference}
     */
    static difference(a, b) {
        return new TemperatureDifference(a, b);
    }
    /**
     * @static
     * @method unit
     * @description Get a temperature unit meta.
     * @param {TemperatureUnits | string} unit Unit.
     * @returns {TemperatureUnitMeta} Unit meta.
     */
    static unit(unit) {
        let unitResolve = unitResolver(unit);
        return {
            nameASCII: unitResolve.nameASCII,
            nameStandard: unitResolve.nameStandard,
            symbolASCII: unitResolve.symbolASCII,
            symbolStandard: unitResolve.symbolStandard,
            isSIUnit: unitResolve.isSIUnit
        };
    }
    /**
     * @static
     * @method units
     * @description Get all of the temperature units meta.
     * @returns {TemperatureUnitMeta[]} Units meta.
     */
    static units() {
        return temperatureUnitsMap.map((unitMeta) => {
            return {
                nameASCII: unitMeta.nameASCII,
                nameStandard: unitMeta.nameStandard,
                symbolASCII: unitMeta.symbolASCII,
                symbolStandard: unitMeta.symbolStandard,
                isSIUnit: unitMeta.isSIUnit
            };
        });
    }
    /**
     * @static
     * @method unitSI
     * @description Get temperature SI unit meta.
     * @returns {TemperatureUnitMeta} SI unit meta.
     */
    static unitSI() {
        return {
            nameASCII: unitSI.nameASCII,
            nameStandard: unitSI.nameStandard,
            symbolASCII: unitSI.symbolASCII,
            symbolStandard: unitSI.symbolStandard,
            isSIUnit: unitSI.isSIUnit
        };
    }
    /**
     * @constructor
     * @param {number} value Value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     */
    constructor(value, unit = "K") {
        _Temperature_table.set(this, new Map());
        if (!(typeof value === "number" && !Number.isNaN(value))) {
            throw new TypeError(`Argument \`value\` must be type of number!`);
        }
        let unitResolve = unitResolver(unit);
        __classPrivateFieldGet(this, _Temperature_table, "f").set(unitResolve.nameASCII, value);
        if (!unitResolve.isSIUnit) {
            __classPrivateFieldGet(this, _Temperature_table, "f").set(unitSI.nameASCII, unitResolve.convertToSI(value));
        }
        for (let unitMeta of temperatureUnitsMap) {
            if (unitMeta.isSIUnit === true) { // [TypeScript] ` === true` must exist here, otherwise cause issue below.
                continue;
            }
            if (!__classPrivateFieldGet(this, _Temperature_table, "f").has(unitMeta.nameASCII)) {
                __classPrivateFieldGet(this, _Temperature_table, "f").set(unitMeta.nameASCII, unitMeta.convertFromSI(__classPrivateFieldGet(this, _Temperature_table, "f").get(unitSI.nameASCII)));
            }
        }
    }
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType = "symbolASCII") {
        if (!toJSONKeyType.includes(keyType)) {
            throw new RangeError(`\`${keyType}\` is not a valid key type!`);
        }
        let result = {};
        for (let unitMeta of temperatureUnitsMap) {
            result[unitMeta[keyType]] = __classPrivateFieldGet(this, _Temperature_table, "f").get(unitMeta.nameASCII);
        }
        return result;
    }
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit = "K") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _Temperature_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
    }
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit = "K") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _Temperature_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
    }
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit = "K") {
        return __classPrivateFieldGet(this, _Temperature_table, "f").get(unitResolver(unit).nameASCII);
    }
}
_a = Temperature, _Temperature_table = new WeakMap();
/** @alias difference */ Temperature.diff = _a.difference;
/**
 * @class TemperatureDifference
 * @description Calculate temperature difference by units.
 */
class TemperatureDifference {
    /**
     * @constructor
     * @param {Temperature} a
     * @param {Temperature} b
     */
    constructor(a, b) {
        _TemperatureDifference_table.set(this, new Map());
        if (!(a instanceof Temperature) ||
            !(b instanceof Temperature)) {
            throw new TypeError(`Arguments must be instance of Temperature!`);
        }
        for (let unitMeta of temperatureUnitsMap) {
            __classPrivateFieldGet(this, _TemperatureDifference_table, "f").set(unitMeta.nameASCII, a.toValue(unitMeta.nameASCII) - b.toValue(unitMeta.nameASCII));
        }
    }
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType = "symbolASCII") {
        if (!toJSONKeyType.includes(keyType)) {
            throw new RangeError(`\`${keyType}\` is not a valid key type!`);
        }
        let result = {};
        for (let unitMeta of temperatureUnitsMap) {
            result[unitMeta[keyType]] = __classPrivateFieldGet(this, _TemperatureDifference_table, "f").get(unitMeta.nameASCII);
        }
        return result;
    }
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit = "K") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _TemperatureDifference_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
    }
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit = "K") {
        let unitResolve = unitResolver(unit);
        return `${__classPrivateFieldGet(this, _TemperatureDifference_table, "f").get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
    }
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit = "K") {
        return __classPrivateFieldGet(this, _TemperatureDifference_table, "f").get(unitResolver(unit).nameASCII);
    }
}
_TemperatureDifference_table = new WeakMap();
export default Temperature;
export { Temperature };
