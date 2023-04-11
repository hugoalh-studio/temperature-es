# Temperature (NodeJS)

[`Temperature.NodeJS`](https://github.com/hugoalh-studio/temperature-nodejs)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/temperature-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/temperature-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/temperature-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/temperature-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/temperature-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/temperature-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/temperature-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/temperature-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/temperature-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/temperature-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/temperature-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/temperature-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/temperature-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/temperature-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/temperature-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/temperature-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/temperature-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/temperature) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/temperature?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/temperature/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to convert temperature units.

Units of temperature are from [Wikipedia - Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature).

| **Unit** | **Symbol (\*: Exclusive)** | **Camel Case Name** |
|:-:|:-:|:-:|
| Kelvin ***\[SI\]*** | `K` | `Kelvin` / `kelvin` |
| Celsius | `C` | `Celsius` / `celsius` |
| Delisle | `D` / `De`**\*** | `Delisle` / `delisle` |
| Fahrenheit | `F` | `Fahrenheit` / `fahrenheit` |
| Rankine | `R` / `Ra` | `Rankine` / `rankine` |
| Réaumur | `Re` / `r` | `Reaumur` / `reaumur` |
| Rømer | `Ro` | `Roemer` / `roemer` / `Romer` / `romer` |
| Sir Isaac Newton's degree of temperature (Newton) | `N` | `Newton` / `newton` |

<details>
<summary><b>Conversion Formula</b></summary>

| **Unit** | **To SI Unit** | **From SI Unit** |
|:-:|:--|:--|
| Kelvin ***\[SI\]*** |  |  |
| Celsius | $T_{K} = T_{C} + 273.15$ | $T_{C} = T_{K} - 273.15$ |
| Delisle | $T_{K} = 373.15 - T_{D} \div 1.5$ | $T_{D} = \left( 373.15 - T_{K} \right) \times 1.5$ |
| Fahrenheit | $T_{K} = \left( T_{F} + 459.67 \right) \div 1.8$ | $T_{F} = T_{K} \times 1.8 - 459.67$ |
| Rankine | $T_{K} = T_{R} \div 1.8$ | $T_{R} = T_{K} \times 1.8$ |
| Réaumur | $T_{K} = T_{Re} \times 1.25 + 273.15$ | $T_{Re} = \left( T_{K} - 273.15 \right) \times 0.8$ |
| Rømer | $T_{K} = \left( T_{Ro} - 7.5 \right) \div 0.525 + 273.15$ | $T_{Ro} = \left( T_{K} - 273.15 \right) \times 0.525 + 7.5$ |
| Sir Isaac Newton's degree of temperature (Newton) | $T_{K} = T_{N} \div 0.33 + 273.15$ | $T_{N} = \left( T_{K} - 273.15 \right) \times 0.33$ |

</details>

### 📋 Notice

- Degree symbol (`°`) is not used in here.
- In order to fulfill the JavaScript namespace naming requirement, some characters are replaced (e.g.: `é` to `e`, `ø` to `o`).
- This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:
  ```js
  0.1 + 0.2;
  //=> 0.30000000000000004
  ```
  In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:
  ```js
  (0.1 + 0.2).toPrecision(14);
  //=> 0.3
  ```

## 📚 Documentation

### Target

- NodeJS >= v6.9.0

```sh
npm install @hugoalh/temperature
```

```js
/* Either */
const Temperature = require("@hugoalh/temperature");// [CommonJS] Require
import Temperature from "@hugoalh/temperature";// [ModuleJS] Default Import
```

### API

#### Class

```ts
new Temperature(value: number, unit: string = "K"): Temperature;
  .C: number;
  .D: number;
  .F: number;
  .K: number;
  .N: number;
  .R: number;
  .Re: number;
  .Ro: number;

Temperature.difference(a: Temperature, b: Temperature): TemperatureDifference;
```

### Example

```js
new Temperature(25, "C").K;
//=> 298.15

new Temperature(298.15).C;
//=> 25
```
