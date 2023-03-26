export class DatabaseError extends Error {
    private nestedError: Error;
    constructor(err: Error) {
        super(err.message);
        this.nestedError = err;
    }
}
