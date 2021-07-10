export abstract class ErrorCore extends Error {
    constructor(public readonly code: number, public readonly text: string) {
        super(text);
    }
}
