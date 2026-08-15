'use strict'

const path = require('path')
const { test } = require('tap')
const Fastify = require('fastify')
const plugin = require('../')

test('Should markdown with "opts.data" is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, {
    data: '**BOLD**'
  })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown()
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})

test('Should markdown with "opts.data" and "opts.markedOptions" is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, {
    data: true, markedOptions: { gfm: false }
  })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload, '<p><strong>BOLD</strong></p>\n')
})

test('Should markdown with "opts.src" is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, {
    src: true
  })
  fastify.get('/', (req, reply) => {
    return reply.markdown(path.join(__dirname, '..', 'Readme.md'))
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.ok(res.payload)
})

test('Should markdown with "opts.src" is incorrect', async t => {
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
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(JSON.parse(res.payload).statusCode, 500)
})

test('Should markdown with "opts.markedOptions" is', async t => {
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
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload, 'false')
})

test('Should markdown without "opts" is', async t => {
  const fastify = Fastify()
  fastify.register(plugin /*, opts */)
  fastify.get('/', (req, reply) => {
    const md = reply.markdown().parse('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})

test('Should markdown without "opts" and "markdown" method with "md" param is', async t => {
  const fastify = Fastify()
  fastify.register(plugin /*, opts */)
  fastify.get('/', (req, reply) => {
    const md = reply.markdown('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})

test('Should markdown with "opts.data" and "markdown" method with "md" param the result is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, { data: '**DATA**' })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})

test('Should markdown with "opts.data" and "opts.src" is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, { src: path.join(__dirname, '..', 'Readme.md'), data: true })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})

test('Should markdown with "opts" but isnot [data,src,markedOptions] is', async t => {
  const fastify = Fastify()
  fastify.register(plugin, { anything: 'anything' })
  fastify.get('/', (req, reply) => {
    const md = reply.markdown().parse('**BOLD**')
    reply.send(md)
  })
  const res = await fastify.inject({
    url: '/',
    method: 'GET'
  })
  t.error(res.error)
  t.equal(res.payload.trim(), '<p><strong>BOLD</strong></p>')
})
