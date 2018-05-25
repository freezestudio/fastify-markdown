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
  .register(require('fastify-markdown'), { src: true })
  .get('/', (req, reply) => {
    return reply.markdown(path.join(__dirname, '..', 'Readme.md'))
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
    src: true, markedOptions: { gfm: false }
  })
  .get('/', async (req, reply) => {
    const md = await reply.markdown(path.join(__dirname, '..', 'Readme.md'))
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
  .register(require('fastify-markdown'), { data: true })
  .get('/', (req, reply) => {
      const md = reply.markdown(`**BOLD**`)
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
      const md = reply.markdown('**BOLD**')
      reply.send(md)
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

## Options (Optional)

* **src** (boolean | string)
  * `true`: Means to resolve the markdown file.
  * `string`(deprecated): the .md file path.If the `data` option is set, this option will be ignored.
* **data** (boolean | string)
  * `true`: Means to resolve the markdown data.
  * `string`(deprecated): or a string that conforms to the markdown syntax.
* **markedOptions** (object)
  * marked options used

See [marked](https://github.com/markedjs/marked) and [fastify](https://github.com/fastify/fastify) for more options

All options are optional. in this case as if using `opts.data`.

> **Note**
> Can be set to any option other than those listed above, in which case the internal markdown parser will be returned.

## License

Licensed under [MIT](./LICENSE).
