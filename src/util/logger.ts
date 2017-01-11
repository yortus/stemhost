




export function info(message: string) {
    console.log(`INFO: ${message}`);
}





export function error(message: string): never {
    console.log(`ERROR: ${message}`);
    throw new Error(message);
}
