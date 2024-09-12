import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugService } from "../services/BugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAllBugs)
  }
  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async createBug(request, response, next) {
    try {
      const bugData = await request.body
      const user = request.userInfo
      bugData.creatorId = user.id
      const bug = await bugService.createBug(bugData)
      response.send(bug)

    } catch (error) {
      next(error)
    }
  }
}