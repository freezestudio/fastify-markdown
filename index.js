'use strict'

const fs = require('fs')
const util = require('util')
const marked = require('marked')

const fp = require('fastify-plugin')

function fastifyMarkdown (fastify, opts, done) {
  if (typeof opts === 'function') {
    done = opts
    opts = undefined
  }

  const markedOptions = opts.markedOptions || {}

  function none (obj) {
    if (obj === undefined) return true
    if (obj && Object.getOwnPropertyNames(obj).length === 0) return true
    return false
  }

  function have (obj) {
    return !!obj
  }

  function asyncFileMarked (src, option) {
    const read = util.promisify(fs.readFile)
    return read(src, 'utf8').then(data => { return marked(data, option) }, err => { return err })
  }

  fastify.decorateReply('markdown', function (md) {
    if (none(opts) && none(md)) return marked
    if (none(opts) && have(md)) opts = {data: md}

    if (opts.data) {
      if (none(md) && typeof opts.data === 'string') md = opts.data
      return marked(md, markedOptions)
    } else if (opts.src) {
      if (none(md) && typeof opts.src === 'string') md = opts.src
      return asyncFileMarked(md, markedOptions)
    } else if (opts.markedOptions) {
      return marked.setOptions(markedOptions)
    } else {
      return marked
    }
  })

  done()
}

module.exports = fp(fastifyMarkdown, {
  fastify: '>=1.4.0',
  name: 'fastify-markdown'
})
