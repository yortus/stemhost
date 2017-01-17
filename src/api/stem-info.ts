export default StemInfo;





/** TODO: doc */
interface StemInfo {

    /** The name of the STEM. */
    name: string;

    /** The version of the STEM. */
    version: string;

    /**
     * The absolute path of the STEM's containing directory under 'node_modules'.
     * NB: The path may not point to an existing directory, e.g. if STEM source is present and not yet built.
     */
    modulePath: string;

    /** The absolute path of the STEM's source, if found. */
    sourcePath: string | null;

    /** The contents of the STEM's package.json file parsed into a plain object. */
    package: {
        dependencies: { [name: string]: string; };
    }
}





// TODO: doc...
export interface StemInfoWithDeps extends StemInfo {

    /** The names of all STEMs on which this STEM has declared direct dependencies. */
    requires: string[];

    /** The names of all STEMs which have declared direct dependencies on this STEM. */
    requiredBy: string[];
}
