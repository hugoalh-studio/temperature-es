//#region Define Units Conversion
const unitsSymbols = {
	/*
	KEY: Base of the unit.
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
 * Type of the base symbol of all of the temperature units.
 */
export type TemperatureUnitsSymbolBase = keyof typeof unitsSymbols;
const unitSISymbolBase: TemperatureUnitsSymbolBase = Object.keys(unitsSymbols)[0] as TemperatureUnitsSymbolBase;
/**
 * Type of the symbols of all of the temperature units.
 */
export type TemperatureUnitsSymbols = TemperatureUnitsSymbolBase | typeof unitsSymbols[TemperatureUnitsSymbolBase][number];
const unitsNames = {
	/*
	KEY: Base of the unit.
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
export type TemperatureUnitsNames = typeof unitsNames[TemperatureUnitsSymbolBase][number];
/**
 * Type of the unit input of all of the supported temperature units.
 */
export type TemperatureUnitsInput = TemperatureUnitsNames | TemperatureUnitsSymbols;
interface UnitConverter {
	fromSI: (valueSI: number) => number;
	toSI: (valueCurrent: number) => number;
}
const unitsConverters: Record<TemperatureUnitsSymbolBase, UnitConverter> = {
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
	isSIUnit: boolean;
	names: string[];
	symbols: string[];
}
/**
 * Resolve unit input as inter operational unit symbol.
 * @access private
 * @param {string} unitInput Unit input.
 * @returns {TemperatureUnitsSymbolBase} Inter operational unit symbol.
 */
function resolveUnitInput(unitInput: string): TemperatureUnitsSymbolBase {
	for (const [unitSymbolBase, unitSymbolAliases] of Object.entries(unitsSymbols)) {
		if (
			unitInput === unitSymbolBase ||
			//@ts-ignore Type conflict not exist.
			unitSymbolAliases.includes(unitInput)
		) {
			return unitSymbolBase as TemperatureUnitsSymbolBase;
		}
	}
	for (const [unitSymbolBase, unitNames] of Object.entries(unitsNames)) {
		if (
			//@ts-ignore Type conflict not exist.
			unitNames.includes(unitInput)
		) {
			return unitSymbolBase as TemperatureUnitsSymbolBase;
		}
	}
	throw new SyntaxError(`\`${unitInput}\` is not a known temperature unit!`);
}
/**
 * Convert between units of the temperature.
 */
export class Temperature {
	#table: Map<TemperatureUnitsSymbolBase, number> = new Map<TemperatureUnitsSymbolBase, number>();
	/**
	 * @param {number} fromValue From value.
	 * @param {TemperatureUnitsInput} [fromUnit="K"] From unit.
	 */
	constructor(fromValue: number, fromUnit: TemperatureUnitsInput = "K") {
		if (!(typeof fromValue === "number" && !Number.isNaN(fromValue))) {
			throw new TypeError(`Argument \`fromValue\` must be type of number!`);
		}
		const fromUnitSymbolBase: TemperatureUnitsSymbolBase = resolveUnitInput(fromUnit);
		this.#table.set(fromUnitSymbolBase, fromValue);
		if (fromUnitSymbolBase !== unitSISymbolBase) {
			this.#table.set(unitSISymbolBase, unitsConverters[fromUnitSymbolBase].toSI(fromValue));
		}
		for (const [unitSymbolBase, unitConverter] of (Object.entries(unitsConverters) as [TemperatureUnitsSymbolBase, UnitConverter][])) {
			if (!this.#table.has(unitSymbolBase)) {
				this.#table.set(unitSymbolBase, unitConverter.fromSI(this.#table.get(unitSISymbolBase)!));
			}
		}
	}
	/**
	 * Get values of all of the units.
	 * @returns {Record<TemperatureUnitsSymbolBase, number>} Values of all of the units.
	 */
	toObject(): Record<TemperatureUnitsSymbolBase, number> {
		return Object.fromEntries(this.#table.entries()) as Record<TemperatureUnitsSymbolBase, number>;
	}
	/**
	 * Get value of the unit with standard symbol.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {string} Value of the unit with standard symbol.
	 */
	toString(toUnit: TemperatureUnitsInput = "K"): string {
		const toUnitSymbolBase: TemperatureUnitsSymbolBase = resolveUnitInput(toUnit);
		return `${this.#table.get(toUnitSymbolBase)!} ${unitsSymbols[toUnitSymbolBase][0]}`;
	}
	/**
	 * Get value of the unit.
	 * @param {TemperatureUnitsInput} [toUnit="K"] To unit.
	 * @returns {number} Value of the unit.
	 */
	toValue(toUnit: TemperatureUnitsInput = "K"): number {
		return this.#table.get(resolveUnitInput(toUnit))!;
	}
	/**
	 * Get meta of the unit.
	 * @param {TemperatureUnitsInput} [unit="K"] Unit.
	 * @returns {TemperatureUnitMeta} Meta of the unit.
	 */
	static unit(unit: TemperatureUnitsInput = "K"): TemperatureUnitMeta {
		const unitSymbolBase: TemperatureUnitsSymbolBase = resolveUnitInput(unit);
		const [unitSymbolStandard, ...unitSymbolAliases] = unitsSymbols[unitSymbolBase];
		return {
			isSIUnit: unitSymbolBase === unitSISymbolBase,
			names: unitsNames[unitSymbolBase as TemperatureUnitsSymbolBase] as unknown as string[],
			symbols: Array.from<string>(new Set<string>([unitSymbolStandard, unitSymbolBase, ...unitSymbolAliases]).values())
		};
	}
	/**
	 * Get meta of the units.
	 * @returns {TemperatureUnitMeta[]} Meta of the units.
	 */
	static units(): TemperatureUnitMeta[] {
		return Object.entries(unitsSymbols).map(([unitSymbolBase, [unitSymbolStandard, ...unitSymbolAliases]]): TemperatureUnitMeta => {
			return {
				isSIUnit: unitSymbolBase === unitSISymbolBase,
				names: unitsNames[unitSymbolBase as TemperatureUnitsSymbolBase] as unknown as string[],
				symbols: Array.from<string>(new Set<string>([unitSymbolStandard, unitSymbolBase, ...unitSymbolAliases]).values())
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
