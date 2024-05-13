//#region Define Units Conversion
const unitsSymbols = {
	/*
	KEY: ASCII symbol of the unit.
	VALUES: Symbols of the unit, the standard symbol must at the first index.

	SI unit must at the first row.
	*/
	"K": ["K"],// SI
	"C": ["°C"],
	"De": ["°De", "D"],
	"F": ["°F"],
	"N": ["°N"],
	"R": ["°R", "Ra"],
	"Re": ["°Ré", "r"],
	"Ro": ["°Rø"]
} as const;
/**
 * Type of the ASCII symbol of all of the supported temperature units.
 */
export type TemperatureUnitsSymbolASCII = keyof typeof unitsSymbols;
const unitSISymbolASCII: TemperatureUnitsSymbolASCII = Object.keys(unitsSymbols)[0] as TemperatureUnitsSymbolASCII;
/**
 * Type of the symbols of all of the supported temperature units.
 */
export type TemperatureUnitsSymbols = typeof unitsSymbols[TemperatureUnitsSymbolASCII][number];
const unitsNames = {
	/*
	KEY: ASCII symbol of the unit.
	VALUES: Names of the unit, the standard name must at the first index.

	SI unit must at the first row.
	*/
	"K": ["Kelvin"],// SI
	"C": ["Celsius"],
	"De": ["Delisle"],
	"F": ["Fahrenheit"],
	"N": ["Newton"],
	"R": ["Rankine"],
	"Re": ["Réaumur", "Reaumur"],
	"Ro": ["Rømer", "Roemer", "Romer"]
} as const;
/**
 * Type of the names of all of the supported temperature units.
 */
export type TemperatureUnitsNames = typeof unitsNames[TemperatureUnitsSymbolASCII][number];
/**
 * Type of the unit input of all of the supported temperature units.
 */
export type TemperatureUnitsInput = TemperatureUnitsNames | TemperatureUnitsSymbolASCII | TemperatureUnitsSymbols;
interface UnitConverter {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const unitsConverters: Record<TemperatureUnitsSymbolASCII, UnitConverter> = {
	K: {// SI
		fromSI(valueSI: number): number {
			return valueSI;
		},
		toSI(valueCurrent: number): number {
			return valueCurrent;
		}
	},
	C: {
		fromSI(valueSI: number): number {
			return (valueSI - 273.15);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent + 273.15);
		}
	},
	De: {
		fromSI(valueSI: number): number {
			return ((373.15 - valueSI) * 1.5);
		},
		toSI(valueCurrent: number): number {
			return (373.15 - valueCurrent / 1.5);
		}
	},
	F: {
		fromSI(valueSI: number): number {
			return (valueSI * 1.8 - 459.67);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent + 459.67) / 1.8);
		}
	},
	N: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.33);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 0.33 + 273.15);
		}
	},
	R: {
		fromSI(valueSI: number): number {
			return (valueSI * 1.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent / 1.8);
		}
	},
	Re: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.8);
		},
		toSI(valueCurrent: number): number {
			return (valueCurrent * 1.25 + 273.15);
		}
	},
	Ro: {
		fromSI(valueSI: number): number {
			return ((valueSI - 273.15) * 0.525 + 7.5);
		},
		toSI(valueCurrent: number): number {
			return ((valueCurrent - 7.5) / 0.525 + 273.15);
		}
	}
};
//#endregion
//#region Converter
export interface TemperatureUnitMeta {
	/**
	 * Whether this is the SI unit of the temperature.
	 */
	isSIUnit: boolean;
	/**
	 * Names of the temperature unit, the standard name is at the first index.
	 */
	names: string[];
	/**
	 * ASCII symbol of the temperature unit, design for internal usage.
	 */
	symbolASCII: string;
	/**
	 * Symbols of the temperature unit, the standard symbol is at the first index.
	 */
	symbols: string[];
}
/**
 * Resolve unit input as ASCII symbol of the unit.
 * @access private
 * @param {string} parameterName Name of the parameter.
 * @param {string} value Unit input.
 * @returns {TemperatureUnitsSymbolASCII} ASCII symbol of the unit.
 */
function resolveUnitInput(parameterName: string, value: string): TemperatureUnitsSymbolASCII {
	for (const [unitSymbolASCII, unitSymbols] of Object.entries(unitsSymbols)) {
		const unitNames = unitsNames[unitSymbolASCII as TemperatureUnitsSymbolASCII];
		if (
			value === unitSymbolASCII ||
			//@ts-ignore Type conflict not exist.
			unitSymbols.includes(value) ||
			//@ts-ignore Type conflict not exist.
			unitNames.includes(value)
		) {
			return unitSymbolASCII as TemperatureUnitsSymbolASCII;
		}
	}
	throw new SyntaxError(`\`${value}\` (parameter \`${parameterName}\`) is not a known temperature unit!`);
}
/**
 * Convert between units of the temperature.
 */
export class Temperature {
	#table: Map<TemperatureUnitsSymbolASCII, number> = new Map<TemperatureUnitsSymbolASCII, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {TemperatureUnitsInput} [fromUnit="K"] From unit.
	 */
	constructor(fromValue: number, fromUnit: TemperatureUnitsInput = "K") {
		if (!(typeof fromValue === "number" && !Number.isNaN(fromValue))) {
			throw new TypeError(`\`${fromValue}\` (parameter \`fromValue\`) is not a number!`);
		}
		const fromUnitSymbolASCII: TemperatureUnitsSymbolASCII = resolveUnitInput("fromUnit", fromUnit);
		this.#table.set(fromUnitSymbolASCII, fromValue);
		if (fromUnitSymbolASCII !== unitSISymbolASCII) {
			this.#table.set(unitSISymbolASCII, unitsConverters[fromUnitSymbolASCII].toSI(fromValue));
		}
		for (const [unitSymbolASCII, unitConverter] of (Object.entries(unitsConverters) as [TemperatureUnitsSymbolASCII, UnitConverter][])) {
			if (!this.#table.has(unitSymbolASCII)) {
				this.#table.set(unitSymbolASCII, unitConverter.fromSI(this.#table.get(unitSISymbolASCII)!));
			}
		}
	}
	/**
	 * Get values of all of the units.
	 * @returns {Record<TemperatureUnitsSymbolASCII, number>} Values of all of the units.
	 */
	toObject(): Record<TemperatureUnitsSymbolASCII, number> {
		return Object.fromEntries(this.#table.entries()) as Record<TemperatureUnitsSymbolASCII, number>;
	}
	/**
	 * Get value of the unit with standard symbol.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: TemperatureUnitsInput = "K"): string {
		const toUnitSymbolASCII: TemperatureUnitsSymbolASCII = resolveUnitInput("toUnit", toUnit);
		return `${this.#table.get(toUnitSymbolASCII)!} ${unitsSymbols[toUnitSymbolASCII][0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: TemperatureUnitsInput = "K"): number {
		return this.#table.get(resolveUnitInput("toUnit", toUnit))!;
	}
	/**
	 * Get meta of the unit.
	 * @param {TemperatureUnitsInput} [unit="K"] Unit.
	 * @returns {TemperatureUnitMeta} Meta of the unit.
	 */
	static unit(unit: TemperatureUnitsInput = "K"): TemperatureUnitMeta {
		const unitSymbolASCII: TemperatureUnitsSymbolASCII = resolveUnitInput("unit", unit);
		return {
			isSIUnit: unitSymbolASCII === unitSISymbolASCII,
			names: [...unitsNames[unitSymbolASCII as TemperatureUnitsSymbolASCII] as unknown as string[]],
			symbolASCII: unitSymbolASCII,
			symbols: [...unitsSymbols[unitSymbolASCII] as unknown as string[]]
		};
	}
	/**
	 * Get meta of the units.
	 * @returns {TemperatureUnitMeta[]} Meta of the units.
	 */
	static units(): TemperatureUnitMeta[] {
		return Object.entries(unitsSymbols).map(([unitSymbolASCII, unitSymbols]): TemperatureUnitMeta => {
			return {
				isSIUnit: unitSymbolASCII === unitSISymbolASCII,
				names: [...unitsNames[unitSymbolASCII as TemperatureUnitsSymbolASCII] as unknown as string[]],
				symbolASCII: unitSymbolASCII,
				symbols: [...unitSymbols as unknown as string[]]
			};
		});
	}
}
export default Temperature;
/**
 * Convert between units of the temperature.
 * @param {number} fromValue From value.
 * @param {TemperatureUnitsInput} [fromUnit="K"] From unit.
 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
 * @returns {number} Value of the unit.
 */
export function convertTemperature(fromValue: number, fromUnit: TemperatureUnitsInput = "K", toUnit: TemperatureUnitsInput = "K"): number {
	return new Temperature(fromValue, fromUnit).toValue(toUnit);
}
//#endregion
