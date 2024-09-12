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
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.updateBug)
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const bug = await bugService.getBugById(bugId, userInfo.id)
      response.send(bug)
    } catch (error) {
      next(error)
    }
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

  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      const bugData = request.body
      const updateBug = await bugService.updateBug(bugId, userInfo.id, bugData)
      response.send(updateBug)
    } catch (error) {
      next(error)
    }
  }
}