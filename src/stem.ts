export default Stem;





/** TODO: doc */
interface Stem {

    /** The name of the STEM. */
    name: string;

    /** The version of the STEM. */
    version: string;

    /** The absolute path of the STEM's containing directory. */
    path: string;

    // TODO: keep? remove?
    // /** The relative path from the STEM's containing directory to its main script. */
    // main: string;

    /** The contents of the STEM's package.json file parsed into a plain object. */
    package: {
        dependencies: { [name: string]: string; };
    }

    /** The names of all STEMs on which this STEM has declared direct dependencies. */
    dependencies: string[];
}
