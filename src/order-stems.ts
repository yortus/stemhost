import {logger} from './util';
import StemInfo from './stem-info';





/**
 *  Return a new array of stems sorted into load order. This is an order which guarantees that each STEM
 *  comes *after* all the STEMs on which it directly or indirectly depends.
 *  Throw an error if a cyclic dependency is detected.
 */
export default function orderStems(stems: StemInfo[]): StemInfo[] {

    // TODO: doc...
    var sorted: StemInfo[] = [];
    stems.forEach(stem => ensureSorted(stem, []));
    return sorted;

    // TODO: doc... closure...
    function ensureSorted(stem: StemInfo, sorting: StemInfo[]) {

        if (sorted.indexOf(stem) !== -1) return; // already sorted

        if (sorting.indexOf(stem) !== -1) {
            var cycle = sorting.map(p => "'" + p.name + "'").join(', ');
            logger.error("Cyclic dependencies between stems: " + cycle + ".");
        }
        sorting.push(stem);
        stem.dependencies.forEach(depName => {
            var depStem = stems.find(stem => stem.name === depName)!;
            ensureSorted(depStem, sorting);
        });
        sorting.pop();
        sorted.push(stem);
    }
}
