import { FastifyPluginAsync } from 'fastify'
import { MarkedOptions, marked } from 'marked'

declare module 'fastify' {
  interface FastifyReply {
    /**
     * Plug-ins define features attached to reply
     */
    markdown(md: string): string | Promise<string>
    markdown(): typeof marked
  }
}

export interface FastifyMarkdownOptions {
  src?: true | string
  data?: true | string
  markedOptions?: MarkedOptions
}

declare const fastifyMarkdown: FastifyPluginAsync<FastifyMarkdownOptions>

export = fastifyMarkdown
