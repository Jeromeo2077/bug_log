import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async getBugById(bugId, userInfo) {
    const bug = await dbContext.Bugs.findById(bugId)

    if (bug == null) {
      throw new BadRequest(`${bugId} not found in the database`)
    }

    if (bug.creatorId != userInfo) {
      throw new Forbidden(`You are not authorized for access to ${bugId}`)
    }

    return bug
  }

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }

  async createBug(bugData) {
    const bug = (await dbContext.Bugs.create(bugData)).populate('creator')
    return bug
  }
}

export const bugService = new BugsService