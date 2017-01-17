import * as fs from 'fs';
import * as path from 'path';
import {error} from '../util';
import StemInfo from './stem-info';





// TODO: ...
export default function getStemInfo(appPath: string, stemName: string) {

    // Compute the STEM's absolute source and module paths.
    let sourcePath = path.join(appPath, 'stem_sources', stemName);
    let modulePath = path.join(appPath, 'node_modules', stemName);

    // Determine the existence of the STEM's source and/or module.
    let sourcePackagePath = path.join(sourcePath, 'package.json');
    let modulePackagePath = path.join(modulePath, 'package.json');
    let sourceExists = fs.existsSync(sourcePackagePath);
    let moduleExists = fs.existsSync(modulePackagePath);

    // If neither module nor source exists, then we have an error.
    if (!sourceExists && !moduleExists) error(`'${stemName}' is not a STEM`);

    // Load the STEM's package.json file to get additional info about it.
    let pkg = sourceExists ? require(sourcePackagePath) : require(modulePackagePath);

    // Put together a complete StemInfo structure for the STEM.
    let stemInfo: StemInfo = {
        name: pkg.name,
        version: pkg.version,
        modulePath: modulePath,
        sourcePath: sourceExists ? sourcePath : null,
        package: pkg,
    };

    // All done.
    return stemInfo;
}
