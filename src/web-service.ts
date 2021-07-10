import { Application, Context, ListenOptions } from '../deps.ts';
import { router } from './web-globals.ts';

export class WebService {
    /**
     *
     * @param hostname
     * @param port
     * @param next
     */
    public startServer(hostname: string, port: number, next: () => void) {
        const app = new Application();

        //
        app.use(async (_ctx: Context, next: () => void) => {
            try {
                await next();
            } catch (e) {
                console.log(e);
            }
        });

        //
        router.get('/', (ctx: Context) => {
            ctx.response.status = 200;
            ctx.response.body = 'Welcome';
        });

        app.use(router.routes());
        app.use(router.allowedMethods());

        app.listen({ hostname, port } as ListenOptions);
        console.log('Running on', port);

        next();
    }
}
