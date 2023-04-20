type TemperatureUnitMeta = {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
};
declare const temperatureUnitsMap: readonly [{
    readonly nameASCII: "Kelvin";
    readonly nameStandard: "Kelvin";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "K";
    readonly symbolStandard: "K";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: true;
}, {
    readonly nameASCII: "Celsius";
    readonly nameStandard: "Celsius";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "C";
    readonly symbolStandard: "°C";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Delisle";
    readonly nameStandard: "Delisle";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "De";
    readonly symbolStandard: "°De";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Fahrenheit";
    readonly nameStandard: "Fahrenheit";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "F";
    readonly symbolStandard: "°F";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Rankine";
    readonly nameStandard: "Rankine";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "R";
    readonly symbolStandard: "°R";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Reaumur";
    readonly nameStandard: "Réaumur";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "Re";
    readonly symbolStandard: "°Ré";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Roemer";
    readonly nameStandard: "Rømer";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "Ro";
    readonly symbolStandard: "°Rø";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}, {
    readonly nameASCII: "Newton";
    readonly nameStandard: "Newton";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "N";
    readonly symbolStandard: "°N";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: false;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
}];
type TemperatureUnitsNameASCII = (typeof temperatureUnitsMap)[number]["nameASCII"];
type TemperatureUnitsNameStandard = (typeof temperatureUnitsMap)[number]["nameStandard"];
type TemperatureUnitsSymbolASCII = (typeof temperatureUnitsMap)[number]["symbolASCII"];
type TemperatureUnitsSymbolStandard = (typeof temperatureUnitsMap)[number]["symbolStandard"];
type TemperatureUnitsName = TemperatureUnitsNameASCII | TemperatureUnitsNameStandard;
type TemperatureUnitsSymbol = TemperatureUnitsSymbolASCII | TemperatureUnitsSymbolStandard;
type TemperatureUnits = TemperatureUnitsName | TemperatureUnitsSymbol;
type TemperatureToJSONKeyType = keyof Omit<TemperatureUnitMeta, "isSIUnit">;
/**
 * @class Temperature
 * @description Convert temperature units.
 */
declare class Temperature {
    #private;
    /**
     * @static
     * @method difference
     * @description Calculate temperature difference by units.
     * @param {Temperature} a
     * @param {Temperature} b
     * @returns {TemperatureDifference}
     */
    static difference(a: Temperature, b: Temperature): TemperatureDifference;
    /**
     * @static
     * @method unit
     * @description Get a temperature unit meta.
     * @param {TemperatureUnits | string} unit Unit.
     * @returns {TemperatureUnitMeta} Unit meta.
     */
    static unit(unit: TemperatureUnits | string): TemperatureUnitMeta;
    /**
     * @static
     * @method units
     * @description Get all of the temperature units meta.
     * @returns {TemperatureUnitMeta[]} Units meta.
     */
    static units(): TemperatureUnitMeta[];
    /**
     * @static
     * @method unitSI
     * @description Get temperature SI unit meta.
     * @returns {TemperatureUnitMeta} SI unit meta.
     */
    static unitSI(): TemperatureUnitMeta;
    /** @alias difference */ static diff: typeof Temperature.difference;
    /**
     * @constructor
     * @param {number} value Value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     */
    constructor(value: number, unit?: TemperatureUnits | string);
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: TemperatureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: TemperatureUnits | string): string;
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: TemperatureUnits | string): string;
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit?: TemperatureUnits | string): number;
}
/**
 * @class TemperatureDifference
 * @description Calculate temperature difference by units.
 */
declare class TemperatureDifference {
    #private;
    /**
     * @constructor
     * @param {Temperature} a
     * @param {Temperature} b
     */
    constructor(a: Temperature, b: Temperature);
    /**
     * @method toJSON
     * @description Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: TemperatureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * @method toStringASCII
     * @description Get unit's value with ASCII symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: TemperatureUnits | string): string;
    /**
     * @method toStringStandard
     * @description Get unit's value with Standard symbol.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: TemperatureUnits | string): string;
    /**
     * @method toValue
     * @description Get unit's value.
     * @param {TemperatureUnits | string} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit?: TemperatureUnits | string): number;
}
export default Temperature;
export { Temperature, type TemperatureToJSONKeyType, type TemperatureUnitMeta, type TemperatureUnits, type TemperatureUnitsName, type TemperatureUnitsNameASCII, type TemperatureUnitsNameStandard, type TemperatureUnitsSymbol, type TemperatureUnitsSymbolASCII, type TemperatureUnitsSymbolStandard };
//# sourceMappingURL=main.d.ts.map