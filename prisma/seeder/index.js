const { userSeed } = require("./m_user.seeder")

const runSeeder = async () => {
    await userSeed()
}

runSeeder()