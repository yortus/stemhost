import {exec} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import list from '../list';
import {info, error} from '../../util';





// TODO: doc...
export default async function build() {

    // TODO: ...
    let stems = await list();
    let buildableStems = stems.filter(stem => stem.sourcePath !== null);
    if (buildableStems.length === 0) {
        info(`Nothing to build.`);
        return;
    }
    info(`Building STEMs....`);
    let nonBuildableStemNames = stems.filter(stem => stem.sourcePath === null).map(s => s.name);
    if (nonBuildableStemNames.length > 0) {
        info(`Skipping ${nonBuildableStemNames} (no source).`);
    }
    let rebuiltStemNames: string[] = [];

    // TODO: ...
    for (let i = 0; i < buildableStems.length; ++i) {
        let stem = buildableStems[i];

        // This STEM needs rebuilding if either:
        // (i) any of its direct dependencies were rebuilt; or
        // (ii) it has no module code; or
        // (iii) its newest source code is newer than its newest module code.
        let shouldRebuild = stem.requires.some(stemName => rebuiltStemNames.indexOf(stemName) !== -1);
        if (!shouldRebuild) {
            let moduleFiles = glob.sync(path.join(stem.modulePath, '**/*.*'));
            shouldRebuild = moduleFiles.length === 0;
            if (!shouldRebuild) {
                let sourceFiles = glob.sync(path.join(stem.sourcePath!, '**/*.*'));
                let newestSource = getNewestModifiedTime(sourceFiles);
                shouldRebuild = !hasNewerModifiedTime(moduleFiles, newestSource);
            }
        }

        // Skip rebuilding if not needed.
        if (!shouldRebuild) {
            info(`Skipping ${stem.name} (up to date).`);
            continue;
        }

        // TODO: rebuild this STEM!!!!!
        // npm run build in STEM source dir
        info(`Building ${stem.name}....`);
        await runCommand(`npm run build-${stem.name}`);
    }

    // TODO: ...
    info('Build completed.');
}





// TODO: doc...
function getNewestModifiedTime(filePaths: string[]) {
    let newest = filePaths.reduce(
        (newest, filePath) => {
            let mtime = fs.statSync(filePath).mtime;
            return mtime > newest ? mtime : newest;
        },
        new Date(0)
    );
    return newest;
}





// TODO: doc...
function hasNewerModifiedTime(filePaths: string[], threshold: Date) {
    for (let i = 0; i < filePaths.length; ++i) {
        if (fs.statSync(filePaths[i]).mtime > threshold) {
            return true;
        }
    }
    return false;
}





// TODO: doc...
function runCommand(command: string, cwd?: string) {
    return new Promise((resolve, reject) => {
        exec(command, {cwd}, (err, stdout, stderr) => {
            if (stdout) {
                info(stdout);
            }
            if (stderr) {
                error(stderr);
            }
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
