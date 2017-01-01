# nodejs_namedpipe
Server/Client application with Windows Named Pipe

## 概要
これはWindows Named Pipeを使用した簡単なサーバー／クライアントアプリの実装例です。

## ビルド方法
package.jsonに記載の通り、sleepモジュールを使用しています。
このsleepモジュールにはネイティブコードが含まれているため、windows-build-toolsなどのネイティブコードビルド環境が必要ですので、npm installを事項する前に用意してください。

## 使用方法
コマンドプロンプトでrun.batを実行すると、サーバーを別のコマンドプロンプトで起動し、クライアントは現在のコマンドプロンプトで起動します。
サーバー側、クライアント側のいずれかで適当な文字列を入力してENTERキーを押下すると、相手側に入力した文字列が送信されます。
'exit'と入力すると、サーバー側、クライアント側のどちらも終了します。
