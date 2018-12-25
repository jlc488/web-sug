import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.app.use(helmet())
    this.config()
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }
}

export default new App().app
