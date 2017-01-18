console.log('Eval aaa-2 STEM main...');


module.exports = {

    decorateExports: (exports, importer) => {
        return `---${exports}---DECORATED FOR ${importer.name}`;
    }

};
