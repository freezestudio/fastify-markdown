'use strict'

const path = require('path')
const fastify = require('fastify')({
  logger: {
    level: 'trace'
  }
})

/**
 * using opts.src = 'file'
 */
// fastify
//   .register(require('../'), {
//     src: true, markedOptions: { gfm: false }
//   })
//   .get('/', (req, reply) => {
//     return reply.markdown(path.join(__dirname, '..', 'Readme.md'))
//   })
//   .listen({ port: 3000 })
//   .then(() => console.log('server running on http://localhost:3000 ...'))

/**
 * using opts.src = true
 */
fastify
  .register(require('../'), {
    src: true, markedOptions: { gfm: false }
  })
  .get('/', (req, reply) => {
    return reply.markdown(path.join(__dirname, '..', 'Readme.md'))
  })

/**
 * using opts.data = true
 */
// fastify
//   .register(require('../'), {
//     data: true, markedOptions: { gfm: false }
//   })
//   .get('/', (req, reply) => {
//     const md = reply.markdown('**BOLD**')
//     reply.send(md)
//   })

/**
 * default marked data
 */
// fastify
//   .register(require('../'))
//   .get('/', (req, reply) => {
//     const md = reply.markdown('**BOLD**')
//     reply.send(md)
//   })

/**
 * using internal marked and options
 */
// fastify
//   .register(require('../'))
//   .get('/', (req, reply) => {
//     const md = reply.markdown().parse('**BOLD**', { breaks: true })
//     reply.send(md)
//   })

fastify.listen({ port: 3000 })
  .then(() => console.log('server running on http://localhost:3000 ...'))
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
