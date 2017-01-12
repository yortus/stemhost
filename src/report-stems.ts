import {info} from './util';
import StemInfo from './stem-info';





/** Outputs STEM metadata and dependency relationships. */
export default function reportStems(stems: StemInfo[]) {

    // Log STEM metadata
    let longestStemName = Math.min(stems.reduce((longest, stem) => Math.max(longest, stem.name.length), 0), 20);
    info('--------------');
    info('Detected STEMs');
    info('--------------');
    stems.forEach(stem => {
        var name = (stem.name + '                    ').substr(0, longestStemName);
        info(`  ${name}   ${stem.version}   ${stem.path}`);
    });

    // Log the dependency graph.
    info('----------------------------------------------');
    info('STEM dependencies:   DEPENDER --> DEPENDENCIES');
    info('----------------------------------------------');
    stems.forEach(stem => {
        var depsOn = stem.dependencies.filter(dep => dep !== stem.name);
        var name = (stem.name + '                    ').substr(0, longestStemName);
        var deps = depsOn.length > 0 ? depsOn.join(', ') : '(none)';
        info(`  ${name} --> ${deps}`);
    });
    info('----------------------------------------------');
    info('STEM dependencies:   DEPENDENCY <-- DEPENDERS');
    info('----------------------------------------------');
    stems.forEach(stem => {
        var usedBy = stems.filter(st => st !== stem && st.dependencies.indexOf(stem.name) !== -1).map(st => st.name);
        var name = (stem.name + '                    ').substr(0, longestStemName);
        var deps = usedBy.length > 0 ? usedBy.join(', ') : '(none)';
        info(`  ${name} <-- ${deps}`);
    });
}
