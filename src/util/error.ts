




export default function error(message: string): never {
    console.log(`ERROR: ${message}`);
    throw new Error(message);
}
