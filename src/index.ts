import detectStems from './detect-stems';
import orderStems from './order-stems';
import validateStems from './validate-stems';





// TODO: temp testing...
console.log('Hello, World!');





// TODO: temp testing...
let appPath = process.cwd();
let stems = detectStems(appPath);
validateStems(stems);
stems = orderStems(stems);
console.log(stems);
