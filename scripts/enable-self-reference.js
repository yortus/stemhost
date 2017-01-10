var fs = require('fs');
var path = require('path');


// Add stem-host.js and stem-host.d.ts to our own node_modules folder, so it can require() itself (e.g. in tests).
fs.writeFileSync(path.join(__dirname, '../node_modules/stem-host.js'), `module.exports = require('..');`);
fs.writeFileSync(path.join(__dirname, '../node_modules/stem-host.d.ts'), `export * from '..';`);
