# web.ts

[![web.ts](https://github.com/oscario2/web.ts/actions/workflows/main.yaml/badge.svg)](https://github.com/oscario2/web.ts/actions/workflows/main.yaml)

Decorators to route `GET`or `POST` requests to desired controller. You can extend `IWebGetContext` or `IWebPostContext` in `src/web-types.ts` with properties you'd like to attach in middlewares e.g JWT tokens

```ts
@Post(WebTestRoutes.postWithBody, {
    middlewares: [WebMiddleware.parseBody]
})
public postWithBody(ctx: IWebPostContext) {
    const { request: req, response: res } = ctx;
    const { id } = <{ id: string }>req.bodyParsed;
    res.status = id ? 200 : 500;
    res.body = JSON.stringify({ id });
}
```

See `tests/web.test.ts` for more examples
