# Temperature (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/temperature-es](https://img.shields.io/github/v/release/hugoalh-studio/temperature-es?label=hugoalh-studio/temperature-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/temperature-es")](https://github.com/hugoalh-studio/temperature-es)
[![JSR: @hugoalh/temperature](https://img.shields.io/jsr/v/@hugoalh/temperature?label=JSR%20@hugoalh/temperature&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/temperature")](https://jsr.io/@hugoalh/temperature)
[![NPM: @hugoalh/temperature](https://img.shields.io/npm/v/@hugoalh/temperature?label=@hugoalh/temperature&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/temperature")](https://www.npmjs.com/package/@hugoalh/temperature)

An ES (JavaScript & TypeScript) module to convert between units of the temperature.

Units of the temperature are from "[Wikipedia - Conversion of scales of temperature](https://en.wikipedia.org/wiki/Conversion_of_scales_of_temperature)".

|  | **Names** | **Symbols** |
|:-:|:-:|:-:|
| ***\[SI\]*** **Kelvin** | `Kelvin` | `K` |
| **Celsius** | `Celsius` | `°C` / `C` |
| **Delisle** | `Delisle` | `°De` / `De` / `D` |
| **Fahrenheit** | `Fahrenheit` | `°F` / `F` |
| **Sir Isaac Newton's degree of temperature (Newton)** | `Newton` | `°N` / `N` |
| **Rankine** | `Rankine` | `°R` / `R` / `Ra` |
| **Réaumur** | `Réaumur` / `Reaumur` | `°Ré` / `Re` / `r` |
| **Rømer** | `Rømer` / `Roemer` / `Romer` | `°Rø` / `Ro` |

> **ℹ️ Note**
>
> This module uses the built in JavaScript `Number` type, which is a floating point number with a limited precision of 64 bits, about 16 digits. Floating point numbers round-off errors can occur during calculations:
>
> ```ts
> 0.1 + 0.2;
> //=> 0.30000000000000004
> ```
>
> In most cases, round-off errors do not matter, they have no significant impact on the results. However, it looks ugly when displaying output to a user. A solution is to limit the precision just below the actual precision of 16 digits in the displayed output:
>
> ```ts
> (0.1 + 0.2).toPrecision(14);
> //=> 0.3
> ```

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/temperature[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/temperature[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/temperature[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/temperature[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/temperature";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/temperature[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/temperature[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/temperature[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/temperature[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/temperature";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/temperature[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/temperature-es/${Tag}/mod.ts";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

## 🧩 API

- ```ts
  class Temperature {
    constructor(fromValue: number, fromUnit: TemperatureUnitsInput = "K"): Temperature;
    toObject(): Record<TemperatureUnitsSymbolASCII, number>;
    toString(toUnit: TemperatureUnitsInput = "K"): string;
    toValue(toUnit: TemperatureUnitsInput = "K"): number;
    static unit(unit: TemperatureUnitsInput = "K"): TemperatureUnitMeta;
    static units(): TemperatureUnitMeta[];
  }
  ```
- ```ts
  function convertTemperature(fromValue: number, fromUnit: TemperatureUnitsInput = "K", toUnit: TemperatureUnitsInput = "K"): number;
  ```
- ```ts
  interface TemperatureUnitMeta {
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
  ```
- ```ts
  type TemperatureUnitsInput = TemperatureUnitsNames | TemperatureUnitsSymbolASCII | TemperatureUnitsSymbols;
  ```
- ```ts
  type TemperatureUnitsNames = typeof unitsNames[TemperatureUnitsSymbolASCII][number];
  ```
- ```ts
  type TemperatureUnitsSymbolASCII = keyof typeof unitsSymbols;
  ```
- ```ts
  type TemperatureUnitsSymbols = typeof unitsSymbols[TemperatureUnitsSymbolASCII][number];
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/temperature)

## ✍️ Example

- ```ts
  new Temperature(25, "C").toValue();
  //=> 298.15
  ```
- ```ts
  new Temperature(25, "C").toString();
  //=> "298.15 K"
  ```
- ```ts
  new Temperature(298.15).toValue("C");
  //=> 25
  ```
- ```ts
  new Temperature(298.15).toString("C");
  //=> "25 °C"
  ```
