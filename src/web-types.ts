// deno-lint-ignore-file no-empty-interface
import { Context, Request } from '../deps.ts';

// interfaces
export interface IWebRoute {}
export interface IWebController {}
export interface IWebMiddleware {}

export interface IWebGetContext<T = void> extends Context {
    params?: T;
}

export interface IWebPostContext extends Omit<Context, 'request'> {
    request: Request & { bodyParsed: unknown };
}
