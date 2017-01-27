# STEM host

## CLI
- list
- start
- build


## API
- list
- start
- build




## STEM definition
- must be a valid node module
- must have a package.json file (TODO: review - really needed?)
- if STEM's module name is 'xyz', then 'xyz/stem' must resolve to the STEM's main module (this is distinct from 'xyz's main module).

## STEM main module
- start
- beforeStart
- afterStart
- decorateExports (advanced)
- must NOT import module code when required (only inside the abovementioned functions)


## Inline STEMs / Building from stem_sources
- STEMs may be installed as normal node modules (i.e. using npm), -or- they may be defined inline within the app
- An inline STEM `<stemname>` is located at `<appdir>/stem-sources/<stemname>`
- its build script is in the app's package.json's `"scripts"` hash, with key `"build-<stemname>"`
- the build script is responsible for making the inline STEM's built output available at `<appdir>/node_modules/<stemname>`
