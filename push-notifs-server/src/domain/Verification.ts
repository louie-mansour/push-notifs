import * as crypto from 'crypto';

export class Verification {
    public static generateCode() : string {
        return crypto.randomInt(0, 10000000).toString();
    }
}