import { Request, Response, NextFunction } from 'express'
import { CrawlerService } from '../services/CrawlerService'
import Resp from '../utils/Resp'

export class CrawlerController {
  crawlerService: CrawlerService = new CrawlerService()

  public async findSubURLs(req: Request, res: Response) {
    try {
      const mainURL = req.body.mainURL

      const ret = await this.crawlerService.findSubURLs(mainURL)

      if (ret) {
        Resp.sendCreated(res, ret)
      }

      Resp.sendNotfound(res)
    } catch (e) {
      Resp.sendError(res, e)
    }
  }
}
