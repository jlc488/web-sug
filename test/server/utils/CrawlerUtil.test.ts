import { CrawlerUtil } from '../../../src/server/utils/CrawlerUtil'

describe('Crawler Util Test', () => {
  it('SubURL Test', () => {
    let baseURL = 'naver.com'
    let util = new CrawlerUtil()

    util.startCrawling(baseURL)
  })
})
