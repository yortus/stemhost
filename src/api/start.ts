import list from './list';
import loadStems from './load-stems';
import wrapStems from './wrap-stems';
import {info} from '../util';





// TODO: doc...
export default async function start() {

    let stems = await list();

    // TODO: temp testing... augment...
    info('Augmenting STEMs....');
    wrapStems(stems);

    // TODO: temp testing... startup...
    info('Starting application....');
    await loadStems(stems);
    info('Application started.');
}
