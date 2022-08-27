const diffCelsiusKelvin = 273.15;
/**
 * @class Temperature
 * @description Convert temperature units.
 */
class Temperature {
	/**
	 * @constructor
	 * @param {number} value Value.
	 * @param {string} [unit="K"] Unit.
	 */
	constructor(value, unit = "K") {
		if (!Number.isFinite(value)) {
			throw new TypeError(`Argument \`value\` must be type of number (finite)!`);
		};
		if (typeof unit !== "string") {
			throw new TypeError(`Argument \`unit\` must be type of string!`);
		};
		switch (unit) {
			case "K":
			case "kelvin":
			case "Kelvin":
				this.kelvin = value;
				break;
			case "C":
			case "celsius":
			case "Celsius":
				this.celsius = value;
				this.kelvin = value + diffCelsiusKelvin;
				break;
			case "D":
			case "De":
			case "delisle":
			case "Delisle":
				this.delisle = value;
				this.kelvin = 373.15 - value / 1.5;
				break;
			case "F":
			case "fahrenheit":
			case "Fahrenheit":
				this.fahrenheit = value;
				this.kelvin = (value + 459.67) / 1.8;
				break;
			case "R":
			case "Ra":
			case "rankine":
			case "Rankine":
				this.rankine = value;
				this.kelvin = value / 1.8;
				break;
			case "r":
			case "Re":
			case "reaumur":
			case "Reaumur":
				this.reaumur = value;
				this.kelvin = value * 1.25 + diffCelsiusKelvin;
				break;
			case "Ro":
			case "roemer":
			case "Roemer":
			case "romer":
			case "Romer":
				this.romer = value;
				this.kelvin = (value - 7.5) / 0.525 + diffCelsiusKelvin;
				break;
			case "N":
			case "newton":
			case "Newton":
				this.newton = value;
				this.kelvin = value / 0.33 + diffCelsiusKelvin;
				break;
			default:
				throw new SyntaxError(`\`${unit}\` is not a known temperature unit!`);
		};
		if (typeof this.celsius === "undefined") {
			this.celsius = this.kelvin - diffCelsiusKelvin;
		};
		if (typeof this.rankine === "undefined") {
			this.rankine = this.kelvin * 1.8;
		};
		if (typeof this.delisle === "undefined") {
			this.delisle = (100 - this.celsius) * 1.5;
		};
		if (typeof this.fahrenheit === "undefined") {
			this.fahrenheit = this.rankine - 459.67;
		};
		if (typeof this.reaumur === "undefined") {
			this.reaumur = this.celsius * 0.8;
		};
		if (typeof this.romer === "undefined") {
			this.romer = this.celsius * 0.525 + 7.5;
		};
		if (typeof this.newton === "undefined") {
			this.newton = this.celsius * 0.33;
		};
	};
	get K() {
		return this.kelvin;
	};
	get Kelvin() {
		return this.kelvin;
	};
	get C() {
		return this.celsius;
	};
	get Celsius() {
		return this.celsius;
	};
	get D() {
		return this.delisle;
	};
	get De() {
		return this.delisle;
	};
	get Delisle() {
		return this.delisle;
	};
	get F() {
		return this.fahrenheit;
	};
	get Fahrenheit() {
		return this.fahrenheit;
	};
	get R() {
		return this.rankine;
	};
	get Ra() {
		return this.rankine;
	};
	get Rankine() {
		return this.rankine;
	};
	get r() {
		return this.reaumur;
	};
	get Re() {
		return this.reaumur;
	};
	get Reaumur() {
		return this.reaumur;
	};
	get Ro() {
		return this.romer;
	};
	get roemer() {
		return this.romer;
	};
	get Roemer() {
		return this.romer;
	};
	get Romer() {
		return this.romer;
	};
	get N() {
		return this.newton;
	};
	get Newton() {
		return this.newton;
	};
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
	};
	static diff = this.difference;
};
/**
 * @class TemperatureDifference
 * @description Calculate temperature difference by units.
 */
class TemperatureDifference extends Temperature {
	/**
	 * @constructor
	 * @param {Temperature} a
	 * @param {Temperature} b
	 */
	constructor(a, b) {
		if (
			!(a instanceof Temperature) ||
			!(b instanceof Temperature)
		) {
			throw new TypeError(`Arguments must be instance of Temperature!`);
		};
		super(0);
		for (let key of Object.keys(this)) {
			this[key] = a[key] - b[key];
		};
	};
};
export default Temperature;
