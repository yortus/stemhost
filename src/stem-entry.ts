import StemInfo from './stem-info';
export default StemEntry;





// TODO: doc...
interface StemEntry {





    // TODO: ===== FOR STARTING =====

    // TODO: doc...
    start?: (importers: StemInfo[]) => void | Promise<void>;

    // TODO: doc...
    beforeStart?: (importers: StemInfo[]) => void | Promise<void>;

    // TODO: doc...
    afterStart?: (importers: StemInfo[]) => void | Promise<void>;

    // TODO: doc...
    decorateExports?: (exports: any, importer: {name: string}) => any;





    // TODO: ===== FOR BUILDING =====

    // TODO: doc... path is relative to this file (or STEM root dir?) (or absolute?)
    srcFilesGlob?: string;

    // TODO: doc... path is relative to this file (or STEM root dir?) (or absolute?)
    distFilesGlob?: string;


}
