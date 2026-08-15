'use strict'

const fs = require('fs')
const util = require('util')
const { marked } = require('marked')

const fp = require('fastify-plugin')

function none (obj) {
  if (obj === undefined) return true
  if (obj && Object.getOwnPropertyNames(obj).length === 0) return true
  return false
}

function have (obj) {
  return !!obj
}

function isString (str) {
  return typeof str === 'string'
}

function asyncFileMarked (src, option) {
  const read = util.promisify(fs.readFile)
  return read(src, 'utf8').then(data => marked.parse(data, option), err => err)
}

async function fastifyMarkdown (fastify, opts) {
  const markedOptions = opts.markedOptions || {}

  fastify.decorateReply('markdown', function (md) {
    if (none(opts) && none(md)) return marked
    if (none(opts) && have(md)) opts = { data: md }

    if (opts.data) {
      if (none(md) && isString(opts.data)) md = opts.data
      return marked.parse(md, markedOptions)
    } else if (opts.src) {
      if (none(md) && isString(opts.src)) md = opts.src
      return asyncFileMarked(md, markedOptions)
    } else if (opts.markedOptions) {
      return marked.setOptions(markedOptions)
    } else {
      return marked
    }
  })
}

module.exports = fp(fastifyMarkdown, {
  fastify: '5.x',
  name: 'fastify-markdown'
})
