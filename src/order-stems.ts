import {error} from './util';
import StemInfo from './stem-info';





/**
 * Returns a new array of STEMs sorted into load order. This is an order which
 * guarantees that each STEM comes *after* all the STEMs on which it directly
 * or indirectly depends. Throws an error if a cyclic dependency is detected.
 */
export default function orderStems(stems: StemInfo[]): StemInfo[] {

    // TODO: doc...
    let sorted: StemInfo[] = [];
    stems.forEach(stem => ensureSorted(stem, []));
    return sorted;

    // TODO: doc... closure...
    function ensureSorted(stem: StemInfo, sorting: StemInfo[]) {

        if (sorted.indexOf(stem) !== -1) return; // already sorted

        if (sorting.indexOf(stem) !== -1) {
            let cycle = sorting.map(p => `'${p.name}'`).join(', ');
            error(`Cyclic dependencies between stems: ${cycle}.`);
        }
        sorting.push(stem);
        stem.requires.forEach(depName => {
            let depStem = stems.find(stem => stem.name === depName)!;
            ensureSorted(depStem, sorting);
        });
        sorting.pop();
        sorted.push(stem);
    }
}
