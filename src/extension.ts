import * as vscode from 'vscode';
import { processFileHandler, emptyStore } from './handler';
import { configurationNamespace, registerCommand } from './helpers';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 *
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
	const showDiff = vscode.workspace.getConfiguration(configurationNamespace).get('showDiff');

	registerCommand(context, 'processFile', processFileHandler.bind({withDiff: showDiff === false ? false : true}));
	registerCommand(context, 'processFileWithoutDiff', processFileHandler.bind({withDiff: false}));
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
	emptyStore();
}
