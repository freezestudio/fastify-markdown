# fastify-markdown

[![Greenkeeper badge](https://badges.greenkeeper.io/fastify/fastify-plugin.svg)](https://greenkeeper.io/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/freezestudio/fastify-markdown.svg?branch=master)](https://travis-ci.org/freezestudio/fastify-markdown)

`fastify-markdown` is a plugin for [Fastify](https://github.com/fastify/fastify) parse markdown code or file.

## Install

npm install --save fastify-markdown

## Usage

```js
const path = require('path')
const fastify = require('fastify')({ logger: { level: 'trace' } })

/**
 * using opts.src read markdown from file
 */
fastify
  .register(require('fastify-markdown'), { src: path.join(__dirname, '..', 'Readme.md') })
  .get('/', (req, reply) => {
    return reply.markdown()
  })
  .listen(3000, err => {
    if (err) throw err
    else console.log('server running on http://localhost:3000 ...')
  })

/* -- or --*/

/**
 * async using opts.src from file
 */
fastify
  .register(require('../'), {
    src: path.join(__dirname, '..', 'Readme.md')
  })
  .get('/', async (req, reply) => {
    const md = await reply.markdown()
    return md
  })
  .listen(3000, err => {
    if (err) throw err
    else console.log('server running on http://localhost:3000 ...')
  })

/**
 * using opts.data parse markdown direct literal
 */
fastify
  .register(require('fastify-markdown'), { data: `# Title **BOLD**` })
  .get('/', (req, reply) => {
      const md = reply.markdown()
      reply.send(md)
  })
  .listen(3000, err => {
      if (err) throw err
      else console.log('server running on http://localhost:3000 ...')
  })

/**
 * using internal marked's options
 */
const testOptions = {
  gfm: false
}

fastify
  .register(require('fastify-markdown'), { markedOptions: testOptions })
  .get('/', (req, reply) => {
      const opts = reply.markdown().defaults
      reply.send(opts)
  })
  .listen(3000, err => {
      if (err) throw err
      else console.log('server running on http://localhost:3000 ...')
  })

/**
 * using marked as object see:https://marked.js.org/
 */
fastify
  .register(require('fastify-markdown'), /*non options or other*/)
  .get('/', (req, reply) => {
      const md = reply.markdown().parse('**bold title**')
      reply.send(md)
  })
  .listen(3000, err => {
      if (err) throw err
      else console.log('server running on http://localhost:3000 ...')
  })

```

## Options

**src** (string)

the .md file path

**data** (string)

a string that conforms to the markdown syntax

**markedOptions** (object)

marked options used

See [marked](https://github.com/markedjs/marked) and [fastify](https://github.com/fastify/fastify) for more options

## License

Licensed under [MIT](./LICENSE).
