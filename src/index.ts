import app from './app'
import * as fs from 'fs'
// import * as spdy from 'spdy'

// const options = {
//   key: fs.readFileSync(__dirname + '/certs/server.key'),
//   cert: fs.readFileSync(__dirname + '/certs/server.crt'),
// }

const PORT = 3000

// const server = spdy.createServer(options, app)

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`)
})
