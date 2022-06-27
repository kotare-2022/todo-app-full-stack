const _ = require('lodash')
const knex = require('knex')
const config = require('./knexfile').development

const connection = knex(config)

// HELPERS for translating between snake and camel case
const mapToCase = (val, caseFn) => {
  const isArray = Array.isArray(val)
  if (isArray) {
    // is an array of object
    return val.map(obj => {
      return _.mapKeys(obj, (__, key) => caseFn(key))
    })
  } else {
    // is an object itself
    return _.mapKeys(val, (__, key) => caseFn(key))
  }
}

const mapToCamelCase = val => {
  const caseFn = _.camelCase
  return mapToCase(val, caseFn) 
}

const mapToSnakeCase = val => {
  const caseFn = _.snakeCase
  return mapToCase(val, caseFn)
}

// REUSABLES
function getByTableName(tableName, db = connection) {
  return db(tableName)
    .select()
    .then(result => mapToCamelCase(result))
    
}

function getByTableNameAndId(tableName, id, db = connection) {
  return db(tableName)
    .select()
    .where({id})
    .then(result => mapToCamelCase(result))
}

function addByTableName(tableName, data, db = connection) {
  data = mapToSnakeCase(data)
  return db(tableName)
    .insert(data)
    .then(result => mapToCamelCase(result))
}

function updateByTableNameAndId(tableName, id, data, db = connection) {
  data = mapToSnakeCase(data)
  return db(tableName)
    .where({id})
    .update(data)
    .then(result => mapToCamelCase(result))

}

// CUSTOMS
function getFullTodos(db = connection) {
  return db('todos')
    .select(
      'todos.id AS id',
      'todos.title AS title',
      'todos.description AS description',
      'importance_levels.description AS importance_level_description',
      'themes.description AS theme_description'
    )
    .innerJoin(
      'importance_levels', 
      'todos.importance_level_id', 
      '=',
      'importance_levels.id'
    )
    .innerJoin(
      'themes',
      'todos.theme_id',
      '=',
      'themes.id'
    )
    .then(result => mapToCamelCase(result))
}

function getFullTodoById(id, db = connection) {
  return db('todos')
    .select(
      'todos.id AS id',
      'todos.title AS title',
      'todos.description AS description',
      'importance_levels.description AS importance_level_description',
      'themes.description AS theme_description'
    )
    .innerJoin(
      'importance_levels', 
      'todos.importance_level_id', 
      '=',
      'importance_levels.id'
    )
    .innerJoin(
      'themes',
      'todos.theme_id',
      '=',
      'themes.id'
    )
    .where({'todos.id' :id}) // need to be more specific
    .first()
    .then(result => mapToCamelCase(result))
}

module.exports = {
  getByTableName,
  getByTableNameAndId,
  addByTableName,
  updateByTableNameAndId,
  getFullTodos,
  getFullTodoById,
};