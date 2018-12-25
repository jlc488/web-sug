import app from './app'
import * as fs from 'fs'
import { Crawler } from './server/crawler'
// import * as spdy from 'spdy'

// const options = {
//   key: fs.readFileSync(__dirname + '/certs/server.key'),
//   cert: fs.readFileSync(__dirname + '/certs/server.crt'),
// }
const PORT = 3000
// const server = spdy.createServer(options, app)

const server = app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`)
  new Crawler('http://google.com').goFetch()
})

declare const module: any

if (module.hot) {
  module.hot.accept()

  module.hot.dispose(() => server.close())
}
