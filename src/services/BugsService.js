import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async getBugById(bugId, userId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')

    if (bug == null) {
      throw new BadRequest(`${bugId} not found in the database`)
    }

    if (bug.creatorId != userId) {
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

  async updateBug(bugId, userId, bugData) {
    const bugToUpdate = await this.getBugById(bugId, userId)

    bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    bugToUpdate.title = bugData.title ?? bugToUpdate.title

    await bugToUpdate.save()

    return bugToUpdate
  }

  async deleteBug(bugId, userId) {
    const bugToDelete = await this.getBugById(bugId, userId)

    await bugToDelete.deleteOne()

    return `${bugToDelete.title} has been deleted!`
  }
}

export const bugService = new BugsService