'use strict'

const path = require('path')
const test = require('tap').test
const Fastify = require('fastify')
const plugin = require('../')

test('Should markdwon with opts.data is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, { data: `# Title **BOLD**` })
  fastify.get('/test1', (req, reply) => {
    const md = reply.markdown()
    reply.send(md)
  })
  fastify.inject({
    url: '/test1',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<h1 id="title-bold">Title <strong>BOLD</strong></h1>`)
  })
})

test('Should markdown with opts.src is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin, { src: path.join(__dirname, '..', 'Readme.md') })
  fastify.get('/test2', (req, reply) => {
    reply.markdown().then(md => {
      reply.send(md)
    })
  })
  fastify.inject({
    url: '/test2',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.ok(res.payload)
  })
})

test('Should markdown with opts.markedOptions is', t => {
  t.plan(2)
  const testOptions = {
    gfm: false
  }
  const fastify = Fastify()
  fastify.register(plugin, { markedOptions: testOptions })
  fastify.get('/test3', (req, reply) => {
    const gfm = reply.markdown().defaults.gfm
    reply.send(gfm)
  })
  fastify.inject({
    url: '/test3',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.equal(res.payload, 'false')
  })
})

test('Should markdown without opts is', t => {
  t.plan(2)
  const fastify = Fastify()
  fastify.register(plugin /*, opts */)
  fastify.get('/test4', (req, reply) => {
    const md = reply.markdown().parse(`# Title **BOLD**`)
    reply.send(md)
  })
  fastify.inject({
    url: '/test4',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.payload.trim(), `<h1 id="title-bold">Title <strong>BOLD</strong></h1>`)
  })
})
