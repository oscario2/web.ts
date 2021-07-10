// deno-lint-ignore-file no-namespace
import { ErrorCore } from './utils/error-core.ts';

export enum EWebStatus {
    Success,
    InvalidPostBody,
    InvalidType
}

export namespace ErrorWeb {
    export class InvalidPostBody extends ErrorCore {
        constructor() {
            super(EWebStatus.InvalidPostBody, 'Invalid or empty POST body');
        }
    }

    export class InvalidType extends ErrorCore {
        constructor(expected: string, got: string) {
            super(
                EWebStatus.InvalidType,
                `Invalid type, expected: ${expected}, got ${got}`
            );
        }
    }
}
