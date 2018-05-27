import fastify from 'fastify';
import http from 'http';
import marked from 'marked';

declare function plugin<HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
    >(instance: fastify.FastifyInstance, opts: fastify.MarkdownOptions, callback: (err: Error) => void): void;

declare module 'fastify' {
    export interface MarkdownOptions {
        src?: true | string;
        data?: true | string;
        markedOptions?: marked.MarkedOptions;
    }

    interface FastifyReply<HttpResponse> {
        code: (statusCode: number) => FastifyReply<HttpResponse>;
        header: (name: string, value: any) => FastifyReply<HttpResponse>;
        headers: (headers: { [key: string]: any }) => FastifyReply<HttpResponse>;
        type: (contentType: string) => FastifyReply<HttpResponse>;
        redirect: (statusCode: number, url: string) => FastifyReply<HttpResponse>;
        serialize: (payload: any) => string;
        serializer: (fn: Function) => FastifyReply<HttpResponse>;
        send: (payload?: any) => FastifyReply<HttpResponse>;
        sent: boolean;
        res: HttpResponse;
        context: FastifyContext;

        /**
         * Plug-ins define features attached to reply
         */
        markdown(md: string): string;
        markdown(): typeof marked;
    }
}

export = plugin;
