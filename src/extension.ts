import * as vscode from 'vscode';
import { processFileHandler, emptyStore } from './handler/index';

/**
 * Registers the command and subscribe
 *
 * @param context
 * @param commandName
 * @param handler
 */
function registerCommand(
	context: vscode.ExtensionContext,
	commandName: string,
	handler: (...args: any[]) => any
): void {
	context.subscriptions.push(
		vscode.commands.registerCommand(`intelli.${commandName}`, handler)
	);
};

export function activate(context: vscode.ExtensionContext) {
	const showDiff = vscode.workspace.getConfiguration('intellibuddy').get('showDiff');

	registerCommand(context, 'processFile', processFileHandler.bind({withDiff: showDiff === false ? false : true}));
	registerCommand(context, 'processFileWithoutDiff', processFileHandler.bind({withDiff: false}));
}

export function deactivate() {
	emptyStore();
}
