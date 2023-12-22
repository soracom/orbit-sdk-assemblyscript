# SORACOM Orbit SDK for AssemblyScript

This is the SDK for AssemblyScript programming language for SORACOM Orbit.

Please use it to generate WASM modules for data transformation processing in SORACOM Orbit from AssemblyScript language source code.

## Prerequisites

[TypeScript](https://www.typescriptlang.org/) and [AssemblyScript](https://www.assemblyscript.org/) are used to compile your program with SDK.
Please make sure to install the following node modules in advance.

- **dependencies**
  - orbit-sdk-assemblyscript ( e.g., "soracom/orbit-sdk-assemblyscript" )
- **devDependencies**
  - @assemblyscript/loader ( Tested with version 0.18.32 )
  - @types/node
  - assemblyscript ( Tested with version 0.18.32 )
  - typescript

## Usage

Please add some scripts to `package.json`, as shown below.

```json
{
    "scripts": {
        "build": "asc assembly/index.ts --binaryFile build/soralet.wasm --sourceMap --debug --runtime stub --use abort=~lib/orbit-sdk-assemblyscript/index/abort",
        "build:optimized": "asc assembly/index.ts --binaryFile build/soralet-optimized.wasm --sourceMap --optimize --runtime stub --use abort=~lib/orbit-sdk-assemblyscript/index/abort"
    }
}
```

Once `npm run build` or `npm run build:optimized` is executed, `soralet.wasm` or `soralet-optimized.wasm` is generated in the `build` directory.  
Please [upload](https://developers.soracom.io/en/docs/orbit/soralets-and-modules/) either one as a Soralet.  
`soralet.wasm` is for debugging, and `soralet-optimized.wasm` is for release.

Please import the functions SDK provides, as shown below.

```typescript
import {
  getInputBuffer,
  getInputBufferAsString,
  getTagValue,
  getSourceValue,
  getLocation,
  getTimestamp,
  getUserdata,
  setOutputJSON,
  log,
} from "orbit-sdk-assemblyscript";
```

Please refer to [Soracom Orbit SDK Reference](https://developers.soracom.io/en/docs/orbit/sdk-reference/).

For more specific usage, please refer to each sample in the `examples` directory.

## Examples

The `examples` directory in this repository includes the following samples:

- [`gps-multi-unit`](./examples/gps-multi-unit/)

  A sample for geofencing based on data sent from [GPS Multi Unit SORACOM Edition (Battery Built-in Type)](https://soracom.jp/store/5235/).

- [`lte-m-button`](./examples/lte-m-button/)

  A sample that adds auxiliary information to the data sent from the SORACOM LTE-M Button series ([SORACOM LTE-M Button Plus](https://soracom.jp/store/5207/) and [SORACOM LTE-M Button for Enterprise](https://soracom.jp/store/5206/)) and transmits it.

## License

This SDK is released under the MIT License. For details, please see the [LICENSE](./LICENSE.txt) file.
