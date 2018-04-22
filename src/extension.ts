'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "grep" is now active!');
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World!');
    

        var prompt = vscode.window.showInputBox();
        prompt.then((value) => {
            if (value === undefined) {
                return;
            }
            let editor = vscode.window.activeTextEditor; // エディタ取得
    
            if (!editor) {
                vscode.window.showErrorMessage("File is not opened. Please open a file.");
                return;
            }

            let doc = editor.document;            // ドキュメント取得
            let cur_selection = editor.selection; // 選択範囲取得
        
            if(editor.selection.isEmpty){         
                let startPos = new vscode.Position(0, 0);
                let endPos = new vscode.Position(doc.lineCount - 1, 10000);
                cur_selection = new vscode.Selection(startPos, endPos);
            }
    
            let text = doc.getText(cur_selection); //取得されたテキスト
            var lines = text.split(/\r\n|\r|\n/);
            var result = "";

            for (var i = 0; i < lines.length; i++) {
                if (lines[i].includes(value)) {
                    result = result + lines[i] + '\r\n';
                }
            }

            vscode.workspace.openTextDocument().then(
                doc => {
                    vscode.window.showTextDocument(doc).then(
                        doc => {
                            let e = vscode.window.activeTextEditor;
                            if (!e) {
                                return;
                            } 
                            e.edit(edit => {
                                edit.insert(new vscode.Position(0,0), result);
                            });
                        }
                    );
                }
            );
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}