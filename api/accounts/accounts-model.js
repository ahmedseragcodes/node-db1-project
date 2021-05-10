const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts")
          .where("id", id)
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
  create,
  updateById,
  deleteById,
}
