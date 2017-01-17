import StemInfo, {StemInfoWithDeps} from './stem-info';





// TODO: ...
export default function analyseDependencies(stems: StemInfo[]) {

    // NB: STEM dependencies must be in 'dependencies' (i.e. not peer, dev, or optional).
    let result = stems.map(stem => {
        let directDependencies = Object.keys(stem.package.dependencies || {});
        let requires = directDependencies.filter(dep => stems.some(stem => stem.name === dep));
        return Object.assign({requires}, stem) as StemInfoWithDeps;
    });

    // TODO: ...
    result.forEach(stem => {
        let directDependers = result.filter(st => st.requires.indexOf(stem.name) !== -1);
        stem.requiredBy = directDependers.map(dep => dep.name);
    });

    // TODO: ...
    return result;
}
