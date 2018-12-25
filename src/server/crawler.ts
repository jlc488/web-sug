import * as cheerio from 'cheerio'
import * as urlParse from 'url-parse'
import * as request from 'request'

export class Crawler {
  url: string

  constructor(url) {
    this.url = url
  }

  goFetch() {
    console.log(`Visiting Page ${this.url}`)

    request(this.url, (err, response, body) => {
      if (err) {
        console.log(`Error : ${err}`)
      }

      console.log(`Status Code : ${response.statusCode}`)

      if (response.statusCode === 200) {
        let $ = cheerio.load(body)
        console.log('Page title :' + $('title').text())
      }
    })
  }
}
