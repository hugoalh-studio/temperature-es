# Temperature (NodeJS)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/temperature-nodejs)
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

### 📋 Notice

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

## 📚 Documentation

### Getting Started

- NodeJS ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0

```sh
npm install @hugoalh/temperature
```

```js
/* Either */
import { ... } from "@hugoalh/temperature";// Named Import
import * as temperature from "@hugoalh/temperature";// Namespace Import
import Temperature from "@hugoalh/temperature";// Default Import (Class `Temperature`)
```

### API

#### Class

- ```ts
  new Temperature(value: number, unit: TemperatureUnits | string = "K"): Temperature;
    .toJSON(keyType: TemperatureToJSONKeyType = "symbolASCII"): { [x: string]: number; };// Get all of the units value.
    .toStringASCII(unit: TemperatureUnits | string = "K"): string;// Get unit's value with ASCII symbol.
    .toStringStandard(unit: TemperatureUnits | string = "K"): string;// Get unit's value with Standard symbol.
    .toValue(unit: TemperatureUnits | string = "K"): number;// Get unit's value.
  
  Temperature.difference(a: Temperature, b: Temperature): TemperatureDifference;// Calculate temperature difference by units.
  Temperature.unit(unit: TemperatureUnits | string): TemperatureUnitMeta;// Get a temperature unit meta.
  Temperature.units(): TemperatureUnitMeta[];// Get all of the temperature units meta.
  Temperature.unitSI(): TemperatureUnitMeta;// Get temperature SI unit meta.
  ```

#### Interface / Type

- ```ts
  type TemperatureToJSONKeyType = "nameASCII" | "nameStandard" | "symbolASCII" | "symbolStandard";
  ```
- ```ts
  type TemperatureUnitMeta = {
    isSIUnit: boolean;
    nameASCII: string;
    nameStandard: string;
    symbolASCII: string;
    symbolStandard: string;
  };
  ```

### Example

```js
new Temperature(25, "C").toValue("K");
//=> 298.15

new Temperature(25, "C").toStringStandard("K");
//=> "298.15 K"

new Temperature(298.15).toValue("C");
//=> 25

new Temperature(298.15).toStringStandard("C");
//=> "25 °C"
```
