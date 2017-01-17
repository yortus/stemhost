import analyseDependencies from './analyse-dependencies';
import getStemInfo from './get-stem-info';
import getStemNames from './get-stem-names';
import loadStems from './load-stems';
import orderStems from './order-stems';
import reportStems from './report-stems';
import validateStems from './validate-stems';
import wrapStems from './wrap-stems';
import {info, error} from '../util';





// TODO: doc IIAFE...
export default async function start() {
    try {

        // TODO: temp testing... prepare...
        let appPath = process.cwd();
        info('Searching for STEMs....');
        let stemNames = getStemNames(appPath);
        let stems = analyseDependencies(stemNames.map(name => getStemInfo(appPath, name)));

        // Exit early if no STEMs found.
        if (stems.length === 0) {
            throw new Error(`No STEMs found. The directory ${appPath} does not appear to contain a STEM-based app.`);
        }

        // TODO: ...
        info('Validating STEMs....');
        validateStems(appPath, stems);
        info('Arranging STEMs....');
        stems = orderStems(stems);
        reportStems(stems);

        // TODO: temp testing... augment...
        info('Augmenting STEMs....');
        wrapStems(stems);

        // TODO: temp testing... startup...
        info('Starting application....');
        await loadStems(stems);
        info('Application started.');
    }
    catch (err) {
        error(err);
    }
}
