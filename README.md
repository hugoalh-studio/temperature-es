# Temperature (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/temperature-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/temperature-nodejs)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/temperature-nodejs) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/temperature-nodejs?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/temperature-nodejs/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/temperature-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/temperature-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/temperature-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/temperature) | ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/temperature?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to convert temperature units.

Units of temperature are from "[Wikipedia - Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature)".

|  | **Name ASCII** | **Name Standard** | **Symbol ASCII** | **Symbol Standard** | **... (\*: Exclusive)** |
|:-:|:-:|:-:|:-:|:-:|:-:|
|  ***\[SI\]*** **Kelvin**  | `Kelvin` | `Kelvin` | `K` | `K` |  |
| **Celsius** | `Celsius` | `Celsius` | `C` | `°C` |  |
| **Delisle** | `Delisle` | `Delisle` | `De` | `°De` | `D` |
| **Fahrenheit** | `Fahrenheit` | `Fahrenheit` | `F` | `°F` |  |
| **Rankine** | `Rankine` | `Rankine` | `R` | `°R` | `Ra` |
| **Réaumur** | `Reaumur` | `Réaumur` | `Re` | `°Ré` | `r` |
| **Rømer** | `Roemer` | `Rømer` | `Ro` | `°Rø` | `Romer` |
| **Sir Isaac Newton's degree of temperature (Newton)** | `Newton` | `Newton` | `N` | `°N` |  |

## ⚠️ Important

This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:

```js
0.1 + 0.2;
//=> 0.30000000000000004
```

In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:

```js
(0.1 + 0.2).toPrecision(14);
//=> 0.3
```

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/temperature)
    ```sh
    bun add @hugoalh/temperature[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/temperature[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/temperature)
    ```sh
    npm install @hugoalh/temperature[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/temperature";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class Temperature {
    constructor(value: number, unit: TemperatureUnits = "K"): Temperature;
    toJSON(keyType: TemperatureToJSONKeyType = "symbolASCII"): { [x: string]: number; };
    toStringASCII(unit: TemperatureUnits = "K"): string;
    toStringStandard(unit: TemperatureUnits = "K"): string;
    toValue(unit: TemperatureUnits = "K"): number;
    static difference(a: Temperature, b: Temperature): TemperatureDifference;
    static unit(unit: TemperatureUnits): TemperatureUnitMeta;
    static units(): TemperatureUnitMeta[];
    static unitSI(): TemperatureUnitMeta;
  }
  ```
- ```ts
  interface TemperatureUnitMeta {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file.

## ✍️ Example

- ```js
  import { Temperature } from "@hugoalh/temperature";

  new Temperature(25, "C").toValue("K");
  //=> 298.15

  new Temperature(25, "C").toStringStandard("K");
  //=> "298.15 K"

  new Temperature(298.15).toValue("C");
  //=> 25

  new Temperature(298.15).toStringStandard("C");
  //=> "25 °C"
  ```
