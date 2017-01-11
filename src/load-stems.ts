import * as path from 'path';
import StemEntry from './stem-entry';
import StemInfo from './stem-info';





export default async function loadStems(stems: StemInfo[]) {
    for (let i = 0; i < stems.length; ++i) {
        let stem = stems[i];
        let entry: StemEntry = require(path.join(stem.path, 'stem'));
        let ready = entry.ready || Promise.resolve(true);
        await ready;
    }
}
