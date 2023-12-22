# SORACOM Orbit SDK for AssemblyScript

SORACOM Orbit のための AssemblyScript 言語の SDK です。

SORACOM Orbit でデータ変換処理を行うための WASM モジュールを AssemblyScript 言語のソースコードから生成する際にご利用ください。

## 前提条件

SDK を使ったプログラムのコンパイルには [TypeScript](https://www.typescriptlang.org/) や [AssemblyScript](https://www.assemblyscript.org/) を利用します。
以下の node module を 事前にインストールしてください。

- **dependencies**
  - orbit-sdk-assemblyscript ( 例: "soracom/orbit-sdk-assemblyscript" )
- **devDependencies**
  - @assemblyscript/loader ( Version 0.18.32 で動作確認済 )
  - @types/node
  - assemblyscript ( Version 0.18.32 で動作確認済 )
  - typescript

## 利用方法

プログラムをコンパイルするには以下の script を `package.json` に追加してください。

```json
{
    "scripts": {
        "build": "asc assembly/index.ts --binaryFile build/soralet.wasm --sourceMap --debug --runtime stub --use abort=~lib/orbit-sdk-assemblyscript/index/abort",
        "build:optimized": "asc assembly/index.ts --binaryFile build/soralet-optimized.wasm --sourceMap --optimize --runtime stub --use abort=~lib/orbit-sdk-assemblyscript/index/abort"
    }
}
```

`npm run build` または `npm run build:optimized` のコマンドでビルドを行うと、`build`ディレクトリの中に`soralet.wasm`または`soralet-optimized.wasm`が生成されます。  
いずれかのファイルを Soralet として[アップロード](https://users.soracom.io/ja-jp/docs/orbit/deployment/#soralet-%e3%82%92%e4%bd%9c%e6%88%90%e3%81%97%e3%81%a6-wasm-%e3%83%a2%e3%82%b8%e3%83%a5%e3%83%bc%e3%83%ab%e3%82%92%e3%82%a2%e3%83%83%e3%83%97%e3%83%ad%e3%83%bc%e3%83%89%e3%81%99%e3%82%8b)します。  
`soralet.wasm`はデバッグ用、`soralet-optimized.wasm`はリリース用の WASM ファイルです。

SDK が提供する関数は以下の様にインポートしてください。

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

[SORACOM Orbit SDK リファレンス](https://users.soracom.io/ja-jp/docs/orbit/sdk/#assemblyscript)もご利用ください。

具体的な利用方法は `examples` ディレクトリの各サンプルをご参照ください。

## 利用例

このリポジトリの `examples` ディレクトリには以下のサンプルが含まれています。

- [`gps-multi-unit`](./examples/gps-multi-unit/)

  [GPS マルチユニット SORACOM Edition（バッテリー内蔵タイプ）](https://soracom.jp/store/5235/) から送られてくるデータを元にジオフェンシングを行うサンプルです。

- [`lte-m-button`](./examples/lte-m-button/)

  SORACOM LTE-M Button シリーズ ([SORACOM LTE-M Button Plus](https://soracom.jp/store/5207/) および [SORACOM LTE-M Button for Enterprise](https://soracom.jp/store/5206/)) から送られてくるデータに補助的な情報を追加して送信するサンプルです。

## ライセンス

この SDK は MIT ライセンスの下で公開されています。詳細については [LICENSE](./LICENSE.txt) ファイルをご覧ください。
