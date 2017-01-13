import * as fs from 'fs';
import * as path from 'path';
import {error} from './util';
import StemEntry from './stem-entry';
import StemInfo from './stem-info';





// TODO: doc...
export default function wrapStems(stems: StemInfo[]) {
    stems.forEach(stem => {
        let entry = require(path.join(stem.path, 'stem')) as StemEntry;
        let decorateExports = entry.decorateExports;
        if (!decorateExports) return;

        stem.requiredBy.forEach(reqdBy => {
            let importer = stems.find(stem => stem.name === reqdBy)!;

            // Ensure the importer STEM has a node_modules directory.
            let nodeModulesPath = path.join(importer.path, 'node_modules');
            if (!fs.existsSync(nodeModulesPath)) fs.mkdirSync(nodeModulesPath);

            // Generate the exact text for the decorator script.
            let js = getDecoratorScript(stem, importer);

            // If the decorator file does not exist, generate it now.
            var scriptPath = path.join(nodeModulesPath, stem.name) + '.js';
            var exists = fs.existsSync(scriptPath);
            if (!exists) fs.writeFileSync(scriptPath, js, { encoding: 'utf8' });

            // Validate that the decorator file contains the script with exactly the expected contents.
            var isValid = fs.existsSync(scriptPath);
            isValid = isValid && fs.readFileSync(scriptPath, 'utf8') === js;
            if (!isValid) {
                var msg = "STEM '" + stem.name + "': refusing to create decorator script for '"
                        + stem.name + "'. Script already exists at '" + scriptPath + "'."
                        + " The script must be manually deleted in order to proceed.";
                error(msg);
            }
        });
    });
}





// TODO: doc...
function getDecoratorScript(stem: StemInfo, importer: StemInfo) {

    let body = () => {
        let stem = require('../../$STEM_NAME'), entry = require('../../$STEM_NAME/stem');
        module.exports = entry.decorateExports ? entry.decorateExports(stem, {name: '$IMPORTER_NAME'}) : stem;
    }

    let src = body
        .toString()
        .replace(/\$STEM_NAME/g, JSON.stringify(stem.name).slice(1, -1))
        .replace(/\$IMPORTER_NAME/g, JSON.stringify(importer.name).slice(1, -1))
        .split(/[\r\n]+/)
        .slice(1, -1)
        .map(line => line.replace(/^[ ]+/, ''))
        .join('\n');

    return src;
}
