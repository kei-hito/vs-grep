## 概要
Visual Studio Code用のextensionです。
テキストファイルの内容をGrepして、その結果をファイルに出力します。

## 使い方
本extensionでは下記のコマンドを提供しています。

* Grep: 正規表現を使わずにGrepする
* Grep Regex: 正規表現を使ってGrepする

使い方は下記のとおりです。

1. Grepをかけたいテキストファイルを開く
2. Ctrl+Shift+pでコマンドパレットを開く
3. 上記のコマンドのいずれかを入力しEnterを押すと、テキスト入力ボックスが表示される
4. テキストボックスに検索する文字列を入力し、Enterを押す

=> コマンドに応じた結果が、新しいタブに出力されます。

## インストール方法

1. 本リポジトリから、vsixファイルをダウンロードする
2. Visual Studio Codeを起動する
3. 画面左の拡張機能のボタンを押す
4. 表示されるメニュー上部の「・・・」を押す
5. 「VSIXからのインストール」を選択する
6. ダウンロードした.vsixファイルを選択し、インストールを開始する
7. Visual Studio Codeを再起動する
