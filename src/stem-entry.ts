import StemInfo from './stem-info';
export default StemEntry;





// TODO: doc...
interface StemEntry {





    // TODO: ===== FOR STARTING =====

    // TODO: doc...
    ready?: Promise<boolean>;

    // TODO: doc...
    decorateExports?: (exports: any, importer: StemInfo) => any;

    // TODO: doc...
    beforeStartup?: () => void;

    // TODO: doc...
    afterStartup?: () => void;





    // TODO: ===== FOR BUILDING =====

    // TODO: doc... path is relative to this file (or STEM root dir?) (or absolute?)
    srcFilesGlob?: string;

    // TODO: doc... path is relative to this file (or STEM root dir?) (or absolute?)
    distFilesGlob?: string;


}
