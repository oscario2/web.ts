import { Get, Post } from '../src/web-decorators.ts';
import { webHelper } from '../src/web-helper.ts';
import { WebMiddleware } from '../src/web-middleware.ts';
import {
    IWebGetContext,
    IWebPostContext,
    IWebRoute
} from '../src/web-types.ts';

export class WebTestRoutes implements IWebRoute {
    public static get = '/get';
    public static getWithParam(id?: string) {
        return id ? `/param/${id}` : '/param/:id';
    }
    public static getWithQuery(id?: string) {
        return id ? `/query?id=${id}` : '/query';
    }
    public static post = '/test/noauth';
    public static postWithBody = '/test/auth';
}

// TODO: dependency injection @oscario2
export class WebTestHelper {
    constructor() {}

    @Get(WebTestRoutes.get)
    public getNormal(ctx: IWebGetContext) {
        const { response: res } = ctx;
        res.status = 200;
    }

    @Get(WebTestRoutes.getWithParam())
    public getWithParam(ctx: IWebGetContext<{ id: string }>) {
        const { response: res, params } = ctx;
        res.status = params?.id ? 200 : 500;
        res.body = JSON.stringify({ id: params?.id });
    }

    @Get(WebTestRoutes.getWithQuery())
    public getWithQuery(ctx: IWebGetContext) {
        const { request: req, response: res } = ctx;
        const { id } = webHelper.getQuery(req.url) as { id: string };
        res.status = id ? 200 : 500;
        res.body = JSON.stringify({ id });
    }

    @Post(WebTestRoutes.post)
    public post(ctx: IWebPostContext) {
        const { response: res } = ctx;
        res.status = 200;
    }

    @Post(WebTestRoutes.postWithBody, {
        middlewares: [WebMiddleware.parseBody]
    })
    public postWithBody(ctx: IWebPostContext) {
        const { request: req, response: res } = ctx;
        const { id } = <{ id: string }>req.bodyParsed;
        res.status = id ? 200 : 500;
        res.body = JSON.stringify({ id });
    }
}
