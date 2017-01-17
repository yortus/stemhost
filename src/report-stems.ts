import {info} from './util';
import {StemInfoWithDeps} from './stem-info';





/** Outputs STEM metadata and dependency relationships. */
export default function reportStems(stems: StemInfoWithDeps[]) {

    // Log STEM metadata
    let longestStemName = Math.min(stems.reduce((longest, stem) => Math.max(longest, stem.name.length), 0), 20);
    info('--------------');
    info('Detected STEMs');
    info('--------------');
    stems.forEach(stem => {
        let name = (stem.name + '                    ').substr(0, longestStemName);
        info(`  ${name}   ${stem.version}   ${stem.modulePath}`);
    });

    // Log the dependency graph.
    info('----------------------------------------------');
    info('STEM dependencies:   DEPENDER --> DEPENDENCIES');
    info('----------------------------------------------');
    stems.forEach(stem => {
        let name = (stem.name + '                    ').substr(0, longestStemName);
        let deps = stem.requires!.join(', ') || '(none)';
        info(`  ${name} --> ${deps}`);
    });
    info('----------------------------------------------');
    info('STEM dependencies:   DEPENDENCY <-- DEPENDERS');
    info('----------------------------------------------');
    stems.forEach(stem => {
        let name = (stem.name + '                    ').substr(0, longestStemName);
        let deps = stem.requiredBy!.join(', ') || '(none)';
        info(`  ${name} <-- ${deps}`);
    });
}
