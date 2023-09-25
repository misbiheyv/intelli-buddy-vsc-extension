import * as vscode from 'vscode';
import {commandsNamespace} from './consts';

/**
 * Registers the command and subscribe
 *
 * @param context
 * @param commandName
 * @param handler
 */
export function registerCommand(
	context: vscode.ExtensionContext,
	commandName: string,
	handler: (...args: any[]) => any
): void {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			`${commandsNamespace}.${commandName}`,
			() => displayProgress(handler)
		)
	);
};

/**
 * Function that notifies the user of an error.
 *
 * @param fn
 * @param args
 */
export async function errorNotifier(this: any, fn: (...args: any[]) => any, ...args: any[]): Promise<void> {
	try {
		await fn.call(this, ...args);
	} catch (error: any) {
		if ('toString' in error) {
			vscode.window.showErrorMessage(error.toString());
		}

		vscode.window.showErrorMessage('Oops... Unhandled error!');
	}
}

/**
 * Display the progress of a task in the VS Code status bar notification.
 * 
 * @param fn
 */
export async function displayProgress(fn: (...args: any[]) => any) {
	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: 'Task in processing...',
			cancellable: false
		},
		async () => await errorNotifier(fn)
	);
}
