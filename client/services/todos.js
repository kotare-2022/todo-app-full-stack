import request from "superagent"

const localApiUrl = '/api/v1/todos'

async function getAllTodos() {
  const response = await request
    .get(localApiUrl)
  return response.body
}

async function getTodoById(id) {
  const response = await request
    .get(`${localApiUrl}/${id}`)
  return response.body
}

async function addTodo(data) {
  const response = await request
    .post(localApiUrl)
    .send(data)
  return response.body
}

async function updateTodoById(id, data) {
  const reponse = await request
    .patch(`${localApiUrl}/${id}`)
    .send(data)
  return reponse.body
}

async function deleteTodoById(id) {
  return await request
    .delete(`${localApiUrl}/${id}`)
}

export default {
  getAllTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
}