import Env from '@/configs/Env';
import Hashids from 'hashids';

const hashingKey = Env.hashingKey;

export function decodeHashedString(hashedStr: string): string {
    const hashids = new Hashids(hashingKey);
    const numbers = hashids.decode(hashedStr) as number[];

    if (!numbers.length) {
        throw new Error("Invalid hash or decoding failed.");
    }

    return String.fromCharCode(...numbers).trim();
}
