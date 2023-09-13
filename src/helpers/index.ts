import {sync} from 'glob';
import * as path from 'path';
import * as fs from 'fs';
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
	const filePath = sourcePath.split(path.sep);

	let destination;
	let i = 0;

	while (i++ < maxDepth) {
		if (destination != null) {
			break;
		}

		filePath.pop();

		if (!fs.statSync(path.resolve(...filePath)).isDirectory()) {
			continue;
		}

		const globPattern = `${path.resolve(...filePath)}/${targetFile}`;
		destination = sync(globPattern)[0];
	}

	return destination;
}
