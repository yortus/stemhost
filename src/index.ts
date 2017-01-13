import detectStems from './detect-stems';
import loadStems from './load-stems';
import orderStems from './order-stems';
import reportStems from './report-stems';
import validateStems from './validate-stems';
import wrapStems from './wrap-stems';
import {info} from './util';





// TODO: doc IIAFE...
(async () => {
    try {

        // TODO: temp testing... prepare...
        let appPath = process.cwd();
        info('[Searching for STEMs]');
        let stems = detectStems(appPath);
        info('[Validating STEMs]');
        validateStems(appPath, stems);
        info('[Arranging STEMs]');
        stems = orderStems(stems);
        reportStems(stems);

        // TODO: temp testing... augment...
        info('[Augmenting STEMs]');
        wrapStems(stems);

        // TODO: temp testing... startup...
        info('[Starting application]');
        await loadStems(stems);
        info('[Application started]');
    }
    catch (err) {
        // Treat as already handled and just exit gracefully. Otherwise we'll have an UnhandledRejectionError
        // TODO: anything else we should do here?
console.log(err);
        return;
    }
})();
