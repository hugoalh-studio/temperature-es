export interface TemperatureUnitMeta {
	isSIUnit: boolean;
	nameASCII: string;
	nameStandard: string;
	symbolASCII: string;
	symbolStandard: string;
}
interface TemperatureUnitMetaInternal extends TemperatureUnitMeta {
	convertFromSI: (valueSI: number) => number;
	convertToSI: (valueCurrent: number) => number;
	nameRegExp: RegExp;
	symbolRegExp: RegExp;
}
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
		isSIUnit: true,
		convertFromSI: (valueSI: number): number => {
			return valueSI;
		},
		convertToSI: (valueCurrent: number): number => {
			return valueCurrent;
		}
	},
	{
		nameASCII: "Celsius",
		nameStandard: "Celsius",
		nameRegExp: /^[Cc]elsius$/u,
		symbolASCII: "C",
		symbolStandard: "°C",
		symbolRegExp: /^\u00b0?C$/u,
		isSIUnit: false,
		convertFromSI: (valueSI: number): number => {
			return (valueSI - 273.15);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return ((373.15 - valueSI) * 1.5);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return (valueSI * 1.8 - 459.67);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return (valueSI * 1.8);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return ((valueSI - 273.15) * 0.8);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return ((valueSI - 273.15) * 0.525 + 7.5);
		},
		convertToSI: (valueCurrent: number): number => {
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
		convertFromSI: (valueSI: number): number => {
			return ((valueSI - 273.15) * 0.33);
		},
		convertToSI: (valueCurrent: number): number => {
			return (valueCurrent / 0.33 + 273.15);
		}
	}
] as const;
export type TemperatureUnitsNameASCII = (typeof temperatureUnitsMap)[number]["nameASCII"];
export type TemperatureUnitsNameStandard = (typeof temperatureUnitsMap)[number]["nameStandard"];
export type TemperatureUnitsSymbolASCII = (typeof temperatureUnitsMap)[number]["symbolASCII"];
export type TemperatureUnitsSymbolStandard = (typeof temperatureUnitsMap)[number]["symbolStandard"];
export type TemperatureUnitsName = TemperatureUnitsNameASCII | TemperatureUnitsNameStandard;
export type TemperatureUnitsSymbol = TemperatureUnitsSymbolASCII | TemperatureUnitsSymbolStandard;
export type TemperatureUnits = TemperatureUnitsName | TemperatureUnitsSymbol;
export type TemperatureToJSONKeyType = keyof Omit<TemperatureUnitMeta, "isSIUnit">;
const unitSI: TemperatureUnitMetaInternal = temperatureUnitsMap.filter((unitMeta): boolean => {
	return unitMeta.isSIUnit;
})[0];
const toJSONKeyType: TemperatureToJSONKeyType[] = [
	"nameASCII",
	"nameStandard",
	"symbolASCII",
	"symbolStandard"
];
/**
 * @access private
 * @param {TemperatureUnits} unit Unit.
 * @returns {TemperatureUnitMetaInternal} Unit meta.
 */
function unitResolver(unit: TemperatureUnits): TemperatureUnitMetaInternal {
	if (typeof unit !== "string") {
		throw new TypeError(`Argument \`unit\` must be type of string!`);
	}
	for (let unitMeta of temperatureUnitsMap) {
		if (
			unit === unitMeta.nameASCII ||
			unit === unitMeta.nameStandard ||
			unit === unitMeta.symbolASCII ||
			unit === unitMeta.symbolStandard ||
			unitMeta.nameRegExp.test(unit) ||
			unitMeta.symbolRegExp.test(unit)
		) {
			return unitMeta;
		}
	}
	throw new SyntaxError(`\`${unit}\` is not a known temperature unit!`);
}
/**
 * Convert temperature units.
 */
export class Temperature {
	/**
	 * Calculate temperature difference by units.
	 * @param {Temperature} a
	 * @param {Temperature} b
	 * @returns {TemperatureDifference}
	 */
	static difference(a: Temperature, b: Temperature): TemperatureDifference {
		return new TemperatureDifference(a, b);
	}
	/**
	 * Get a temperature unit meta.
	 * @param {TemperatureUnits} unit Unit.
	 * @returns {TemperatureUnitMeta} Unit meta.
	 */
	static unit(unit: TemperatureUnits): TemperatureUnitMeta {
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		return {
			nameASCII: unitResolve.nameASCII,
			nameStandard: unitResolve.nameStandard,
			symbolASCII: unitResolve.symbolASCII,
			symbolStandard: unitResolve.symbolStandard,
			isSIUnit: unitResolve.isSIUnit
		};
	}
	/**
	 * Get all of the temperature units meta.
	 * @returns {TemperatureUnitMeta[]} Units meta.
	 */
	static units(): TemperatureUnitMeta[] {
		return temperatureUnitsMap.map((unitMeta): TemperatureUnitMeta => {
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
	 * Get temperature SI unit meta.
	 * @returns {TemperatureUnitMeta} SI unit meta.
	 */
	static unitSI(): TemperatureUnitMeta {
		return {
			nameASCII: unitSI.nameASCII,
			nameStandard: unitSI.nameStandard,
			symbolASCII: unitSI.symbolASCII,
			symbolStandard: unitSI.symbolStandard,
			isSIUnit: unitSI.isSIUnit
		};
	}
	/** @alias difference */static diff = this.difference;
	#table: Map<string, number> = new Map<string, number>();
	/**
	 * @param {number} value Value.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 */
	constructor(value: number, unit: TemperatureUnits = "K") {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Argument \`value\` must be type of number!`);
		}
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		this.#table.set(unitResolve.nameASCII, value);
		if (!unitResolve.isSIUnit) {
			this.#table.set(unitSI.nameASCII, unitResolve.convertToSI(value));
		}
		for (let unitMeta of temperatureUnitsMap) {
			if (!this.#table.has(unitMeta.nameASCII)) {
				this.#table.set(unitMeta.nameASCII, unitMeta.convertFromSI(this.#table.get(unitSI.nameASCII)));
			}
		}
	}
	/**
	 * Get all of the units value.
	 * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
	 * @returns {{ [x: string]: number; }} Units value.
	 */
	toJSON(keyType: TemperatureToJSONKeyType = "symbolASCII"): { [x: string]: number; } {
		if (!toJSONKeyType.includes(keyType)) {
			throw new RangeError(`\`${keyType}\` is not a valid key type!`);
		}
		let result: { [x: string]: number; } = {};
		for (let unitMeta of temperatureUnitsMap) {
			result[unitMeta[keyType]] = this.#table.get(unitMeta.nameASCII);
		}
		return result;
	}
	/**
	 * Get unit's value with ASCII symbol.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {string}
	 */
	toStringASCII(unit: TemperatureUnits = "K"): string {
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
	}
	/**
	 * Get unit's value with Standard symbol.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {string}
	 */
	toStringStandard(unit: TemperatureUnits = "K"): string {
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
	}
	/**
	 * Get unit's value.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {number}
	 */
	toValue(unit: TemperatureUnits = "K"): number {
		return this.#table.get(unitResolver(unit).nameASCII);
	}
}
/**
 * Calculate temperature difference by units.
 * @access private
 */
class TemperatureDifference {
	#table: Map<string, number> = new Map<string, number>();
	/**
	 * @param {Temperature} a
	 * @param {Temperature} b
	 */
	constructor(a: Temperature, b: Temperature) {
		if (
			!(a instanceof Temperature) ||
			!(b instanceof Temperature)
		) {
			throw new TypeError(`Arguments must be instance of Temperature!`);
		}
		for (let unitMeta of temperatureUnitsMap) {
			this.#table.set(unitMeta.nameASCII, a.toValue(unitMeta.nameASCII) - b.toValue(unitMeta.nameASCII));
		}
	}
	/**
	 * Get all of the units value.
	 * @param {TemperatureToJSONKeyType} [keyType="symbolASCII"] Key type.
	 * @returns {{ [x: string]: number; }} Units value.
	 */
	toJSON(keyType: TemperatureToJSONKeyType = "symbolASCII"): { [x: string]: number; } {
		if (!toJSONKeyType.includes(keyType)) {
			throw new RangeError(`\`${keyType}\` is not a valid key type!`);
		}
		let result: { [x: string]: number; } = {};
		for (let unitMeta of temperatureUnitsMap) {
			result[unitMeta[keyType]] = this.#table.get(unitMeta.nameASCII);
		}
		return result;
	}
	/**
	 * Get unit's value with ASCII symbol.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {string}
	 */
	toStringASCII(unit: TemperatureUnits = "K"): string {
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolASCII}`;
	}
	/**
	 * Get unit's value with Standard symbol.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {string}
	 */
	toStringStandard(unit: TemperatureUnits = "K"): string {
		let unitResolve: TemperatureUnitMetaInternal = unitResolver(unit);
		return `${this.#table.get(unitResolve.nameASCII)} ${unitResolve.symbolStandard}`;
	}
	/**
	 * Get unit's value.
	 * @param {TemperatureUnits} [unit="K"] Unit.
	 * @returns {number}
	 */
	toValue(unit: TemperatureUnits = "K"): number {
		return this.#table.get(unitResolver(unit).nameASCII);
	}
}
export default Temperature;
