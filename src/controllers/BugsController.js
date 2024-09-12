import auth0provider from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(auth0provider.getAuthorizedUserinfo)
  }
}