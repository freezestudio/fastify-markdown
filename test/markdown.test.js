'use strict'

const path = require('path')
const test = require('tap').test
const Fastify = require('fastify')
const plugin = require('../')

test('Should markdowon with "opts.data" is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {
    data: `**BOLD**`
  })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown()
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<p><strong>BOLD</strong></p>`)
  })
})

test('Should markdowon with "opts.data" and "opts.markedOptions" is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {
    data: true, markedOptions: {gfm: false}
  })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown(`**BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload, `<p><strong>BOLD</strong></p>\n`)
  })
})

test('Should markdown with "opts.src" is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {
    src: true
  })
  fastify.get('/', (req, reply) => {
    return reply.markdown(path.join(__dirname, '..', 'Readme.md'))
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.ok(res.payload)
  })
})

test('Should markdown with "opts.src" is incorrect', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {
    src: 'empty'
  })
  fastify.get('/', (req, reply) => {
    reply.markdown().then(md => {
      reply.send(md)
    }).catch(err => {
      reply.send(err)
    })
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(JSON.parse(res.payload).statusCode, 500)
  })
})

test('Should markdown with "opts.markedOptions" is', t => {
  t.plan(2)
  const testOptions = {
    gfm: false
  }
  const fastify = Fastify()
  fastify.register(plugin, {
    markedOptions: testOptions
  })
  fastify.get('/', (req, reply) => {
    const gfm = reply.markdown().defaults.gfm
    reply.send(gfm)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.equal(res.payload, 'false')
  })
})

test('Should markdown without "opts" is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin /*, opts */)
  fastify.get('/', (req, reply) => {
    const md = reply.markdown().parse(`**BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<p><strong>BOLD</strong></p>`)
  })
})

test('Should markdown without "opts" and "markdown" method with "md" param is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin /*, opts */)
  fastify.get('/', (req, reply) => {
    const md = reply.markdown(`**BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<p><strong>BOLD</strong></p>`)
  })
})

test('Should markdown with "opts.data" and "markdown" method with "md" param the result is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {data: '**DATA**'})
  fastify.get('/', (req, reply) => {
    const md = reply.markdown(`**BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<p><strong>BOLD</strong></p>`)
  })
})

test('Should markdown with "opts.data" and "opts.src" is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, {src: path.join(__dirname, '..', 'Readme.md'), data: true})
  fastify.get('/', (req, reply) => {
    const md = reply.markdown(`**BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<p><strong>BOLD</strong></p>`)
  })
})
