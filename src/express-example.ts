import fs from 'fs'
import { createServer } from 'http'
const fsPromises = fs.promises

import * as Metrics from '.'

const hostname = '127.0.0.1'
const port = 3000

// Create HTTP server
const server = createServer(async function (req, res) {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  //spin for some time
  let i = 0
  while (i < 10000) {
    i++
  }

  await fsPromises.writeFile('/tmp/express-test', 'test file content')

  // Send the response body "Hello World"
  res.end('hello world')
})

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`)
})

Metrics.logNodeMetrics('example', 1000, 1000)
