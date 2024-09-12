import { dbContext } from "../db/DbContext.js"

class BugsService {

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    return bug
  }

}

export const bugService = new BugsService