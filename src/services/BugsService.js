import { dbContext } from "../db/DbContext.js"

class BugsService {

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