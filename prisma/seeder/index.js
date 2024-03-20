// const { branchSeed } = require("./branch.seeder")
const { divisiSeed } = require("./division.seeder")
const { userSeed } = require("./m_user.seeder")

const runSeeder = async () => {
    // await branchSeed()
    await divisiSeed()
    await userSeed()
}

runSeeder()