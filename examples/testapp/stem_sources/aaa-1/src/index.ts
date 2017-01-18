console.log('Loading aaa-1');


let aaa2 = require('aaa-2');


module.exports = {
    aaa1: 'Original aaa-1',
    aaa2: aaa2
};


console.log(module.exports);
