const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts")
          .where("id", id)
}

const getByAccountName = accountName => {
  return db("accounts")
          .where("name", accountName)
}

const create = account => {
  
  return db("accounts")
  .insert(account)

}

const updateById = (id, account) => {
  
  return db("accounts")
          .update(account)
          .where("id", id)

}

const deleteById = id => {
  
  return db("accounts")
          .where("id", id)
          .del()
}

module.exports = {
  getAll,
  getById,
  getByAccountName,
  create,
  updateById,
  deleteById,
}
