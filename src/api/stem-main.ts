import StemInfo from './stem-info';
export default StemMain;





// TODO: doc...
interface StemMain {





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


}
