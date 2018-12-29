import * as cheerio from 'cheerio'
import * as urlParse from 'url-parse'
import * as request from 'request'
import * as _ from 'lodash'
import * as async from 'async'

interface LinkObject {
  linkText: string
  linkURL: string
}

interface PageObject {
  title: string
  url: string
  links: Array<LinkObject>
}
export class CrawlerUtil {
  private baseURL: string
  private fullURL: string
  private crawled: Array<string>
  private inboundLinks: Array<string>
  private pageObj: PageObject

  constructor(baseURL?: string) {
    this.baseURL = baseURL
    this.fullURL = `http://${baseURL}`
  }

  private goFetch(callback) {
    console.log(`Visiting Page ${this.baseURL}`)

    let sTime = new Date().getTime()

    request(this.fullURL, (err, response, body) => {
      let eTime = new Date().getTime()
      let requestTime = eTime - sTime
      let $ = cheerio.load(body)
      this.pageObj.title = $('title').text()
      this.pageObj.url = this.fullURL

      $('a').each((i, elem) => {
        this.pageObj.links.push({
          linkText: $(elem).text(),
          linkURL: elem.attribs.href,
        })

        callback(err, this.pageObj)
      })
    })
  }

  public startCrawling(baseURL): void {
    this.baseURL = baseURL
    this.fullURL = `http://${baseURL}`

    this.goFetch(err => {
      console.log(this.pageObj)
      this.crawled.push(this.pageObj.url)

      async.eachSeries(
        this.pageObj.links,
        (item, cb) => {
          let parsedURL = urlParse.parse(item.linkURL)

          if (parsedURL.hostname === this.baseURL) {
            this.inboundLinks.push(item.linkURL)
          }
          cb()
        },
        () => {
          let nextLink = _.difference(_.uniq(this.inboundLinks), this.crawled)

          if (nextLink.length > 0) {
            this.startCrawling(nextLink[0])
          } else {
            console.log('done')
          }
        }
      )
    })
  }
}
