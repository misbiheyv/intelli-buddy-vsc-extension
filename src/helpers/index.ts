import * as path from 'path';
import {existsSync, statSync, readdirSync} from 'fs';

import { Options } from './interface';

/**
 * Finds a closest match
 *
 * @param sourcePath
 * @param targetFile
 * @param options
 */
export function findClosestFileMatch(
	sourcePath: string,
	targetFile: string,
	{maxDepth}: Options = {maxDepth: Infinity}
) : string | undefined {
	const resolvedPath = path.resolve(sourcePath);

	if (!existsSync(resolvedPath)) {
		throw Error(`Path ${resolvedPath} does not exists!`);
	}

	const filePath = resolvedPath.split(path.sep).slice(0, -1);

	let curPath = filePath.join(path.sep);
	let destination;
	let i = 0;

	while (i++ < maxDepth && filePath.length > 0) {
		if (!statSync(curPath).isDirectory()) {
			filePath.pop();
			continue;
		}

		const files = readdirSync(curPath);

		if (files.find((file) => file === targetFile) != null) {
			destination = path.resolve(...filePath, targetFile);
			break;
		}

		filePath.pop();
		curPath = filePath.join(path.sep);
	}

	return destination;
}
