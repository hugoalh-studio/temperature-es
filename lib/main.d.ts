export = Temperature;
/**
 * @class Temperature
 * @description Convert temperature units.
 */
declare class Temperature {
    /**
     * @constructor
     * @param {number} value Value.
     * @param {string} [unit="K"] Unit.
     */
    constructor(value: number, unit?: string);
    kelvin: number;
    celsius: number;
    delisle: number;
    fahrenheit: number;
    rankine: number;
    reaumur: number;
    romer: number;
    newton: number;
    get k(): number;
    get K(): number;
    get Kelvin(): number;
    get c(): number;
    get C(): number;
    get Celsius(): number;
    get de(): number;
    get De(): number;
    get Delisle(): number;
    get f(): number;
    get F(): number;
    get Fahrenheit(): number;
    get r(): number;
    get R(): number;
    get Rankine(): number;
    get re(): number;
    get Re(): number;
    get Reaumur(): number;
    get ro(): number;
    get Ro(): number;
    get roemer(): number;
    get Roemer(): number;
    get Romer(): number;
    get n(): number;
    get N(): number;
    get Newton(): number;
}
//# sourceMappingURL=main.d.ts.map