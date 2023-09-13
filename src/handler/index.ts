import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';
import {processFile, setConfigPath} from 'intelli-buddy';
import {findClosestFileMatch} from '../helpers/index';

let configPath: string | undefined = vscode.workspace.getConfiguration('intellibuddy').get('configAbsolutePath');

/**
 * Clear the saved data
 */
export function emptyStore() {
	configPath = undefined;
}

/**
 * Process an opened file in the workspace
 */
export async function processFileHandler(this: {withDiff: boolean}) {
	const
		filePath = vscode.window.activeTextEditor?.document.fileName;

	if (!filePath) {
		return vscode.window.showErrorMessage('You should open a necessary file.');
	}

	const
		folderPathLen = vscode.workspace.workspaceFolders?.[0].uri.path?.split(path.sep).length,
		filePathLen = filePath?.split(path.sep).length;

	if (!folderPathLen || filePathLen - folderPathLen < 0) {
		return vscode.window.showErrorMessage('Oops, something went wrong... You can send a report about it.');
	}

	if (!configPath || !fs.existsSync(configPath))  {
		configPath = findClosestFileMatch(filePath, '.ai-config.json', {maxDepth:  filePathLen - folderPathLen});

		if (configPath == null) {
			return vscode.window.showErrorMessage('Oops... The `.ai-config.json` file was not found.');
		}
	}

	try {
		setConfigPath(configPath);
		await processFile(filePath, this.withDiff);

	} catch (error) {
		if (typeof error === 'string') {
			return vscode.window.showErrorMessage('something was wrong.', error);
		}

		return vscode.window.showErrorMessage('something was wrong.');
	}
}
