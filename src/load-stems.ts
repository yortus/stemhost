import * as path from 'path';
import {info} from './util';
import StemMain from './stem-main';
import {StemInfoWithDeps} from './stem-info';





// TODO: ...
export default async function loadStems(stems: StemInfoWithDeps[]) {

    // TODO: ...
    let stemMains = stems.map(stem => require(path.join(stem.modulePath, 'stem')) as StemMain);
    let importerLists = stems.map(stem => stem.requiredBy.map(name => stems.find(dep => dep.name === name)!));

    // Before start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: before start`);
        let beforeStart = stemMains[i].beforeStart;
        if (!beforeStart) continue;
        await beforeStart(importerLists[i]);
    }

    // Start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: start`);
        let start = stemMains[i].start;
        if (!start) continue;
        await start(importerLists[i]);
    }

    // After start
    for (let i = 0; i < stems.length; ++i) {
        info(`  ${stems[i].name}: after start`);
        let afterStart = stemMains[i].afterStart;
        if (!afterStart) continue;
        await afterStart(importerLists[i]);
    }
}
