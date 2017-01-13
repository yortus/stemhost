import * as path from 'path';
import {info} from './util';
import StemEntry from './stem-entry';
import StemInfo from './stem-info';





// TODO: ...
export default async function loadStems(stems: StemInfo[]) {

    // TODO: ...
    let stemEntries = stems.map(stem => require(path.join(stem.path, 'stem')) as StemEntry);
    let importerLists = stems.map(stem => stem.requiredBy.map(name => stems.find(dep => dep.name === name)!));

    // Before start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: before start`);
        let beforeStart = stemEntries[i].beforeStart;
        if (!beforeStart) continue;
        await beforeStart(importerLists[i]);
    }

    // Start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: start`);
        let start = stemEntries[i].start;
        if (!start) continue;
        await start(importerLists[i]);
    }

    // After start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: after start`);
        let afterStart = stemEntries[i].afterStart;
        if (!afterStart) continue;
        await afterStart(importerLists[i]);
    }
}
