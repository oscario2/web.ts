// deno-lint-ignore-file ban-types no-explicit-any
import { router } from './web-globals.ts';
import { IWebRoute } from './web-types.ts';

interface IRouteOptions {
    middlewares?: Function[];
}

export const Get = (route: IWebRoute, opt?: IRouteOptions) => {
    return function (
        target: Object,
        propertyKey: string | symbol,
        _descriptor?: PropertyDescriptor
    ): void {
        console.log(`[${target.constructor.name}]: ${route}`);

        // router.Get("/users", Users.getUsers.bind(Users)) // scoped
        const controller =
            target[propertyKey as keyof typeof target].bind(target);

        if (opt?.middlewares?.length) {
            (router as any)['get'](route, ...opt.middlewares, controller);
            return;
        }
        (router as any)['get'](route, controller);
    };
};

export const Post = (route: IWebRoute, opt?: IRouteOptions) => {
    return function (
        target: Object,
        propertyKey: string | symbol,
        _descriptor?: PropertyDescriptor
    ): void {
        console.log(`[${target.constructor.name}]: ${route}`);

        // router.Post("/users", Users.getUsers.bind(Users)) // scoped
        const controller =
            target[propertyKey as keyof typeof target].bind(target);

        if (opt?.middlewares?.length) {
            (router as any)['post'](route, ...opt.middlewares, controller);
            return;
        }
        (router as any)['post'](route, controller);
    };
};
