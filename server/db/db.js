const knex = require('knex')
const config = require('./knexfile').development

const connection = knex(config)

function getByTableName(tableName, db = connection) {
  return db(tableName)
    .select()
}

function getByIdAndTableName(tableName, id, db=connection) {
  return db(tableName)
    .select()
    .where({id})
}

function addByTableName(tableName, data, db=connection) {
  return db(tableName)
    .insert(data)
}

function updateByTableNameAndId(tableName, id, data, db=connection) {
  return db(tableName)
    .where({id})
    .update(data)
}

module.exports = {
  getByTableName,
  getByIdAndTableName,
  addByTableName,
  updateByTableNameAndId
};