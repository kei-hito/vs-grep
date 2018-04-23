'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let grepCommand = vscode.commands.registerCommand('extension.grep', () => {
        var prompt = vscode.window.showInputBox({prompt: 'Please type a search word.'});
        prompt.then((word) => {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("A target file is not opened. Please open a target file.");
                return;
            }

            if (!word) {
                vscode.window.showErrorMessage("Please type search word.");
                return;
            }

            let text = getSelectionText(editor);
            vscode.workspace.openTextDocument().then(
                doc => {
                    vscode.window.showTextDocument(doc).then(
                        doc => {
                            let e = vscode.window.activeTextEditor;
                            if (!e) {
                                vscode.window.showErrorMessage("unexpected error[0001].");
                                return;
                            } 
                            e.edit(edit => {
                                edit.insert(new vscode.Position(0,0), getGrepTextOf(text, word));
                            });
                        }
                    );
                }
            );
        });
    });

    let grepexCommand = vscode.commands.registerCommand('extension.grepex', () => {
        var prompt = vscode.window.showInputBox({prompt: 'Please type a search Regex Pattern.'});
        prompt.then((word) => {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage("A target file is not opened. Please open a target file.");
                return;
            }

            if (!word) {
                vscode.window.showErrorMessage("Please type search word.");
                return;
            }

            let text = getSelectionText(editor);
            vscode.workspace.openTextDocument().then(
                doc => {
                    vscode.window.showTextDocument(doc).then(
                        doc => {
                            let e = vscode.window.activeTextEditor;
                            if (!e) {
                                vscode.window.showErrorMessage("unexpected error[0002].");
                                return;
                            } 
                            e.edit(edit => {
                                edit.insert(new vscode.Position(0,0), getGrepTextRegOf(text, word));
                            });
                        }
                    );
                }
            );
        });
    });

    context.subscriptions.push(grepCommand);
    context.subscriptions.push(grepexCommand);
}

function getSelectionText(editor: vscode.TextEditor): string {
    let doc = editor.document;
    let cur_selection = editor.selection;
    if(editor.selection.isEmpty){         
        let startPos = new vscode.Position(0, 0);
        let endPos = new vscode.Position(doc.lineCount - 1, 1000000);
        cur_selection = new vscode.Selection(startPos, endPos);
    }
    return doc.getText(cur_selection);
}

function getGrepTextOf(text: string, word: string): string {
    let lines = text.split(/\r\n|\r|\n/);
    let result = "";
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes(word)) {
            result = result + lines[i] + '\r\n';
        }
    }
    return result;
}

function getGrepTextRegOf(text: string, pattern: string): string {
    let lines = text.split(/\r\n|\r|\n/);
    let result = "";
    var myregex = new RegExp(pattern);
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(myregex)) {
            result = result + lines[i] + '\r\n';
        }
    }
    return result;
}
// this method is called when your extension is deactivated
export function deactivate() {
}