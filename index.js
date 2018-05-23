'use strict'

const fs = require('fs')
const util = require('util')
const marked = require('marked')

const fp = require('fastify-plugin')

function fastifymarkdown (fastify, opts, done) {
  if (typeof opts === 'function') {
    done = opts
    opts = undefined
  }

  fastify.decorateReply('markdown', function () {
    if (opts === undefined) return marked

    if (opts.data) {
      return marked(opts.data)
    } else if (opts.src) {
      const read = util.promisify(fs.readFile)
      return read(opts.src, 'utf8')
    } else {
      if (opts.markedOptions) {
        return marked.setOptions(opts.markedOptions)
      } else {
        return marked
      }
    }
  })

  done()
}

module.exports = fp(fastifymarkdown, {
  fastify: '>=1.4.0',
  name: 'fastify-markdown'
})
