import * as path from 'path';
import * as glob from 'glob';





// TODO: temp testing...
console.log('Hello, World!');


// Find all modules recursively, using the presence of package.json as a proxy to identify them
let modulePaths = glob.sync('node_modules/**/package.json').map(fn => fn.slice(0, -12));
console.log('=================================');
console.log(modulePaths);


// Work out which of these are stems. ie can resolve 'module/stem'.
let stemPaths = modulePaths.map(mp => {
    try {
        return require.resolve(path.join(mp, 'stem'));
    }
    catch (ex) {
        return null;
    }
});
console.log('=================================');
console.log(stemPaths);

