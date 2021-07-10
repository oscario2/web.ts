import { X2 } from 'https://raw.githubusercontent.com/oscario2/x2/v0.0.1/index.ts';
import { WebService } from '../src/web-service.ts';
import { WebTestHelper, WebTestRoutes as route } from './web-test-helper.ts';

// to debug, set "debug.javascript.usePreview" to false
const { describe, it, expect } = new X2();

// intialize routes
const _ = new WebTestHelper();

const send = async (url: string, req: RequestInit) => {
    req.headers = Object.assign(req.headers || {}, {
        'Content-Type': 'application/json'
    });
    return await fetch(url, req);
};

await describe('Web', () => {
    it('should start server', () => {
        const [host, port] = ['127.0.0.1', 3500];

        new WebService().startServer(host, port, () => {
            const url = 'http://' + host + ':' + port;

            it('should GET', async () => {
                const get = await send(url + route.get, {
                    method: 'get'
                });
                expect(get.status).toBe(200);
            });

            it('should GET with param', async () => {
                const get = await send(url + route.getWithParam('1'), {
                    method: 'get'
                });
                expect(get.status).toBe(200);
                const json = (await get.json()) as { id: string };
                expect(json.id).toBe('1');
            });

            it('should GET with query', async () => {
                const get = await send(url + route.getWithQuery('1'), {
                    method: 'get'
                });
                expect(get.status).toBe(200);
                const json = (await get.json()) as { id: string };
                expect(json.id).toBe('1');
            });

            it('should GET 404', async () => {
                const get = await send(url + '/invalid', {
                    method: 'get'
                });
                expect(get.status).toBe(404);
            });

            it('should POST body', async () => {
                const post = await send(url + route.postWithBody, {
                    method: 'post',
                    body: JSON.stringify({ id: 1 })
                });
                expect(post.status).toBe(200);
                const json = (await post.json()) as { id: string };
                expect(json.id).toBe(1);
            });

            it('should POST on GET', async () => {
                const post = await send(url + route.get, {
                    method: 'post',
                    body: ''
                });
                expect(post.status).toBe(405);
            });

            it('should exit', () => {
                Deno.exit(0);
            });
        });
    });
}).run();
