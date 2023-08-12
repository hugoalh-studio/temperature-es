export interface TemperatureUnitMeta {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
}
declare const temperatureUnitsMap: readonly [{
    readonly nameASCII: "Kelvin";
    readonly nameStandard: "Kelvin";
    readonly nameRegExp: RegExp;
    readonly symbolASCII: "K";
    readonly symbolStandard: "K";
    readonly symbolRegExp: RegExp;
    readonly isSIUnit: true;
    readonly convertFromSI: (valueSI: number) => number;
    readonly convertToSI: (valueCurrent: number) => number;
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
export type TemperatureUnitsNameASCII = (typeof temperatureUnitsMap)[number]["nameASCII"];
export type TemperatureUnitsNameStandard = (typeof temperatureUnitsMap)[number]["nameStandard"];
export type TemperatureUnitsSymbolASCII = (typeof temperatureUnitsMap)[number]["symbolASCII"];
export type TemperatureUnitsSymbolStandard = (typeof temperatureUnitsMap)[number]["symbolStandard"];
export type TemperatureUnitsName = TemperatureUnitsNameASCII | TemperatureUnitsNameStandard;
export type TemperatureUnitsSymbol = TemperatureUnitsSymbolASCII | TemperatureUnitsSymbolStandard;
export type TemperatureUnits = TemperatureUnitsName | TemperatureUnitsSymbol;
export type TemperatureToJSONKeyType = keyof Omit<TemperatureUnitMeta, "isSIUnit">;
/**
 * Convert temperature units.
 */
export declare class Temperature {
    #private;
    /**
     * Calculate temperature difference by units.
     * @param {Temperature} a
     * @param {Temperature} b
     * @returns {TemperatureDifference}
     */
    static difference(a: Temperature, b: Temperature): TemperatureDifference;
    /**
     * Get a temperature unit meta.
     * @param {TemperatureUnits} unit Unit.
     * @returns {TemperatureUnitMeta} Unit meta.
     */
    static unit(unit: TemperatureUnits): TemperatureUnitMeta;
    /**
     * Get all of the temperature units meta.
     * @returns {TemperatureUnitMeta[]} Units meta.
     */
    static units(): TemperatureUnitMeta[];
    /**
     * Get temperature SI unit meta.
     * @returns {TemperatureUnitMeta} SI unit meta.
     */
    static unitSI(): TemperatureUnitMeta;
    /** @alias difference */ static diff: typeof Temperature.difference;
    /**
     * @param {number} value Value.
     * @param {TemperatureUnits} [unit="K"] Unit.
     */
    constructor(value: number, unit?: TemperatureUnits);
    /**
     * Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: TemperatureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * Get unit's value with ASCII symbol.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: TemperatureUnits): string;
    /**
     * Get unit's value with Standard symbol.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: TemperatureUnits): string;
    /**
     * Get unit's value.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit?: TemperatureUnits): number;
}
/**
 * Calculate temperature difference by units.
 * @access private
 */
declare class TemperatureDifference {
    #private;
    /**
     * @param {Temperature} a
     * @param {Temperature} b
     */
    constructor(a: Temperature, b: Temperature);
    /**
     * Get all of the units value.
     * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
     * @returns {{ [x: string]: number; }} Units value.
     */
    toJSON(keyType?: TemperatureToJSONKeyType): {
        [x: string]: number;
    };
    /**
     * Get unit's value with ASCII symbol.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {string}
     */
    toStringASCII(unit?: TemperatureUnits): string;
    /**
     * Get unit's value with Standard symbol.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {string}
     */
    toStringStandard(unit?: TemperatureUnits): string;
    /**
     * Get unit's value.
     * @param {TemperatureUnits} [unit="K"] Unit.
     * @returns {number}
     */
    toValue(unit?: TemperatureUnits): number;
}
export default Temperature;
//# sourceMappingURL=main.d.ts.map