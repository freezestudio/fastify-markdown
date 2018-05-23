const path = require('path')
const fastify = require('fastify')({ logger: { level: 'trace' } })

/**
 * using opts.src from file
 */
fastify
  .register(require('../'), { src: path.join(__dirname, '..', 'Readme.md') })
  .get('/', (req, reply) => {
    reply.markdown().then(md => { reply.send(md) })
  })
  .listen(3000, err => {
    if (err) throw err
    else console.log('server running on http://localhost:3000 ...')
  })

/**
 * using opts.data direct literal
 */
// fastify
//   .register(require('../'), { data: `# Title **BOLD**` })
//   .get('/', (req, reply) => {
//       const md = reply.markdown()
//       reply.send(md)
//   })
//   .listen(3000, err => {
//       if (err) throw err
//       else console.log('server running on http://localhost:3000 ...')
//   })

/**
 * using marked's options
 */
// const testOptions ={
//   gfm: false
// }

// fastify
//   .register(require('../'), { markedOptions: testOptions })
//   .get('/', (req, reply) => {
//       const opts = reply.markdown().defaults
//       reply.send(opts)
//   })
//   .listen(3000, err => {
//       if (err) throw err
//       else console.log('server running on http://localhost:3000 ...')
//   })
