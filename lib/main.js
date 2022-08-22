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
		if (unit.search(/^[Kk](?:elvin)?$/gu) === 0) {
			this.kelvin = value;
		} else if (unit.search(/^[Cc](?:elsius)?$/gu) === 0) {
			this.celsius = value;
			this.kelvin = value + 273.15;
		} else if (unit.search(/^[Ff](?:ahrenheit)?$/gu) === 0) {
			this.fahrenheit = value;
			this.kelvin = (value + 459.67) / 1.8;
		} else if (unit.search(/^[Rr](?:ankine)?$/gu) === 0) {
			this.rankine = value;
			this.kelvin = value / 1.8;
		} else if (unit.search(/^[Dd]e(?:lisle)?$/gu) === 0) {
			this.delisle = value;
			this.kelvin = 373.15 - value / 1.5;
		} else if (unit.search(/^[Nn](?:ewton)?$/gu) === 0) {
			this.newton = value;
			this.kelvin = value / 0.33 + 273.15;
		} else if (unit.search(/^[Rr]e(?:aumur)?$/gu) === 0) {
			this.reaumur = value;
			this.kelvin = value * 1.25 + 273.15;
		} else if (unit.search(/^[Rr]o(?:e?mer)?$/gu) === 0) {
			this.romer = value;
			this.kelvin = (value - 7.5) / 0.525 + 273.15;
		} else {
			throw new SyntaxError(`\`${unit}\` is not a known temperature unit!`);
		};
		if (typeof this.celsius === "undefined") {
			this.celsius = this.kelvin - 273.15;
		};
		if (typeof this.fahrenheit === "undefined") {
			this.fahrenheit = this.kelvin * 1.8 - 459.67;
		};
		if (typeof this.rankine === "undefined") {
			this.rankine = this.kelvin * 1.8;
		};
		if (typeof this.delisle === "undefined") {
			this.delisle = (373.15 - this.kelvin) * 1.5;
		};
		if (typeof this.newton === "undefined") {
			this.newton = (this.kelvin - 273.15) * 0.33;
		};
		if (typeof this.reaumur === "undefined") {
			this.reaumur = (this.kelvin - 273.15) * 0.8;
		};
		if (typeof this.romer === "undefined") {
			this.romer = (this.kelvin - 273.15) * 0.525 + 7.5;
		};
	};
	get k() {
		return this.kelvin;
	};
	get K() {
		return this.kelvin;
	};
	get Kelvin() {
		return this.kelvin;
	};
	get c() {
		return this.celsius;
	};
	get C() {
		return this.celsius;
	};
	get Celsius() {
		return this.celsius;
	};
	get f() {
		return this.fahrenheit;
	};
	get F() {
		return this.fahrenheit;
	};
	get Fahrenheit() {
		return this.fahrenheit;
	};
	get r() {
		return this.rankine;
	};
	get R() {
		return this.rankine;
	};
	get Rankine() {
		return this.rankine;
	};
	get de() {
		return this.delisle;
	};
	get De() {
		return this.delisle;
	};
	get Delisle() {
		return this.delisle;
	};
	get n() {
		return this.newton;
	};
	get N() {
		return this.newton;
	};
	get Newton() {
		return this.newton;
	};
	get re() {
		return this.reaumur;
	};
	get Re() {
		return this.reaumur;
	};
	get Reaumur() {
		return this.reaumur;
	};
	get ro() {
		return this.romer;
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
};
module.exports = Temperature;
