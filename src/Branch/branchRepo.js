const { PrismaClient } = require("@prisma/client");
const { throwError } = require("../utils/error.utils");
const prismaBranch = new PrismaClient().branch

const getAll = async () => {
    try {
        return await prismaBranch.findMany()
    } catch (err) {
        throwError(err)
    }
}

const create = async (data) => {
    try {
        return await prismaBranch.create({ data })
    } catch (err) {
        throwError(err)
    }
}

const del = async (id) => {
    try {
        return await prismaBranch.delete({ where: { id } })
    } catch (err) {
        throwError(err)
    }
}

const isExist = async (branchName) => {
    try {
        const exist = await prismaBranch.findFirst({ where: { branchName } })
        return exist
    } catch (err) {
        throwError(err)
    }
}

module.exports = { getAll, create, del, isExist }