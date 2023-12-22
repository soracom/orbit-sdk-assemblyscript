# SORACOM Orbit SDK for AssemblyScript - GPS マルチユニット SORACOM Edition (バッテリー内蔵タイプ) 向けのサンプル

## 概要

[GPS マルチユニット SORACOM Edition (バッテリー内蔵タイプ)](https://soracom.jp/store/5235/) (以下、GPS マルチユニット) から送られてくるデータを [SORACOM Orbit](https://soracom.jp/services/orbit/) を使って加工するためのサンプルコードです。

GPS マルチユニットからは通常以下のような JSON が送られてきます。

```json
{
   "bat":3,
   "humi":68.2,
   "lat":35.12345,
   "lon":139.12345,
   "rs":0,
   "temp":10.5,
   "type":0,
   "x":64.0,
   "y":-64.0,
   "z":1024.0
}
```

このサンプルではこの JSON に含まれる GPS 位置情報 (`lat` および `lon`) を元にジオフェンシングを行います。
具体的には、以下のように中心座標からの距離を示す `distance_in_km` フィールド、中心座標から一定の距離の中に収まっているかどうかを示す `inside_area` フィールドを追加します。
また SIM を特定するための IMSI と名前も追加します。

```json
{
   "bat":3,
   "distance_in_km":1.7727168801439308,
   "humi":68.2,
   "imsi":"44010xxxxxxxxxx",
   "inside_area":0,
   "lat":35.12345,
   "lon":139.12345,
   "name":"My GPS Multi-unit",
   "rs":0,
   "temp":10.5,
   "type":0,
   "user_data":"Hello, userdata",
   "x":64.0,
   "y":-64.0,
   "z":1024.0
}
```

## 実行方法

1. サンプルの依存ライブラリをインストールします。
   ```
   npm ci
   ```

2. ソースコードをコンパイルします。
   ```
   npm run build:optimized
   ```

3. コンパイルしたコードをアップロードするための受け皿となる Soralet を作成します。（最初の一度のみ）
   ```
   make create-soralet
   ```
   事前に SORACOM のアカウントを作成し、[soracom-cli](https://github.com/soracom/soracom-cli) をインストールしておく必要があります。
   default 以外のプロファイルを使用したい場合は、
   ```
   make create-soralet soracom_profile=${profile_name}
   ```
   のように引数に指定します。

   デフォルトでは `gps-multi-unit` という ID の Soralet を作成します。異なる ID を使用したい場合は
   ```
   make create-soralet soralet_id=${soralet_id}
   ```
   のように指定します。
   `soralet_id` と `soracom_profile` は両方とも指定することもできます。

4. コンパイルしたコードをアップロードします。
   ```
   make upload
   ```
   プロファイルや Soralet ID をオーバーライドしたい場合は 3. と同様です。

5. アップロードしたコードをテストします。
   ```
   make test
   ```
   以下のような結果が表示されたら成功です。
   ```json
   {
        "body": "{\"inside_area\":0,\"distance_in_km\":1.7727168801439309,\"imsi\":\"44010xxxxxxxxxx\",\"name\":\"My GPS Multi-unit\",\"bat\":3,\"humi\":68.2,\"lat\":35.12345,\"lon\":139.12345,\"rs\":0,\"temp\":10.5,\"type\":0,\"x\":64.0,\"y\":-64.0,\"z\":1024.0,\"timestamp\":1702967682203,\"user_data\":\"Hello, userdata\"}",
        "contentType": "application/json",
        "encodingType": "plain",
        "resultCode": 0
   }
   ```

6. うまく行かない場合はログを確認します。
   ```
   make log
   ```
   以下のようにログが表示されます。サンプルコードの中の `log()` 関数で出力しているメッセージと見比べて、どこまで実行されているかを調べたり、変数の中に格納されている値を確認することができます。
   ```json
   [
        {
            "createdTime": 1702967682480,
            "message": "center: 35.11111, 139.11111 / pos: 35.12345, 139.12345",
            "operatorId": "OP0037309967",
            "soraletId": "gps-multi-unit",
            "version": 1
        },
   ...
   ]
   ```

7．動作確認ができたら、GPS マルチユニットのグループ設定から今アップロードした Soralet を関連付けます。設定方法の詳細は [ユーザードキュメント](https://users.soracom.io/ja-jp/docs/orbit/running/) を参照してください。
   続いて SIM のタグに中心座標を表す `center_lat` と `center_lon`、そこからの半径を表す `radius` を指定します。中心座標の緯度経度は Google Maps などから値を取得して設定してください。
   その後実際に GPS マルチユニットから GPS 座標を送信してみましょう。
