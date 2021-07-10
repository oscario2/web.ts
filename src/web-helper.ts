import { Context } from '../deps.ts';
import { ErrorCore } from './utils/error-core.ts';
import { Result } from './utils/result.ts';

export class WebHelper {
    /**
     *
     * @param ctx
     * @param result
     * @param code
     */
    public invalidRequest = <T>(
        ctx: Context,
        result: Result<T>,
        code?: number
    ): void => {
        const { value, status } = result;
        ctx.response.status = code || 500;
        ctx.response.body = {
            value,
            status: {
                code: status.code,
                message: status instanceof ErrorCore ? status.message : ''
            }
        };
    };

    /**
     *
     * @param params
     */
    public getQuery(url: URL) {
        const query = {} as Record<string, unknown>;
        for (const [k, v] of url.searchParams) if (k && v) query[k] = v;
        return query;
    }
}
export const webHelper = new WebHelper();
