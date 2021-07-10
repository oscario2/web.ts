import { ResultError } from './utils/result.ts';
import { ErrorWeb } from './web-errors.ts';
import { webHelper } from './web-helper.ts';
import { IWebPostContext } from './web-types.ts';

export class WebMiddleware {
    /**
     * validate and consume POST body
     * @param ctx
     * @param next
     */
    public static async parseBody(
        ctx: IWebPostContext,
        next: () => Promise<void>
    ): Promise<void> {
        const { method } = ctx.request;

        if (method == 'POST') {
            const { request: req } = ctx;

            if (!req.hasBody) {
                throw new Error('No body');
            }

            const { type, value } = await req.body();
            if (type != 'json') {
                const error = ResultError(new ErrorWeb.InvalidPostBody());
                throw webHelper.invalidRequest(ctx, error);
            }

            const json = await value;
            if (json == null || typeof json == 'string') {
                const error = ResultError(
                    new ErrorWeb.InvalidType('json', typeof json)
                );
                throw webHelper.invalidRequest(ctx, error);
            }

            // attach to context
            req.bodyParsed = json;
        }

        await next();
    }
}
