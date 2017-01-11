import * as semver from 'semver';
import {logger} from './util';
import StemInfo from './stem-info';





// TODO: should we really log inside this function? Pass in optional logger?





/** TODO: doc... */
export default function validateStems(stems: StemInfo[]) {

    logger.info('Validating STEMs....');

    // TODO: Throw if any STEMs have duplicates
    let counts = stems.reduce(
        (counts, stem) => {
            counts[stem.name] = (counts[stem.name] || 0) + 1;
            return counts;
        },
        {} as {[name: string]: number}
    );
    let duplicateNames = Object.keys(counts).filter(name => counts[name] > 1);
    if (duplicateNames.length > 0) {
        logger.error('Duplicate STEM name(s) detected: ' + duplicateNames.join(', '));
    }

    // Throw if any dependencies are missing/unreachable or have a required/supplied version mismatch.
    stems.forEach(stem => {
        stem.dependencies.forEach(depName => {

            let reqVersion = stem.package.dependencies[depName];
            let dep = stems.find(stem => stem.name === depName);

            // TODO: this *should* additionally check that the dependency can be require()d from the stem's location
            if (!dep) {
                logger.error("STEM '" + stem.name + "': cannot resolve dependency '" + depName + "'. STEM not found.");
                return; // redundant, but satisfies TypeScript's CFA
            }

            if (!semver.satisfies(dep.version, reqVersion)) {
                logger.error("STEM '" + stem.name + "': cannot resolve dependency '" + depName + "'. Version mismatch (required: " + reqVersion + ", actual: " + dep.version + ").");
            }
        });
    });
}
