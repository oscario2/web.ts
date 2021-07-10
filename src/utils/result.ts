import { ErrorCore } from './error-core.ts';

export class Result<T> {
    constructor(public value: T, public status: ErrorCore | { code: number }) {}
}

export const ResultError = <T>(status: ErrorCore, result?: T): Result<T> => {
    return new Result(result || ({} as T), status);
};

export const ResultSuccess = <T>(result: T) => {
    return new Result(result, { code: 0 });
};
