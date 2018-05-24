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

  const markedOptions = opts.markedOptions || {}

  function asyncFileMarked (src, option) {
    const read = util.promisify(fs.readFile)
    return read(src, 'utf8').then(data => { return marked(data, option) }, err => { return err })
  }

  fastify.decorateReply('markdown', function (md) {
    if (opts === undefined && md === undefined) return marked
    if (opts === undefined && md) opts = {data: md}
    if (opts && Object.getOwnPropertyNames(opts).length === 0 && md === undefined) return marked
    if (opts && Object.getOwnPropertyNames(opts).length === 0 && md) opts.data = md

    if (opts.data) {
      if (md === undefined && typeof opts.data === 'string') md = opts.data
      return marked(md, markedOptions)
    } else if (opts.src) {
      if (md === undefined && typeof opts.src === 'string') md = opts.src
      return asyncFileMarked(md, markedOptions)
    } else if (opts.markedOptions) {
      return marked.setOptions(markedOptions)
    } else {
      return marked
    }
  })

  done()
}

module.exports = fp(fastifymarkdown, {
  fastify: '>=1.4.0',
  name: 'fastify-markdown'
})
